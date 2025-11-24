/// <reference types="vite/client" />

// Extend React types to include fetchPriority attribute for img elements
declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}
