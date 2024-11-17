<script lang="ts">
    import { goto } from '$app/navigation';
    import { showNotification } from '$lib/stores/notificationStore';

    let nom_utilisateur = '';
    let mot_de_passe = '';
    let confirmMotDePasse = '';
    let errorMessage = '';

    async function register() {
        // Vérifier si les mots de passe correspondent
        if (mot_de_passe !== confirmMotDePasse) {
            errorMessage = "Les mots de passe ne correspondent pas.";
            return;
        }

        // Envoyer une requête POST à l'API d'inscription
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom_utilisateur, mot_de_passe })
        });

        // Gérer la réponse de l'API
        if (res.ok) {
            const data = await res.json();
            showNotification(data.message, 'success'); // Afficher la notification de succès
            goto('/login');
        } else {
            const data = await res.json();
            errorMessage = data.message || 'Erreur lors de l\'inscription.';
        }
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">Inscription</h1>
    <form on:submit|preventDefault={register} class="max-w-md mx-auto">
        <input 
            type="text" 
            bind:value={nom_utilisateur} 
            placeholder="Nom d'utilisateur" 
            class="w-full p-2 border rounded mb-4" 
            required 
        />
        <input 
            type="password" 
            bind:value={mot_de_passe} 
            placeholder="Mot de passe" 
            class="w-full p-2 border rounded mb-4" 
            required 
        />
        <input 
            type="password" 
            bind:value={confirmMotDePasse} 
            placeholder="Confirmer le mot de passe" 
            class="w-full p-2 border rounded mb-4" 
            required 
        />
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            S'inscrire
        </button>
        {#if errorMessage}
            <p class="text-red-500 mt-2">{errorMessage}</p>
        {/if}
    </form>
    <p class="mt-4 text-center">
        Vous avez déjà un compte ? <a href="/login" class="text-blue-500 hover:underline">Connectez-vous ici</a>.
    </p>
</div>