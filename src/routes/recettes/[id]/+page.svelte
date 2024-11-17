<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { showNotification } from '$lib/stores/notificationStore'; 
    import { userStore } from '$lib/stores/userStore';
    
    $: currentUser = $userStore; // Abonnement réactif au store utilisateur

    export let data: PageData; // Exportation des données de la page

    // Fonction pour supprimer la recette
    async function supprimerRecette() {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
            try {
                const response = await fetch(`/api/recettes/${data.recette.id}`, {
                    method: 'DELETE' // Méthode HTTP pour supprimer la recette
                });
                if (response.ok) {
                    showNotification("La recette a bien été supprimée", 'success'); // Notification de succès
                    goto('/recettes'); // Redirection vers la liste des recettes
                } else {
                    alert('Erreur lors de la suppression de la recette'); // Alerte en cas d'erreur
                }
            } catch (error) {
                console.error('Erreur:', error); // Log d'erreur dans la console
                alert('Une erreur est survenue lors de la suppression'); // Alerte en cas d'exception
            }
        }
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-1">{data.recette.nom}</h1>
    
    <p class="text-gray-600 mb-1">Recette créée par {data.recette.createur_nom_utilisateur}</p>
    
    {#if data.recette.image_url}
        <div class="image-container mb-4">
            <img src={data.recette.image_url} alt={data.recette.nom} class="object-cover rounded-lg shadow-md">
        </div>
    {/if}
    
    <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Ingrédients :</h2>
        <p class="whitespace-pre-line">{data.recette.ingredients}</p> <!-- Affichage des ingrédients -->
    </div>
    
    <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Instructions :</h2>
        <p class="whitespace-pre-line">{data.recette.instructions}</p> <!-- Affichage des instructions -->
    </div>
    
    <div class="mb-4">
        <p><strong>Temps de préparation :</strong> {data.recette.temps_preparation} minutes</p>
        <p><strong>Catégorie :</strong> {data.recette.categorie}</p> <!-- Affichage du temps et de la catégorie -->
    </div>
    
    {#if currentUser && currentUser.utilisateur_id === data.recette.createur_id}
        <div class="mt-8 flex space-x-4">
            <a href="/recettes/{data.recette.id}/modifier" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Modifier cette recette
            </a>
            <button on:click={supprimerRecette} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Supprimer cette recette
            </button>
        </div>    
    {/if}

    <div class="mb-4 mt-4">
        <a href="/recettes" class="text-blue-500 hover:underline">Retour à la liste des recettes</a>
    </div>
</div>

<style>
    .whitespace-pre-line {
        white-space: pre-line; /* Conserve les retours à la ligne */
    }

    .image-container {
        max-width: 400px; /* Limite la largeur de l'image */
        width: 100%; /* Prend toute la largeur disponible jusqu'à max-width */
    }

    img {
        width: 100%; /* L'image prend toute la largeur du conteneur */
        height: auto; /* La hauteur est ajustée automatiquement pour conserver le rapport d'aspect */
        border-radius: 0.4rem; /* Arrondir les coins de l'image */
    }
</style>