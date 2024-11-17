import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { query } from '$lib/db';

let utilisateur_id = null;

export const load: PageServerLoad = async ({ params, locals, fetch }) => {
    const recetteId = params.id;

    // Vérification de la session utilisateur
    const response = await fetch('/api/auth/check-session');
    if (response.ok) {
        const data = await response.json();
        if (!data.user) {
            throw error(403, 'Utilisateur non connecté');
        }
    } else {
        console.log("Problème API : vérification de session");
    }

    // Vérifiez si l'utilisateur est connecté
    if (!locals.user) {
        throw error(403, 'Accès refusé');
    }

    // Récupération de la recette depuis la base de données
    const result = await query('SELECT * FROM recettes WHERE id = $1', [recetteId]);

    if (result.rows.length === 0) {
        throw error(404, 'Recette non trouvée');
    }

    const recette = result.rows[0];

    // Vérifier si l'utilisateur est le créateur de la recette
    if (recette.createur_id !== locals.user.utilisateur_id) {
        throw error(403, 'Vous ne pouvez pas modifier cette recette');
    }

    return { recette };
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData();
        const nom = formData.get('nom') as string;
        const ingredients = formData.get('ingredients') as string;
        const instructions = formData.get('instructions') as string;
        const temps_preparation = parseInt(formData.get('temps_preparation') as string);
        const categorie = formData.get('categorie') as string;

        // Mise à jour des informations de la recette dans la base de données
        await query(
            'UPDATE recettes SET nom = $1, ingredients = $2, instructions = $3, temps_preparation = $4, categorie = $5, date_modification = CURRENT_TIMESTAMP WHERE id = $6',
            [nom, ingredients, instructions, temps_preparation, categorie, params.id]
        );

        return { success: true };
    }
};