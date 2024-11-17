// src/routes/recettes/[id]/+page.server.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { query } from '$lib/db';

export const load: PageServerLoad = async ({ params }) => {
    // Récupérer l'ID de la recette à partir des paramètres
    const recetteId = params.id;

    // Incrémenter le nombre de vues
    await query('UPDATE recettes SET vues = vues + 1 WHERE id = $1', [recetteId]);

    // Récupérer la recette mise à jour
    const recettesResult = await query(`
        SELECT r.*, u.nom_utilisateur as createur_nom_utilisateur
        FROM recettes r
        JOIN utilisateurs u ON r.createur_id = u.id
        WHERE r.id = $1
    `, [recetteId]);
    
    // Vérifier si la recette existe
    if (recettesResult.rows.length === 0) {
        throw error(404, 'Recette non trouvée');
    }

    return { recette: recettesResult.rows[0] };
};