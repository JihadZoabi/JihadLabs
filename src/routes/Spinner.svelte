<script>
    import { onMount } from "svelte";
    export let duration = 0;
    let showSpinner = true;

    onMount(() => {
        if (duration > 0) {
            setTimeout(() => {
                showSpinner = false;
            }, duration * 1000);
        }
    });
</script>

<main>
    {#if showSpinner}
        <div class="spinner-container">
            <div class="spinner-border mx-auto" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    {/if}
</main>

<style>
    @import "bootstrap/dist/css/bootstrap.rtl.min.css";
    .spinner-container {
        height: 40vh;
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .spinner-border {
        width: 5rem;
        height: 5rem;
    }
</style>
