<script>
    import { translate } from "../translations/translation";
    import illustration from "$lib/images/illustration.svg";
    import { language, direction } from "$lib/stores/language";

    let lang;

    $: {
        lang = $language;
    }
</script>

<header>
    <div class="container-fluid">
        <div
            id="pink-rect"
            class="d-flex flex-column flex-md-row justify-content-between align-items-center p-md-3"
        >
            <div class="text-center text-md-start mb-3 mb-md-0">
                <h1>{translate("headerPinkRect", lang)}</h1>
                <h2 class="d-none d-md-block">{translate("subHeaderPinkRect", lang)}</h2>
            </div>
            <div class="svg-container mt-3 mt-md-0 text-center">
                <img
                    src={illustration}
                    alt="#"
                    class="img-fluid"
                    max-width="250px"
                />
            </div>
        </div>
    </div>
</header>

<style>
    @import "bootstrap/dist/css/bootstrap.rtl.min.css";
    .container-fluid {
        width: 100%;
    }
    #pink-rect {
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        width: 75vw;
        height: 300px;
        -ms-border-radius: 30px;
        -o-border-radius: 30px;
        -moz-border-radius: 30px;
        -webkit-border-radius: 30px;
        border-radius: 30px;
        background: rgba(249, 217, 235, 1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
    }

    h1,
    h2 {
        font-family: "Tajawal", sans-serif;
    }

    h1 {
        font-size: 2rem;
        font-weight: 800;
    }

    h2 {
        font-weight: 1rem;
    }
    img {
        height: 50%;
        overflow: hidden;
    }
</style>
