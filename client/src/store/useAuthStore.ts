import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

interface User {
    name: string;
    userid: string;
    admin: boolean;
    member: boolean;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isLogin: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isLogin: false,
            login: (token: string) => {
                try {
                    // Simple decode for payload
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));

                    const decoded = JSON.parse(jsonPayload);

                    set({
                        accessToken: token,
                        isLogin: true,
                        user: {
                            name: decoded.name,
                            userid: decoded.userid,
                            admin: decoded.admin,
                            member: decoded.member
                        }
                    });
                } catch (e) {
                    console.error("Failed to decode token", e);
                }
            },
            logout: async () => {
                try {
                    await axios.post('/api/auth/logout');
                } catch (e) {
                    console.error("Logout failed", e);
                }
                set({
                    user: null,
                    accessToken: null,
                    isLogin: false
                });
            }
        }),
        {
            name: 'auth-storage', // name of item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);
