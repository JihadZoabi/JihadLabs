<script>
    import { translate } from "../../translations/translation";
    import { addExperimentToDatabase, generateUniqueKey, fetchExperimentByAPI, updateExperiment } from "../../api";
    import { goto } from "$app/navigation";
    export let subjects;
    export let grades;

    let selectedGrade = "first";
    let selectedSubject = "physics";

    function handleChanges(newSubject, newGrade) {
        if (newSubject != null) selectedSubject = newSubject;
        if (newGrade != null) selectedGrade = newGrade;
    }

    async function createExperiment() {
        let newExpId = generateUniqueKey(8);
        await addExperimentToDatabase(newExpId, "", "", "", "", "", "", "", "");

        const modal = document.getElementById("exampleModal");
        modal.classList.remove("show");
        const backdrop = document.querySelector(".modal-backdrop");
        backdrop.parentNode.removeChild(backdrop);

        // I was too lazy to install jQuery and do $(".modal").modal("hide")

        goto(`/experiments/${newExpId}`);

        const newExperiment = await fetchExperimentByAPI(selectedSubject, selectedGrade);
        await updateExperiment(newExpId, newExperiment);
    }
</script>

<main>
    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        {translate("newExperiment", "ar")}
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    />
                </div>
                <div class="modal-body">
                    <h6>اختر الموضوع</h6>
                    <div
                        class="btn-group"
                        role="group"
                        aria-label="Subjects button group"
                    >
                        {#each subjects as subject, index}
                            <input
                                type="radio"
                                class="btn-check"
                                name="btnradio"
                                id="btn-{subject}"
                                on:change={() => handleChanges(subject, null)}
                                autocomplete="off"
                                checked={index === 0}
                            />
                            <label
                                class="btn btn-outline-primary"
                                for="btn-{subject}"
                                >{translate(subject, "ar")}</label
                            >
                        {/each}
                    </div>
                    <h6>اختر الصف</h6>
                    <div class="btn-group" role="group" aria-label="Grades">
                        {#each grades as grade, index}
                            <input
                                type="radio"
                                class="btn-check"
                                name="btn-grade-radio"
                                id="btn-{grade}"
                                autocomplete="off"
                                on:change={() => handleChanges(null, grade)}
                                checked={index === 0}
                            />
                            <label
                                class="btn btn-outline-primary"
                                for="btn-{grade}"
                                >{translate(grade, "ar")}</label
                            >
                        {/each}
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        on:click={createExperiment}
                        id="createExperimentBtn"
                        type="button"
                        class="btn btn-primary"
                        >{translate("createExperiment", "ar")}</button
                    >
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    @import "bootstrap/dist/css/bootstrap.rtl.min.css";
    h6,
    h1,
    #createExperimentBtn {
        font-family: "Alexandria Variable";
    }
    h6 {
        margin-bottom: 0.8rem;
        margin-top: 0.6rem;
    }
    label {
        font-family: "Tajawal", sans-serif;
    }
</style>
