'use client';

import Image from 'next/image';
import Link from 'next/link';

export function WhatsAppWidget() {
  return (
    <Link
      href="https://wa.me/254786817637"
      target="_blank"
      rel="noopener noreferrer"
      className="group"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        display: 'block',
      }}
      aria-label="Chat with us on WhatsApp"
    >
      {/* Glow background circle */}
      <div className="absolute inset-0 bg-green-500/30 rounded-full blur-3xl group-hover:bg-green-500/50 transition-all duration-300 scale-125"></div>
      
      {/* Main button */}
      <div className="relative bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full shadow-2xl group-hover:shadow-2xl group-hover:shadow-green-500/70 group-hover:scale-125 transition-all duration-300 flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
        <Image
          src="/images/whatsapp-3d.png"
          alt="WhatsApp Chat"
          width={64}
          height={64}
          className="w-16 h-16 object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
          priority
        />
      </div>
      
      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-green-500/40 group-hover:bg-transparent animate-pulse group-hover:scale-150 transition-all duration-300"></div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-4 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        Chat with us
      </div>
    </Link>
  );
}
