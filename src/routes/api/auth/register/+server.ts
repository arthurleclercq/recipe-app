// src/routes/api/auth/register/server.ts
import { json } from '@sveltejs/kit';
import { query } from '$lib/db';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
    const { nom_utilisateur, mot_de_passe } = await request.json();

    // Vérifier si le nom d'utilisateur existe déjà
    const existingUser = await query('SELECT * FROM utilisateurs WHERE nom_utilisateur = $1', [nom_utilisateur]);
    if (existingUser.rows.length > 0) {
        return json({ success: false, message: 'Nom d\'utilisateur déjà pris.' }, { status: 400 });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Insérer l'utilisateur dans la base de données
    await query('INSERT INTO utilisateurs (nom_utilisateur, mot_de_passe) VALUES ($1, $2)', [nom_utilisateur, hashedPassword]);

    return json({ success: true, message: 'Inscription réussie ! Vous pouvez vous connecter.' }); // Message de succès
}