'use client';

import Image from 'next/image';
import Link from 'next/link';

export function WhatsAppWidget() {
  return (
    <Link
      href="https://wa.me/254786817637"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Chat with us on WhatsApp"
    >
      {/* Glow background circle */}
      <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl group-hover:bg-green-500/40 transition-all duration-300"></div>
      
      {/* Main button */}
      <div className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl group-hover:shadow-green-500/50 group-hover:scale-110 transition-all duration-300 flex items-center justify-center hover:from-green-300 hover:to-green-500">
        <Image
          src="/images/whatsapp-3d.png"
          alt="WhatsApp"
          width={56}
          height={56}
          className="w-14 h-14 object-contain drop-shadow-lg"
          priority
        />
      </div>
      
      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-green-500/30 group-hover:bg-transparent animate-pulse"></div>
    </Link>
  );
}
