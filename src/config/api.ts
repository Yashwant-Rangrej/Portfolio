export const API_BASE_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  portfolioData: `${API_BASE_URL}/api/portfolio-data`,
  projects: `${API_BASE_URL}/api/projects`,
  login: `${API_BASE_URL}/api/auth/login`,
  verifyAuth: `${API_BASE_URL}/api/auth/verify`,
  contact: `${API_BASE_URL}/api/contact`,
  messages: `${API_BASE_URL}/api/contact/messages`,
  health: `${API_BASE_URL}/health`,
};
