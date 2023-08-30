<script>
    import { translate } from "../translations/translation";
	import { language, direction } from "$lib/stores/language";

    export let subject;
    export let color;
    export let description;


    let lang;

    $: {
        lang = $language;
    }
</script>

<div class="card" style="background-color: {color}">
    <!-- <img src="..." class="card-img-top" alt="..." /> -->
    <div class="card-body">
        <h5 class="card-title">{translate(subject, lang)}</h5>
        <p class="card-text">
            {translate(description, lang)}
        </p>
        <a href="/experiments?subject={subject}" class="btn btn-primary mx-auto"
            >{translate("discoverTheWorldOf",lang)} {translate(subject, lang)}</a
        >
    </div>
</div>

<style>
    @import "bootstrap/dist/css/bootstrap.rtl.min.css";
    .card {
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        border-radius: 15px;
        -ms-border-radius: 15px;
        -o-border-radius: 15px;
        -moz-border-radius: 15px;
        -webkit-border-radius: 15px;
    }
    .card-title {
        font-weight: 600;
    }
    .card-text {
        font-family: 'Alexandria Variable';
        font-weight: 300;
    }
    h5 {
        font-family: "Tajawal", sans-serif;
    }
</style>
