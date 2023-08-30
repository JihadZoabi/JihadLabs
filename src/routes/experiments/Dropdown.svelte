<script>
    import { createEventDispatcher } from "svelte";
    import { translate } from "../../translations/translation";
    export let checkboxes;
    export let title;

    const dispatch = createEventDispatcher();
    let selectedCheckboxes = [];

    function toggleCheckbox(checkbox) {
        if (selectedCheckboxes.includes(checkbox.name)) {
            selectedCheckboxes = selectedCheckboxes.filter(
                (name) => name !== checkbox.name
            );
        } else {
            selectedCheckboxes = [...selectedCheckboxes, checkbox.name];
        }
        dispatch("checkboxChange", selectedCheckboxes);
    }
</script>

<main>
    <div class="dropdown">
        <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
        >
            {title}
        </button>
        <ul class="dropdown-menu">
            <li>
                <div
                    class="btn-group-vertical dropdown-item"
                    role="group"
                    aria-label="Basic checkbox toggle button group"
                >
                    {#each checkboxes as checkbox}
                        <input
                            type="checkbox"
                            class="btn-check"
                            id={checkbox.name}
                            autocomplete="off"
                            checked={selectedCheckboxes.includes(checkbox.name)}
                            on:change={() => toggleCheckbox(checkbox)}
                        />
                        <label
                            class="btn btn-outline-warning"
                            for={checkbox.name}
                            >{translate(checkbox.name, "ar")}</label
                        >
                    {/each}
                </div>
            </li>
        </ul>
    </div>
</main>

<style>
    @import "bootstrap/dist/css/bootstrap.rtl.min.css";
    button {
        -webkit-font-smoothing: antialiased;
        color-scheme: light;
        font-family: "Alexandria Variable";
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        outline: 0;
        border: 2px solid #e4e5e7;
        border-radius: 8px;
        box-sizing: border-box;
        color: #222325;
        line-height: 24px;
        min-height: 48px;
        min-width: 50px;
        padding: 12px 16px;
        transition: border-color 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
        user-select: none;
        cursor: pointer;
    }
    label {
        font-family: "Alexandria Variable";
        color: #222325;
    }
    .dropdown-item:focus {
        background-color: transparent !important;
    }
    .dropdown-item {
        background-color: transparent !important;
    }
</style>
