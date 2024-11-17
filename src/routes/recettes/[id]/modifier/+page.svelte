<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import type { ActionResult } from '@sveltejs/kit';

    export let data: PageData;
    let { recette } = data;

    let nom = recette.nom;
    let ingredients = recette.ingredients;
    let instructions = recette.instructions;
    let temps_preparation = recette.temps_preparation;
    let categorie = recette.categorie;

    // Fonction pour gérer la soumission du formulaire
    function handleSubmit() {
        return async ({ result }: { result: ActionResult }) => {
            if (result.type === 'success') {
                // Redirection vers la page de la recette mise à jour en cas de succès
                goto(`/recettes/${recette.id}`);
            }
        };
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Modifier la recette</h1>

    <!-- Formulaire pour modifier une recette -->
    <form method="POST" use:enhance={handleSubmit} class="space-y-4">
        <div class="mb-4">
            <label for="nom" class="block mb-2">Nom :</label>
            <input id="nom" name="nom" bind:value={nom} required class="w-full max-w-md p-2 border rounded ml-2">
        </div>

        <div class="mb-4">
            <label for="ingredients" class="block mb-2">Ingrédients :</label>
            <textarea id="ingredients" name="ingredients" bind:value={ingredients} required class="w-full max-w-md p-2 border rounded ml-2 h-32"></textarea>
        </div>

        <div class="mb-4">
            <label for="instructions" class="block mb-2">Instructions :</label>
            <textarea id="instructions" name="instructions" bind:value={instructions} required class="w-full max-w-md p-2 border rounded ml-2 h-32"></textarea>
        </div>

        <div class="mb-4">
            <label for="temps_preparation" class="block mb-2">Temps de préparation (minutes) :</label>
            <input id="temps_preparation" name="temps_preparation" type="number" bind:value={temps_preparation} required class="w-full max-w-md p-2 border rounded ml-2">
        </div>

        <div class="mb-4">
            <label for="categorie" class="block mb-2">Catégorie :</label>
            <input id="categorie" name="categorie" bind:value={categorie} required class="w-full max-w-md p-2 border rounded ml-2">
        </div>

        <!-- Bouton pour soumettre le formulaire -->
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Mettre à jour la recette
        </button>
    </form>

    <!-- Lien pour annuler et retourner à la recette sans faire de modifications -->
    <a href="/recettes/{recette.id}" class="mt-4 inline-block text-blue-500 hover:underline">Annuler et retourner à la recette</a>
</div>