<script lang="ts">
    import type { PageData } from './$types'; 
    import { userStore} from '$lib/stores/userStore';
    import { get } from 'svelte/store';
	import { onMount } from 'svelte';

    let user = get(userStore);
    
    export let data: PageData;
    let { recettes, categories } = data;

    let searchTerm = '';
    let selectedCategory = '';
    let maxTime = '';
    let creatorFilter = ''; // Nouveau filtre pour le nom du créateur

    
    onMount(async () => {
        // Appeler l'API pour vérifier la session
        const response = await fetch('/api/auth/check-session');
        if (response.ok) {
            const data = await response.json();
            //console.log("retour api",data.user)
            if (data.user) {
                user=data.user;
            }else{
                user=null;
            }
        }else{
            console.log("problème API : vérification de session")
        }
    });

    $: filteredRecettes = recettes.filter(recette => 
        recette.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === '' || recette.categorie === selectedCategory) &&
        (maxTime === '' || recette.temps_preparation <= parseInt(maxTime)) &&
        recette.createur_nom_utilisateur.toLowerCase().includes(creatorFilter.toLowerCase()) // Nouveau filtre appliqué
    );

    function resetFilters() {
        searchTerm = '';
        selectedCategory = '';
        maxTime = '';
        creatorFilter = ''; // Réinitialiser aussi le filtre du créateur
    }
</script>

<div class="container mx-auto px-4 py-8 relative">
    <h1 class="text-4xl font-bold text-center mb-8">Catalogue de Recettes</h1>

    <div class="mb-8 space-y-4">
        <input 
            type="text" 
            bind:value={searchTerm} 
            placeholder="Rechercher une recette" 
            class="w-full p-2 border rounded"
        />
        <div class="flex space-x-4">
            <select 
                bind:value={selectedCategory} 
                class="p-2 border rounded w-full max-w-xs"
            >
                <option value="">Toutes les catégories</option>
                {#each categories as category}
                    <option value={category}>{category}</option>
                {/each}
            </select>
            <input 
                type="number" 
                bind:value={maxTime} 
                placeholder="Temps max (min)" 
                class="p-2 border rounded"
            />
            <input 
                type="text" 
                bind:value={creatorFilter} 
                placeholder="Nom du créateur" 
                class="p-2 border rounded"
            />
            <button 
                on:click={resetFilters}
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
                Réinitialiser
            </button>

            <!-- Bouton Ajouter une nouvelle recette -->
            {#if user} <!-- Vérifie si l'utilisateur est connecté -->
                <a href="/recettes/ajouter" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Ajouter une nouvelle recette
                </a>
            {/if}
        </div>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredRecettes as recette}
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8">
                {#if recette.image_url}
                    <img src={recette.image_url} alt={recette.nom} class="w-full h-48 object-cover mb-4 rounded" />
                {/if}
                <h2 class="text-2xl font-bold mb-1">{recette.nom}</h2>
                <p class="mb-2">Temps de préparation : {recette.temps_preparation} minutes</p>                
                <p class="mb-2">Créateur : {recette.createur_nom_utilisateur}</p>
                <p class="mb-4">Vues : {recette.vues}</p>
                <a href="/recettes/{recette.id}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Voir les détails
                </a>
            </div>
        {/each}
    </div>

    {#if filteredRecettes.length === 0}
        <p class="text-center mt-8">Aucune recette ne correspond à vos critères.</p>
    {/if}
</div>