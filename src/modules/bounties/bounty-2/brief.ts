import type { ContentBrief } from '@/modules/bounties/shared/types';

export function buildBrief(params: {
  topic: string;
  angle: string;
  lifespan: string;
  whyItMatters: string;
}): ContentBrief {
  const title = params.topic;

  // Generate a production-ready 30-60 second script
  const scriptBeats = [
    `[HOOK - 3 seconds] "Everyone's talking about ${title.toLowerCase()}, but here's what founders in Kenya are missing..."`,
    `[CONTEXT - 7 seconds] Explain the trend in one clear sentence: why it's happening NOW and why momentum matters`,
    `[KUZANA ANGLE - 10 seconds] Connect to one founder problem: cash flow challenges, hiring friction, or going-to-market speed`,
    `[PROOF - 8 seconds] Name ONE public example from the scan: a founder, company, or behavior pattern that proves this trend is real`,
    `[CALL TO ACTION - 5-10 seconds] Tell founders exactly what to do this week: "If you're in [industry], start [action] before this window closes"`,
    `[CLOSE - 3 seconds] End with a question: "Have you noticed this in your market? Comment your experience below"`,
  ];

  const remixVariations = [
    {
      format: '📱 Mobile-First (TikTok/Shorts)',
      beats: [
        'Open with trend stat or contradiction (3s)',
        'Show yourself reacting or explaining on camera (5s)',
        'On-screen text: key insight (3s)',
        'Call to action or question (2s)',
      ],
    },
    {
      format: '🎙️ LinkedIn/Thoughtful',
      beats: [
        'Discuss the business implication (8s)',
        'Share a personal founder anecdote (10s)',
        'Unpack the money/growth angle (8s)',
        'Post-call CTA or offer (4s)',
      ],
    },
    {
      format: '📺 YouTube Long-Form (5 min)',
      beats: [
        'Intro + trend overview (60s)',
        'Deep dive: why it matters to founders (120s)',
        'Case study: how a founder can capitalize (90s)',
        'Step-by-step action plan (60s)',
        'Outro + subscribe (30s)',
      ],
    },
  ];

  return {
    trend: {
      topic: title,
      angle: params.angle,
      lifespan: params.lifespan,
      confidence: 'High enough for a same-day content brief; refresh the scan when the conversation shifts.',
      whyItMatters: params.whyItMatters,
    },
    hook: `Everyone is talking about ${title.toLowerCase()}, but founders should care because it changes how money, attention, or trust moves.`,
    context: `This trend emerged from public conversations and represents a significant shift in the market. It's gaining momentum and relevant to East African tech operators.`,
    angle: params.angle,
    proof: 'Evidence gathered from trending sources and public conversations.',
    cta: 'Use this brief to create content within the next 2 hours while the trend is active.',
    script: scriptBeats,
    remixTemplate: [
      '1. Trend signal: what is happening in one sentence.',
      '2. Founder lens: why a Kenyan operator should care today.',
      '3. Proof: a public example from the scan.',
      '4. Action: what to do, say, or test next.',
    ],
    actionPlan: [
      '⏱️ IMMEDIATE (Next 30 minutes): Hand the hook and script beats to your content lead.',
      '🎬 PRODUCTION (Next 2 hours): Record a 30-60 second talking-head clip with one screen reference or B-roll.',
      '📤 PUBLISH (Within trend lifespan): Post to TikTok, YouTube Shorts, and LinkedIn while the conversation is still happening.',
      '🔄 ITERATE (Post-publish): Re-run the scan after publishing to catch follow-on angles or counter-perspectives.',
      '💾 ARCHIVE: Save this brief with the trend lifespan window. Use it to train your content calendar model.',
    ],
  };
}

// Export script beat suggestions for more granular content planning
export function generateMobileScript(topic: string, angle: string): string {
  return `[HOOK] "Everyone's talking about ${topic.toLowerCase()}..."
[CONTEXT] Why this matters right now
[KUZANA ANGLE] ${angle}
[PROOF] The data or example
[CTA] What to do this week
[CLOSE] Invite engagement`;
}

export function generateLongFormScript(topic: string, angle: string, details: string[]): string {
  return `INTRO: ${topic} - and why founders can't ignore it (60s)

SECTION 1: What's happening (120s)
${details[0] || 'The trend in context'}

SECTION 2: Why Kuzana founders care (90s)
${angle}

SECTION 3: How to capitalize (90s)
${details[1] || 'Actionable steps'}

SECTION 4: Case study or example (60s)
${details[2] || 'Real-world proof'}

CTA: Subscribe to stay ahead of trends like this
CLOSE: (30s)`;
}
