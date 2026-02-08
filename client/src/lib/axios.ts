import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL, 
    withCredentials: true
});

api.interceptors.request.use(
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

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/api/auth/refresh' && originalRequest.url !== '/api/auth/login') {
            originalRequest._retry = true;

            try {
                const res = await axios.post('/api/auth/refresh');
                if (res.data.success) {
                    const newAccessToken = res.data.accessToken;

                    useAuthStore.getState().login(newAccessToken);

                    if (originalRequest.headers && typeof originalRequest.headers.set === 'function') {
                        originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
                    } else {
                        originalRequest.headers = { ...originalRequest.headers };
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    }

                    return axios(originalRequest);
                }
            } catch (refreshError) {
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;