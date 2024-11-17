<script lang="ts">
    import '../app.css';
    import { page } from '$app/stores';
    import { afterNavigate, goto } from '$app/navigation';
    import BackToHome from '$lib/components/BackToHome.svelte';
    import Notification from '$lib/components/Notification.svelte';
    import { showNotification } from '$lib/stores/notificationStore';   
    import { userStore, setUser } from '$lib/stores/userStore';
    import { get } from 'svelte/store';

    let user = $userStore;



    afterNavigate(async () => {
        // Appeler l'API pour vérifier la session
        const response = await fetch('/api/auth/check-session');
        if (response.ok) {
            const data = await response.json();
            //console.log("retour api",data.user)
            if (data.user) {
                // Mettre à jour le store avec les données de l'utilisateur
                setUser(data.user.utilisateur_id, data.user.nom_utilisateur);
                console.log("userstore content : ",get(userStore))
                user=data.user;
            }else{
                userStore.set(null);
                user=null;
            }
        }else{
            console.log("problème API : vérification de session")
        }
    });

    async function handleLogout() {
        try {
            const response = await fetch('/api/auth/logout', { method: 'POST' });
            if (response.ok) {
                showNotification('Vous avez été déconnecté avec succès', 'success');
                await goto('/');
            } else {
                console.error('Erreur lors de la déconnexion');
                showNotification('Erreur lors de la déconnexion', 'error');
            }
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            showNotification('Une erreur est survenue lors de la déconnexion', 'error');
        }
    }

    // Vérifier si nous sommes sur la page d'accueil
    $: isHomePage = $page.url.pathname === '/';

</script>

<Notification />
{#key user}
    <nav>
        {#if user}
            <p>Bienvenue, {user.nom_utilisateur} !</p>
            <button class="text-red-500 hover:underline" on:click={handleLogout}>Déconnexion</button>
        {:else}        
            <a href="/login" class="text-blue-500 hover:underline">Connexion</a>
            <a href="/register" class="text-blue-500 hover:underline">Inscription</a>
        {/if}
    </nav>
{/key}

{#if !isHomePage}
    <BackToHome />
{/if}

<main>
    <slot />
</main>