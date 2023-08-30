<script>
    // This file is for /subjects alone (not /subjects/subject)
    import physics_icon from "$lib/images/icons/physics_icon.png";
    import astro_icon from "$lib/images/icons/astronomy.png";
    import biology_icon from "$lib/images/icons/biology.png";
    import chemistry_icon from "$lib/images/icons/chemistry.png";
    import SubjectCard from "../SubjectCard.svelte";
    import { translate } from "../../translations/translation";

	import { language } from "$lib/stores/language";

    let lang;

    $: {
        lang = $language;
    }

    let grade = 'first';
    function handleGradeChange(event) {
        grade = event.target.value;
    }

</script>

<main>
    <h1>
        {translate("IamAtGrade",lang)}
        <select name="grades" id="grades" bind:value={grade} on:change={handleGradeChange}>
            <option value="first">{translate("first", lang)}</option>
            <option value="second">{translate("second", lang)}</option>
            <option value="third">{translate("third", lang)}</option>
            <option value="fourth">{translate("fourth", lang)}</option>
            <option value="fifth">{translate("fifth", lang)}</option>
            <option value="sixth">{translate("sixth", lang)}</option>
        </select>
        {translate("andIWannaLearn", lang)}
    </h1>

    <br />
    <div class="container-fluid text-center">
        <div class="row justify-content-center">
            <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
                <SubjectCard title="physics" {grade} img={physics_icon} />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
                <SubjectCard title="astronomy" {grade} img={astro_icon} />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
                <SubjectCard title="biology" {grade} img={biology_icon} />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
                <SubjectCard title="chemistry" {grade} img={chemistry_icon} />
            </div>
        </div>
    </div>
</main>

<style>
    @import "bootstrap/dist/css/bootstrap.rtl.min.css";
    .container-fluid {
        width: 100%;
    }
    h1 {
        font-family: "Alexandria Variable";
        text-align: center;
    }
    main {
        flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
    }
    select {
        min-width: 16rem;
        text-transform: none;
        border-radius: 0.5rem;
        background: rgb(255, 255, 255);
        border: 3px solid rgb(49, 48, 51);
        padding: 0.5rem 2.5rem 0.5rem 1rem;
        font-size: 2rem;
        font-family: "Alexandria Variable";
        text-align: center;
    }
</style>
