<script>
    import {translate} from "../../translations/translation"
    export let experiment;
</script>

<div class="card">
    <h5 class="card-header">{experiment.subject} - {experiment.grade}</h5>
    <div class="card-body">
        <h5 class="card-title">{experiment.title}</h5>
        <p class="card-text">
            {experiment.explanation}
        </p>
        <a href="/experiments/{experiment.id}" class="btn btn-primary">{translate("readMore", "ar")}</a>
    </div>
</div>

<style>
    @import "bootstrap/dist/css/bootstrap.rtl.min.css";
    * {
        font-family: "Alexandria Variable";
    }
</style>
