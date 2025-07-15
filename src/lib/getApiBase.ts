export const API_BASE =
  // 1) Explicit env var from Vite or Vercel
  import.meta.env.VITE_API_BASE ||
  // 2) Development - check if we're on localhost or local IP
  (typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '192.168.0.113'
  )
    ? (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000'
        : 'http://192.168.0.113:5000')
    // 3) Production - use same domain for Vercel deployment
    : window.location.origin); 