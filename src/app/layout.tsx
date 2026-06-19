import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Kuzana x MiniHack Bounty Suite',
  description: 'A modular builder bounty suite with a live Trendjack Hunter MVP and future-ready integration boundaries.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] font-sans text-[var(--text)] antialiased">
        {children}
      </body>
    </html>
  );
}
