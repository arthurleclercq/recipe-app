// src/routes/api/auth/login/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { query } from '$lib/db';
import { createSession } from '$lib/stores/sessionStore';

export const POST: RequestHandler = async ({ request, cookies }) => {
    const { nom_utilisateur, mot_de_passe } = await request.json();

    const result = await query('SELECT * FROM utilisateurs WHERE nom_utilisateur = $1', [nom_utilisateur]);
    const user = result.rows[0];

    if (!user || !await bcrypt.compare(mot_de_passe, user.mot_de_passe)) {
        return json({ success: false, message: 'Identifiants invalides' }, { status: 401 });
    }

    const sessionId = await createSession(user.id, { utilisateur_id: user.id, nom_utilisateur: user.nom_utilisateur });

    cookies.set('sessionId', sessionId, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 heures
    });

    // Retourner les données de l'utilisateur connecté au client
    return json({
        success: true,
        user: { utilisateur_id: user.id, nom_utilisateur: user.nom_utilisateur },
        message: 'Connexion réussie ! Bienvenue.'
    });
};