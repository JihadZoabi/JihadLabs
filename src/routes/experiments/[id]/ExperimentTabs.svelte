<script>
    import { onMount } from "svelte";
    import { translate } from "../../../translations/translation";
    import {
        addToFavorites,
        inFavorites,
        removeFromFavorites,
        isLiked,

        removeLikeExperiment,

        likeExperiment,

        getNumberOfLikes



    } from "../../../api";
    import { auth } from "../../../firebase";
    import { language } from "$lib/stores/language";
    export let experiment;
    let user;
    let expInFavorites;
    let experimentLiked;
    let numberOfLikes;

    let lang = "ar";

    $: {
        lang = $language;
    }

    const printAsPDF = () => {
        window.print();
    };

    async function addFav() {
        await addToFavorites(user.uid, experiment.id, experiment.title);
        expInFavorites = true;
    }

    async function removeFav() {
        await removeFromFavorites(user.uid, experiment.id);
        expInFavorites = false;
    }

    async function removeLike() {
        await removeLikeExperiment(user.uid, experiment.id);
        experimentLiked = false;
        numberOfLikes--;
    }

    async function addLike() {
        await likeExperiment(user.uid, experiment.id);
        experimentLiked = true;
        numberOfLikes++;
    }

    onMount(async () => {
        auth.onAuthStateChanged(async (currentUser) => {
            user = currentUser;
            console.log("user is " + user);
            numberOfLikes = await getNumberOfLikes(experiment.id);
            if (user) {
                expInFavorites = await inFavorites(user.uid, experiment.id);
                experimentLiked = await isLiked(user.uid, experiment.id);
            }
        });
    });
</script>

<main>
    <div class="card">
        <h5 class="card-header">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                        class="nav-link active"
                        id="nav-supplies-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-supplies"
                        type="button"
                        role="tab"
                        aria-controls="nav-supplies"
                        aria-selected="true"
                        >{translate("supplies", lang)}</button
                    >
                    <button
                        class="nav-link"
                        id="nav-instructions-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-instructions"
                        type="button"
                        role="tab"
                        aria-controls="nav-instructions"
                        aria-selected="false"
                        >{translate("instructions", lang)}</button
                    >
                    <button
                        class="nav-link"
                        id="nav-precautions-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-precautions"
                        type="button"
                        role="tab"
                        aria-controls="nav-precautions"
                        aria-selected="false"
                        >{translate("precautions", lang)}</button
                    >
                    <button
                        class="nav-link"
                        id="nav-explanation-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-explanation"
                        type="button"
                        role="tab"
                        aria-controls="nav-explanation"
                        aria-selected="false"
                        >{translate("explanation", lang)}</button
                    >
                </div>
            </nav>
        </h5>
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">{experiment.title}</h5>
            <div class="tab-content">
                <div class="tab-content" id="nav-tabContent">
                    <div
                        class="tab-pane fade show active"
                        id="nav-supplies"
                        role="tabpanel"
                        aria-labelledby="nav-supplies-tab"
                    >
                        {experiment.tools}<br />{experiment.materials}
                    </div>
                    <div
                        class="tab-pane fade"
                        id="nav-instructions"
                        role="tabpanel"
                        aria-labelledby="nav-instructions-tab"
                    >
                        {experiment.instructions}
                    </div>
                    <div
                        class="tab-pane fade"
                        id="nav-precautions"
                        role="tabpanel"
                        aria-labelledby="nav-precautions-tab"
                    >
                        {experiment.precautions}
                    </div>
                    <div
                        class="tab-pane fade"
                        id="nav-explanation"
                        role="tabpanel"
                        aria-labelledby="nav-explanation-tab"
                    >
                        {experiment.explanation}
                    </div>
                </div>
            </div>
            <div class="mt-auto">
                <button
                    on:click={printAsPDF}
                    id="printBtn"
                    class="btn btn-primary mt-3"
                    >{translate("printExperiment", lang)}</button
                >
                {#if user}
                    {#if expInFavorites}
                        <button on:click={removeFav} class="btn">
                            <i class="bi bi-heart-fill in" />
                        </button>
                    {:else}
                        <button on:click={addFav} class="btn">
                            <i class="bi bi-heart out" />
                        </button>
                    {/if}

                    {#if experimentLiked}
                        <button on:click={removeLike} class="btn">
                            <i class="bi bi-hand-thumbs-up-fill" /> {numberOfLikes}
                        </button>
                    {:else}
                        <button on:click={addLike} class="btn">
                            <i class="bi bi-hand-thumbs-up" /> {numberOfLikes}
                        </button>
                    {/if}
                {:else}
                    <h6 class="mt-3">{translate("toAddExpNote", lang)}</h6>
                {/if}
            </div>
        </div>
    </div>
</main>

<!-- $nav-link-color:; -->

<style lang="scss">
    @import "bootstrap/dist/css/bootstrap.rtl.min.css";
    @import "bootstrap-icons/font/bootstrap-icons.css";

    .nav-link {
        font-family: "Alexandria Variable";
    }
    .card-body {
        font-family: "Alexandria Variable";
    }
    .in {
        color: red;
        font-size: 1.5rem;
    }
    .out {
        color: red;
        font-size: 1.5rem;
    }
    @media print {
        .tab-pane.fade {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        #printBtn {
            display: none;
        }
    }
</style>
