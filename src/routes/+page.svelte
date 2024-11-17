<script lang="ts">
    import type { PageData } from './$types';
    //import { sessionStore } from '$lib/stores/sessionStore';

    export let data: PageData;
    const { latestRecipes, popularRecipes, totalRecipes, featuredRecipe } = data;

    //$: currentSession = $sessionStore;

        
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">Bienvenue sur Notre Site de Recettes</h1>

    <!-- Recette en vedette -->
    {#if featuredRecipe}
        <div class="bg-blue-100 p-6 rounded-lg mb-8">
            <h2 class="text-2xl font-bold mb-4">Recette en vedette</h2>
            <div class="flex items-center">
                {#if featuredRecipe.image_url}
                    <img src={featuredRecipe.image_url} alt={featuredRecipe.nom} class="w-32 h-32 object-cover rounded-full mr-4" />
                {/if}
                <div>
                    <h3 class="text-xl font-semibold">{featuredRecipe.nom}</h3>
                    <p>Temps de préparation : {featuredRecipe.temps_preparation} minutes</p>
                    <a href="/recettes/{featuredRecipe.id}" class="text-blue-500 hover:underline">Voir la recette</a>
                </div>
            </div>
        </div>
    {/if}

    <div class="grid md:grid-cols-2 gap-8">
        <!-- Dernières recettes -->
        <div>
            <h2 class="text-2xl font-bold mb-4">Dernières Recettes</h2>
            <ul class="space-y-2">
                {#each latestRecipes as recipe}
                    <li class="flex items-center">
                        {#if recipe.image_url}
                            <img src={recipe.image_url} alt={recipe.nom} class="w-16 h-16 object-cover rounded mr-4" />
                        {/if}
                        <a href="/recettes/{recipe.id}" class="text-blue-500 hover:underline">{recipe.nom}</a>
                    </li>
                {/each}
            </ul>
        </div>

        <!-- Recettes populaires -->
        <div>
            <h2 class="text-2xl font-bold mb-4">Recettes Populaires</h2>
            <ul class="space-y-2">
                {#each popularRecipes as recipe}
                    <li class="flex items-center">
                        {#if recipe.image_url}
                            <img src={recipe.image_url} alt={recipe.nom} class="w-16 h-16 object-cover rounded mr-4" />
                        {/if}
                        <a href="/recettes/{recipe.id}" class="text-blue-500 hover:underline">{recipe.nom}</a>
                    </li>
                {/each}
            </ul>
        </div>
    </div>

    <!-- Message sur le nombre total de recettes -->
    <p class="text-xl text-center mb-4">Nous avons actuellement {totalRecipes} recettes disponibles !</p> <!-- Centré -->

    <!-- Boutons en bas de page -->
    <div class="mt-8 flex justify-center space-x-4">
        <a href="/recettes" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Voir toutes les recettes
        </a>

        <!-- Bouton Ajouter une nouvelle recette conditionnel -->
        {#if true} <!-- Vérifie si l'utilisateur est connecté -->
            <a href="/recettes/ajouter" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Ajouter une nouvelle recette
            </a>
        {/if}
    </div>

</div>