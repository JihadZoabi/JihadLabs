<script>
    import { onMount } from "svelte";
    import { getRandomExperiment } from "../../api";
    import { goto } from "$app/navigation";
    import Spinner from "../Spinner.svelte";

    onMount(async () => {
        const randomExp = await getRandomExperiment();
        goto("experiments/" + randomExp.id);
    });
</script>

<main>
    <Spinner duration={10} />
</main>

<style>
</style>
