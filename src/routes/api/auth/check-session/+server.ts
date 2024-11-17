import type { RequestHandler } from '@sveltejs/kit';
import { getSession } from '$lib/stores/sessionStore';

export const GET: RequestHandler = async ({ cookies }) => {
    const sessionId = cookies.get('sessionId'); // Récupérer l'ID de session à partir des cookies

    if (!sessionId) {
        return new Response(JSON.stringify({ user: null }), { status: 200 }); // Pas de session
    }

    const sessionData = await getSession(sessionId); // Appeler la fonction pour obtenir les données de session

    if (sessionData) {
        return new Response(JSON.stringify({ user: sessionData }), { status: 200 }); // Session valide, renvoyer les données utilisateur
    } else {
        return new Response(JSON.stringify({ user: null }), { status: 200 }); // Session invalide
    }
};