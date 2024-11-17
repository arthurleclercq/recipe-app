import { writable } from 'svelte/store';

export const notification = writable({ message: '', type: '' });

export function showNotification(message: string, type: 'success' | 'error' = 'success', duration: number = 3000) {
    notification.set({ message, type });
    setTimeout(() => {
        notification.set({ message: '', type: '' });
    }, duration);
}