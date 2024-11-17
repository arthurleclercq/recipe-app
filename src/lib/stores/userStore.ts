// src/lib/stores/userStore.ts
import { writable } from 'svelte/store';

export interface UserData {
    utilisateur_id: number;
    nom_utilisateur: string;
}

// Créer le store
export const userStore = writable<UserData | null>(null);


// Fonction pour définir l'utilisateur
export function setUser(id: number, nom: string) {
    userStore.set({
        utilisateur_id: id,
        nom_utilisateur: nom
    });
}