<script>
    import { translate } from "../../translations/translation";
    import Dropdown from "./Dropdown.svelte";
    import { onMount } from "svelte";
    import ExperimentCard from "./ExperimentCard.svelte";
    import Modal from "./Modal.svelte";
    import { addExperimentToDatabase, getAllExperiments } from "../../api";
    import { addData } from "../../sample-data";
    import { language} from "$lib/stores/language";


    let lang;

    $: {
        lang = $language;
    }
    const categories = [
        {
            name: "physics",
        },
        {
            name: "chemistry",
        },
        {
            name: "biology",
        },
        {
            name: "astronomy",
        },
    ];
    const grades = [
        {
            name: "first",
        },
        {
            name: "second",
        },
        {
            name: "third",
        },
        {
            name: "fourth",
        },
        {
            name: "fifth",
        },
        {
            name: "sixth",
        },
    ];

    const categories_arr = categories.map((category) => category.name);
    const grades_arr = grades.map((grade) => grade.name);

    let selectedCategories = categories_arr;
    let selectedGrades = grades_arr;

    function handleCategoryChange(event) {
        selectedCategories = event.detail;
        filteredExperiments = filterExperimentsBySubjects(
            experiments,
            selectedCategories,
            selectedGrades
        );
        console.log(selectedCategories);
    }

    function handleGradeChange(event) {
        selectedGrades = event.detail;
        filteredExperiments = filterExperimentsBySubjects(
            experiments,
            selectedCategories,
            selectedGrades
        );
        console.log(selectedGrades);
    }

    function filterExperimentsBySubjects(
        experiments,
        wantedSubjects,
        wantedGrades
    ) {
        let arabicWantedSubjects = wantedSubjects.map((sub) =>
            translate(sub, "ar")
        );
        let arabicWantedGrades = wantedGrades.map((grade) =>
            translate(grade, "ar")
        );
        return experiments.filter(
            (experiment) =>
                arabicWantedSubjects.includes(experiment.subject) &&
                arabicWantedGrades.includes(experiment.grade)
        );
    }

    let experiments = [];
    let filteredExperiments = experiments;

    onMount(async () => {
        experiments = await getAllExperiments();
        let url = new URL(window.location.href);
        let querySubjects = url.searchParams.getAll("subject");
        let queryGrades = url.searchParams.getAll("grade");

        selectedCategories = querySubjects ? querySubjects : categories_arr;
        selectedGrades = queryGrades ? queryGrades : grades_arr;
        filteredExperiments = filterExperimentsBySubjects(
            experiments,
            selectedCategories,
            selectedGrades
        );
    });

    $: if (selectedCategories.length === 0) {
        filteredExperiments = filterExperimentsBySubjects(
            experiments,
            categories_arr,
            selectedGrades
        );
    }
    $: if (selectedGrades.length === 0) {
        filteredExperiments = filterExperimentsBySubjects(
            experiments,
            selectedCategories,
            grades_arr
        );
    }
    $: if (selectedGrades.length === 0 && selectedCategories.length === 0) {
        filteredExperiments = experiments;
    }
</script>

<main>
    <h1>{translate("experiments", lang)}</h1>

    <div class="container d-flex mb-3">
        <div>
            <Dropdown
                title={translate("theSubject", lang)}
                checkboxes={categories}
                on:checkboxChange={handleCategoryChange}
            />
        </div>
        <div>
            <Dropdown
                title={translate("theGrade", lang)}
                checkboxes={grades}
                on:checkboxChange={handleGradeChange}
            />
        </div>
        <div class="ms-2">
            <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                id="addBtn"
                class="d-flex justify-content-center align-items-center btn btn-primary"
                ><i class="bi bi-plus" /></button
            >
        </div>

        <Modal grades={grades_arr} subjects={categories_arr}></Modal>
    </div>

    {#if experiments}
        <div class="container">
            <div class="row">
                {#each filteredExperiments as experiment}
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <ExperimentCard {experiment} />
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</main>

<style>
    @import "bootstrap/dist/css/bootstrap.rtl.min.css";
    @import "bootstrap-icons/font/bootstrap-icons.css";
    h1 {
        font-weight: 600;
        font-family: "Tajawal", sans-serif;
        z-index: 100;
    }
    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        box-sizing: border-box;
    }
    #addBtn {
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        display: inline-flex;
        border: none;
        transition: transform 0.8s ease-in-out;
        font-size: 2rem;
    }
    #addBtn:hover {
        transform: rotate(360deg);
    }
</style>
