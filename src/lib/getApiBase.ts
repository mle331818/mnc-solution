export const API_BASE =
  // 1) Explicit env var from Vite or Vercel
  import.meta.env.VITE_API_BASE ||
  // 2) Local development defaults
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:4000'
    // 3) Production - use same domain for Vercel deployment
    : window.location.origin); 