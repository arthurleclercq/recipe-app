<script lang="ts">
    import { goto } from '$app/navigation';
    import { showNotification } from '$lib/stores/notificationStore'; 
    import { setUser } from '$lib/stores/userStore';

    let nom_utilisateur = '';
    let mot_de_passe = '';
    let errorMessage = '';

    async function login() {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nom_utilisateur, mot_de_passe })
            });

            const data = await res.json();

            if (res.ok) {
                // Mettre à jour le userStore avec les données de l'utilisateur

                setUser(data.user.utilisateur_id, data.user.nom_utilisateur);
                
                showNotification(data.message, 'success'); // Afficher la notification de succès
                goto('/'); // Rediriger vers la page d'accueil
            } else {
                errorMessage = data.message || 'Erreur lors de la connexion.';
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            errorMessage = 'Une erreur est survenue lors de la connexion.';
        }
    }
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">Connexion</h1>
    <form on:submit|preventDefault={login} class="max-w-md mx-auto space-y-4">
        <input 
            type="text" 
            bind:value={nom_utilisateur} 
            placeholder="Nom d'utilisateur" 
            class="w-full p-2 border rounded" 
            required 
        />
        <input 
            type="password" 
            bind:value={mot_de_passe} 
            placeholder="Mot de passe" 
            class="w-full p-2 border rounded" 
            required 
        />
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Se connecter
        </button>
        {#if errorMessage}
            <p class="text-red-500 mt-2">{errorMessage}</p>
        {/if}
    </form>
    <p class="mt-4 text-center">
        Pas encore de compte ? <a href="/register" class="text-blue-500 hover:underline">Inscrivez-vous ici</a>.
    </p>
</div>