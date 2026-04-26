const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const getApiUrl = (endpoint) => {
  // If in development and using proxy, '/api' is usually prepended by the proxy config
  // In production, we might want a full URL or a specific prefix.
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // If API_BASE_URL is set (e.g., in production), use it. 
  // Otherwise, default to the relative path which works with Vite proxy.
  return API_BASE_URL ? `${API_BASE_URL}${cleanEndpoint}` : cleanEndpoint;
};
