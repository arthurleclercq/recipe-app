// src/routes/api/recettes/+server.ts
import { json } from '@sveltejs/kit';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import type { RequestHandler } from './$types';
import { query } from '$lib/db';


export const POST: RequestHandler = async ({ request }) => {
    const formData = await request.formData();
    const nom = formData.get('nom') as string;
    const ingredients = formData.get('ingredients') as string;
    const instructions = formData.get('instructions') as string;
    const temps_preparation = parseInt(formData.get('temps_preparation') as string);
    const categorie = formData.get('categorie') as string;
    const image = formData.get('image') as File | null;
    const utilisateur_id = parseInt(formData.get('utilisateur_id') as string);
    
    let imagePath: string | null = null;
    if (image) {
        const fileName = `${Date.now()}_${image.name}`;
        const path = join(process.cwd(), 'static/images', fileName);
        await writeFile(path, Buffer.from(await image.arrayBuffer()));
        imagePath = `/images/${fileName}`; 
    }

    try {
        await query(
            'INSERT INTO recettes (nom, ingredients, instructions, temps_preparation, categorie, image_url, createur_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [nom, ingredients, instructions, temps_preparation, categorie, imagePath, utilisateur_id]
        );

        return json({ message: 'Recette ajoutée avec succès' });
    } catch (error) {
        console.error("Erreur lors de l'ajout de la recette:", error);
        return json({ success: false, error: "Erreur lors de l'ajout de la recette" }, { status: 500 });
    }
};