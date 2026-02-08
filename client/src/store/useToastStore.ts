/* import { create } from "zustand";

const initialState = {
    toasts: []
}
const useToastStore = create((set) => ({
    ...initialState,

    showToast: (message, type = 'info') => {
        const id = Date.now();
        set(prev => ({
            toasts: [...prev.toasts, { id, message, type }]
        }));
        
        setTimeout(() => {
            set(prev => ({
                toasts: prev.toasts.filter(toast => (id != toast.id))
            }))
        }, 3000);
    }
}));

export default useToastStore; */


import { create } from "zustand";

export interface Toast {
    id: number;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
}

interface ToastState {
    toasts: Toast[];
    showToast: (message: string, type?: Toast['type']) => void;
}

const useToastStore = create<ToastState>((set) => ({
    toasts: [],

    showToast: (message, type = 'info') => {
        const id = Date.now();

        set((state) => ({
            toasts: [...state.toasts, { id, message, type }]
        }));

        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((toast) => toast.id !== id)
            }));
        }, 3000);
    },
}));

export default useToastStore;