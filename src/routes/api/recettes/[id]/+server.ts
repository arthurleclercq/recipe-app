import { json } from '@sveltejs/kit';
import { query } from '$lib/db';
import { unlink } from 'fs/promises';
import { join } from 'path';

interface Recette {
    nom: string;
    ingredients: string;
    instructions: string;
    temps_preparation: number;
    categorie: string;
}

export async function PUT({ params, request }: { params: { id: string }, request: Request }) {
    const id = params.id;
    const { nom, ingredients, instructions, temps_preparation, categorie }: Recette = await request.json();

    // Mettre à jour la recette dans la base de données
    await query('UPDATE recettes SET nom = $1, ingredients = $2, instructions = $3, temps_preparation = $4, categorie = $5 WHERE id = $6', [nom, ingredients, instructions, temps_preparation, categorie, id]);

    return json({ message: 'Recette modifiée avec succès' });
}

export async function DELETE({ params }: { params: { id: string } }) {
    const id = params.id;

    try {
        // Récupérer l'URL de l'image avant de supprimer la recette
        const result = await query('SELECT image_url FROM recettes WHERE id = $1', [id]);
        const imageUrl = result.rows[0]?.image_url;

        // Supprimer la recette dans la base de données
        await query('DELETE FROM recettes WHERE id = $1', [id]);

        // Si une image est associée à la recette, la supprimer
        if (imageUrl) {
            const imagePath = join(process.cwd(), 'static', imageUrl.replace(/^\//, ''));
            try {
                await unlink(imagePath);
                //console.log(`Image supprimée : ${imagePath}`);
            } catch (error) {
                console.error(`Erreur lors de la suppression de l'image : ${error}`);
                // Ne pas bloquer la suppression de la recette si la suppression de l'image échoue
            }
        }

        return json({ message: 'Recette et image associée supprimées avec succès' });
    } catch (error) {
        console.error(`Erreur lors de la suppression de la recette : ${error}`);
        return json({ message: 'Erreur lors de la suppression de la recette' }, { status: 500 });
    }
}