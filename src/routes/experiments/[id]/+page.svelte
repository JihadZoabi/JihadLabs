<script>
    import { onMount } from "svelte";
    import { getExperimentById, getRandomExperiment } from "../../../api.js";
    import ExperimentTabs from "./ExperimentTabs.svelte";
    import { db } from "../../../firebase.js";
    import { get, ref, onValue } from "firebase/database";
    import { goto } from "$app/navigation";
    import Spinner from "../../Spinner.svelte";

    export let data;
    let expId = data.id;
    $: experiment = null;

    onMount(() => {
        getExperimentById(data.id).then((exp) => {
            const experimentRef = ref(db, "experiments/" + expId);
            onValue(experimentRef, (snapshot) => {
                experiment = snapshot.val();
                experiment.id = expId;
            });
        });
    });
</script>

<main>
    {#if experiment && experiment.title != ""}
        <ExperimentTabs {experiment} />
    {:else}
        <Spinner />
    {/if}
</main>

<style>
    @import "bootstrap/dist/css/bootstrap.rtl.min.css";
</style>
