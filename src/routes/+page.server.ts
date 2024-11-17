import type { PageServerLoad } from './$types';
import { query } from '$lib/db';
import type { Recette } from '../types/recette';

export const load: PageServerLoad = async () => {
    const latestRecipes = await query('SELECT * FROM recettes ORDER BY date_creation DESC LIMIT 5');
    const popularRecipes = await query('SELECT * FROM recettes ORDER BY vues DESC LIMIT 5');
    const totalRecipes = await query('SELECT COUNT(*) FROM recettes');
    const featuredRecipe = await query('SELECT * FROM recettes ORDER BY RANDOM() LIMIT 1');

    return {
        latestRecipes: latestRecipes.rows as Recette[],
        popularRecipes: popularRecipes.rows as Recette[],
        totalRecipes: parseInt(totalRecipes.rows[0].count),
        featuredRecipe: featuredRecipe.rows[0] as Recette
    };
};