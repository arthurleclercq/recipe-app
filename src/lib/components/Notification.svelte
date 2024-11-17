<!-- src/lib/components/Notification.svelte -->
<script lang="ts">
    import { notification } from '$lib/stores/notificationStore';
    import { fade } from 'svelte/transition';
</script>

{#if $notification.message}
    <div 
        class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
        transition:fade
    >
        <div class={`px-4 py-2 rounded-md shadow-md ${$notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {$notification.message}
        </div>
    </div>
{/if}

<style>
</style>