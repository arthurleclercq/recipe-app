<script lang="ts">
    import { goto } from '$app/navigation';
    import { userStore } from '$lib/stores/userStore';
    const user = $userStore;
    const utilisateur_id = user.utilisateur_id;

    let nom: string = '';
    let ingredients: string = '';
    let instructions: string = '';
    let temps_preparation: number = 0;
    let categorie: string = '';
    let image: File | null = null;

    function handleFileChange(e: Event) {
        const target = e.target as HTMLInputElement;
        if (target && target.files) {
            image = target.files[0];
        }
    }

    async function ajouterRecette() {
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('ingredients', ingredients);
        formData.append('instructions', instructions);
        formData.append('temps_preparation', temps_preparation.toString());
        formData.append('categorie', categorie);

        formData.append('utilisateur_id',utilisateur_id.toString())

        if (image) {
            formData.append('image', image);
        }

        const response = await fetch('/api/recettes', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            goto('/recettes'); // Redirection vers le catalogue
        } else {
            console.error("Erreur lors de l'ajout de la recette");
        }
    }
</script>

<div class="container mx-auto px-4 py-8 relative">
    <h1 class="text-4xl font-bold mb-4">Ajouter une Nouvelle Recette</h1>
    <form on:submit|preventDefault={ajouterRecette} class="space-y-4">
        <input type="text" bind:value={nom} placeholder="Nom de la recette" required class="w-full p-2 border rounded" />
        <textarea bind:value={ingredients} placeholder="Ingrédients" required class="w-full p-2 border rounded h-32"></textarea>
        <textarea bind:value={instructions} placeholder="Instructions" required class="w-full p-2 border rounded h-32"></textarea>
        <input type="number" bind:value={temps_preparation} placeholder="Temps de préparation (min)" required class="w-full p-2 border rounded" />
        <input type="text" bind:value={categorie} placeholder="Catégorie" required class="w-full p-2 border rounded" />
        <input type="file" accept="image/*" on:change={handleFileChange} class="w-full p-2 border rounded" />
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ajouter la recette</button>
    </form>
</div>