<script lang="ts">
    import { goto } from '$app/navigation';
</script>

<button on:click={() => goto('/')} class="fixed top-1 right-1 z-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md">
    Retour à l'accueil
</button>