export const API_BASE =
  // 1) Explicit env var from Vite or Vercel
  import.meta.env.VITE_API_BASE ||
  // 2) Local development defaults
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    // 3) Production - use same domain since backend is deployed on same Vercel project
    : window.location.origin); 