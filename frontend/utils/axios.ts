// lib/api.ts or utils/axios.ts
import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

// Leave the base url empty so we can use the proxy from Vite
const API_BASE_URL = import.meta.env.MODE === 'development' 
  ? ""  
  : VITE_API_URL;

// This is the client I'll use for all my requests from now
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor (for debugging)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // Try to refresh token
        await apiClient.post('/api/auth/refresh/');
        // Retry the original request
        return apiClient.request(error.config);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// This configuration allows me to include type safety in API calls, requests and responses
// Here's an example
//
// interface LoginResponse {
//   user: User;
//   message: string;
// }

// const response = await apiClient.post<LoginResponse>('/api/auth/login/', { username, password });
// response.data is now typed as LoginResponse

// 