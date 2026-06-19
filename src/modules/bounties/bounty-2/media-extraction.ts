function cleanText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function extractVideoId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace('/', '') || null;
    }

    return parsed.searchParams.get('v');
  } catch {
    return null;
  }
}

async function fetchYouTubeTranscript(videoId: string) {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const response = await fetch(watchUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 KuzanaTrendjack/1.0' },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    return null;
  }

  const html = await response.text();
  const captionMatch = html.match(/"captionTracks":(\[.*?\])[,\]]/s);

  if (!captionMatch) {
    return null;
  }

  try {
    const tracks = JSON.parse(captionMatch[1].replace(/&amp;/g, '&')) as Array<{ baseUrl?: string; languageCode?: string }>;
    const englishTrack = tracks.find((track) => track.languageCode?.startsWith('en')) ?? tracks[0];
    if (!englishTrack?.baseUrl) {
      return null;
    }

    const transcriptResponse = await fetch(`${englishTrack.baseUrl}&fmt=json3`, {
      headers: { 'User-Agent': 'Mozilla/5.0 KuzanaTrendjack/1.0' },
      next: { revalidate: 300 },
    });

    if (!transcriptResponse.ok) {
      return null;
    }

    const transcriptData = await transcriptResponse.json();
    const events = transcriptData?.events ?? [];
    const lines = events
      .map((event: any) => event?.segs?.map((seg: any) => seg?.utf8).join(' '))
      .filter(Boolean)
      .map((line: string) => cleanText(line));

    return lines.slice(0, 12).join(' ');
  } catch {
    return null;
  }
}

export async function enrichYouTubeContext(url: string) {
  const videoId = extractVideoId(url);
  if (!videoId) {
    return null;
  }

  const transcript = await fetchYouTubeTranscript(videoId);
  return {
    extractedFrom: 'YouTube watch page',
    transcript: transcript ?? undefined,
    caption: transcript ? transcript.slice(0, 240) : undefined,
  };
}

export async function enrichImageOCR(imageUrl: string): Promise<string | null> {
  if (!process.env.TESSERACT_API_KEY) {
    return null;
  }

  try {
    const response = await fetch('https://api.tesseract.projectoxford.com/vision/v2.0/ocr', {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.TESSERACT_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: imageUrl }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const text = data?.regions
      ?.flatMap((region: any) =>
        region?.lines?.flatMap((line: any) => line?.words?.map((word: any) => word?.text))
      )
      .filter(Boolean)
      .join(' ');

    return text ? cleanText(text).slice(0, 300) : null;
  } catch {
    return null;
  }
}

export async function sampleVideoFrames(videoUrl: string): Promise<string[]> {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    return [];
  }

  return [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  ];
}
