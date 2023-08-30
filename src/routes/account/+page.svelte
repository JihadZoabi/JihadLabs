<script>
    import { auth } from "../../firebase";
    import { onMount } from "svelte";
    import { translate } from "../../translations/translation";
    import Spinner from "../../routes/Spinner.svelte";
    import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import {
        addUser,
        UserExists,
        getUserInformation,
        updateUserInformation,
        getAllFavorites,
    } from "../../api";
    import { language } from "$lib/stores/language";

    let lang = "ar";
    let favorites = null;

    $: {
        lang = $language;
    }

    $: {
        console.log(favorites);
    }

    let user = "";
    let userInformation = { name: "", favorites: "", bio: "" };

    let localName = "";
    let localBio = "";

    onMount(async () => {
        auth.onAuthStateChanged(async (currentUser) => {
            user = currentUser;
            if (user) {
                userInformation = await getUserInformation(user.uid);
                favorites = await getAllFavorites(user.uid);
            }
        });
    });

    async function uploadCurrentChanges() {
        const newUserInformation = {
            name: localName,
            bio: localBio,
        };
        console.log(newUserInformation);
        await updateUserInformation(user.uid, newUserInformation);
        userInformation = newUserInformation;
    }

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            user = result.user;

            const userExists = await UserExists(user.uid);
            if (!userExists) {
                try {
                    await addUser(user.uid);
                } catch (error) {
                    console.log(error.message);
                }
            }
        } catch (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        }
    }

    async function signOut() {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Sign-out error:", error.message);
        }
    }
</script>

<main>
    {#if user}
        {#if userInformation.name == ""}
            <div class="myContainer">
                <div class="myForm">
                    <h5>{translate("weWouldLikeToKnowYouBetter", lang)}</h5>
                    <div class="line" />
                    <br />
                    <label for="nameInput">{translate("name", lang)}</label>
                    <input
                        type="text"
                        id="nameInput"
                        name="name"
                        bind:value={localName}
                        placeholder={translate("name", lang)}
                        required
                    />
                    <label for="descriptionInput"
                        >{translate("description", lang)}</label
                    >
                    <input
                        type="text"
                        id="descriptionInput"
                        name="description"
                        bind:value={localBio}
                        placeholder={translate("description", lang)}
                        required
                    />
                    <button
                        on:click={uploadCurrentChanges}
                        id="submitInformationBtn"
                        >{translate("saveInformation", lang)}</button
                    >
                    <button id="signOutBtn" on:click={signOut}
                        >{translate("signOut", lang)}</button
                    >
                </div>
            </div>
        {:else}
            <h1>{translate("welcome", lang)} {userInformation.name}</h1>
            {#if favorites}
                <h2>{translate("favorites", lang)}</h2>
                <ul>
                    {#each Object.entries(favorites) as [id, title]}
                        <li><a href="/experiments/{id}">{title}</a></li>
                    {/each}
                </ul>
            {:else}
                <h3>{translate("noFavorites", lang)}</h3>
            {/if}
            <button on:click={signOut}>{translate("signOut", lang)}</button>
        {/if}
    {:else}
        <div class="myContainer">
            <div class="myForm">
                <h5>{translate("signIn", lang)}</h5>
                <div class="line" />

                <button on:click={signInWithGoogle} class="loginWithGoogle">
                    <i class="bi bi-google" />
                </button>
                <br />
                <label for="emailInput">{translate("emailAddress", lang)}</label
                >
                <input
                    type="text"
                    id="emailInput"
                    name="email"
                    placeholder={translate("emailAddress", lang)}
                    required
                />
                <label for="passwordInput">{translate("password", lang)}</label>
                <input
                    type="password"
                    id="passwordInput"
                    name="password"
                    placeholder={translate("password", lang)}
                    required
                />

                <button id="submitBtn">{translate("signIn", lang)}</button>
            </div>
        </div>
    {/if}
</main>

<style>
    @import "bootstrap-icons/font/bootstrap-icons.css";
    .myContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: "Alexandria Variable";
    }
    .myForm {
        padding: 30px;
        background-color: #f2f2f2;
        width: 33%;
        border-radius: 8px;
        text-align: center;
    }
    input[type="text"],
    input[type="password"] {
        width: 100%;
        background-color: white;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-sizing: border-box;
        line-height: 1;
    }
    h5 {
        text-align: center;
    }
    .line {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
        border: 1px solid #ccc;
    }
    #submitBtn,
    #submitInformationBtn,
    #signOutBtn {
        color: white;
        border-radius: 8px;
        padding: 8px;
        margin: 0 auto;
    }
    #submitBtn {
        background-color: #ff3e00;
    }
    #submitInformationBtn {
        background-color: blue;
    }
    #signOutBtn {
        background-color: yellow;
        color: black;
    }
    .loginWithGoogle {
        justify-content: center;
        align-items: center;
        display: flex;
        margin-bottom: 20px;
        margin: 0 auto;
        font-size: 1.5rem;
        padding: 5px 5px;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #ccc;
        height: 50px;
        width: 50px;
        background-color: white;
    }
</style>
