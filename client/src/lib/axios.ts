import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Request Interceptor: Add Bearer Token
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    (config) => {
        const { accessToken } = useAuthStore.getState();

        config.headers = config.headers || {};

        if (accessToken) {
            config.headers.set('Authorization', `Bearer ${accessToken}`);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle 401 & Refresh
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/api/auth/refresh') {
            originalRequest._retry = true;

            try {
                // Call refresh endpoint
                const res = await axios.post('/api/auth/refresh');
                if (res.data.success) {
                    const newAccessToken = res.data.accessToken;

                    // Update store
                    useAuthStore.getState().login(newAccessToken);

                    // Update header and retry original request
                    if (originalRequest.headers && typeof originalRequest.headers.set === 'function') {
                        originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
                    } else {
                        originalRequest.headers = { ...originalRequest.headers };
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    }

                    return axios(originalRequest);
                }
            } catch (refreshError) {
                // If refresh fails, logout
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
