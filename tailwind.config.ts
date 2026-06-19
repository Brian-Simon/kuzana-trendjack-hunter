import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#09111f',
        paper: '#f6f1e8',
        sand: '#efe0c7',
        mint: '#8ef0c9',
        ember: '#ff8b5e',
        steel: '#8a94a6',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(142, 240, 201, 0.25), 0 18px 60px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
