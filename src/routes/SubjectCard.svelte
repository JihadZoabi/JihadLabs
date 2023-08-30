<script>
    import { translate } from "../translations/translation";
    export let title;
    export let grade;
    export let img;
    import { language } from "$lib/stores/language";

    let lang;

    $: {
        lang = $language
    }
</script>

<a href="/experiments?subject={title}&grade={grade}">
    <div class="subject-card">
        <div class="card-image">
            <img src={img} alt="#" />
        </div>
        <div class="footer-container">
            <div class="footer">
                <h2>{translate(title,lang)}</h2>
            </div>
        </div>
    </div>
</a>

<style>
    a {
        --swiper-theme-color: #007aff;
        --swiper-navigation-size: 44px;
        color-scheme: light;
        font-family: "Open Sans", sans-serif, sans-serif;
        box-sizing: border-box;
        max-width: none;
        position: relative;
        transition: transform 0.3s ease 0s, translateY 0.3s ease 0s;
        width: auto;
    }
    .subject-card {
        margin: 0 auto; /* Center horizontally */
        --swiper-theme-color: #007aff;
        --swiper-navigation-size: 44px;
        color-scheme: light;
        box-sizing: border-box;
        max-width: none;
        font-family: inherit;
        color: rgb(0, 17, 34);
        -webkit-box-align: initial;
        align-items: initial;
        align-self: stretch;
        background-color: rgb(255, 255, 255);
        border-radius: 1rem;
        border: 0.125rem solid rgb(188, 194, 207);
        box-shadow: rgb(188, 194, 207) 0px 0.25rem 0px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        padding: 0px;
        position: relative;
        text-align: start;
        transition: transform 0.3s ease 0s, box-shadow 0.3s ease 0s;
        min-height: 16rem;
        width: 12rem;
    }
    .subject-card:hover {
        box-shadow: rgb(188, 194, 207) 0px 0.5rem 0px;
    }

    .card-image {
        --swiper-theme-color: #007aff;
        --swiper-navigation-size: 44px;
        color-scheme: light;
        font-family: inherit;
        color: rgb(0, 17, 34);
        cursor: pointer;
        text-align: start;
        box-sizing: border-box;
        max-width: none;
        background: rgb(255, 255, 255);
        border-radius: 0.5rem;
        height: 12rem;
        object-fit: contain;
        width: auto;
        overflow: hidden;
    }
    .card-image img {
        --swiper-theme-color: #007aff;
        --swiper-navigation-size: 44px;
        color-scheme: light;
        font-family: inherit;
        color: rgb(0, 17, 34);
        cursor: pointer;
        text-align: start;
        box-sizing: border-box;
        max-width: none;
        border-radius: 0.5rem;
        height: 12rem;
        object-fit: fill;
        transition: transform 0.3s ease 0s;
        width: 12rem;
    }
    .footer-container {
        --swiper-theme-color: #007aff;
        --swiper-navigation-size: 44px;
        color-scheme: light;
        font-family: inherit;
        color: rgb(0, 17, 34);
        cursor: pointer;
        text-align: start;
        box-sizing: border-box;
        max-width: none;
        border-radius: 0.5rem;
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        position: relative;
        transition: transform 0.3s ease 0s;
        -webkit-box-pack: start;
        justify-content: flex-start;
        margin-top: 0.75rem;
    }
    .footer {
        --swiper-theme-color: #007aff;
        --swiper-navigation-size: 44px;
        color-scheme: light;
        font-family: inherit;
        color: rgb(0, 17, 34);
        cursor: pointer;
        text-align: start;
        box-sizing: border-box;
        max-width: none;
        display: flex;
        flex-direction: column;
        -webkit-box-flex: 1;
        flex-grow: 1;
        -webkit-box-pack: start;
        justify-content: flex-start;
        position: relative;
        transition: background 0.3s ease 0s;
        border-radius: 0px 0px 0.5rem 0.5rem;
        padding: 0px 1rem;
    }
    .footer h2 {
        --swiper-theme-color: #007aff;
        --swiper-navigation-size: 44px;
        color-scheme: light;
        cursor: pointer;
        box-sizing: border-box;
        max-width: 70ex;
        color: rgb(49, 48, 51);
        font-family: Boing, Noto, "Noto Sans JP", "Open Sans", sans-serif;
        font-size: 1.125rem;
        text-align: center;
        width: auto;
        margin: 0px;
    }
</style>
