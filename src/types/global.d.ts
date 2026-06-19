declare module '*.css';
declare module 'next';
declare module 'next/font/google' {
  export const IBM_Plex_Sans: any;
  export const Space_Grotesk: any;
}

declare namespace React {
  type ReactNode = any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
