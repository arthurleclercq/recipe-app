// src/routes/recettes/+page.server.ts
import type { PageServerLoad } from './$types';
import { query } from '$lib/db';
import type { Recette } from '../../types/recette';

export const load: PageServerLoad = async () => {
    const recettesResult = await query(`
        SELECT r.*, u.nom_utilisateur as createur_nom_utilisateur
        FROM recettes r
        JOIN utilisateurs u ON r.createur_id = u.id
    `);
    
    // Récupérer les catégories distinctes
    const categoriesResult = await query('SELECT DISTINCT categorie FROM recettes ORDER BY categorie ASC');

    return {
        recettes: recettesResult.rows as Recette[],
        categories: categoriesResult.rows.map(row => row.categorie) // Ajout des catégories ici
    };
};