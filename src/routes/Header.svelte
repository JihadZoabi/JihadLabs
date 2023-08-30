<script>
	import { page } from "$app/stores";
	import { translate } from "../translations/translation";
	import { auth } from "../firebase";
	import { onMount } from "svelte";
	import { getRandomExperiment } from "../api";
	import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
	import { language, direction } from "$lib/stores/language";

	let lang;

	$: {
		lang = $language;
	}

	function changeLanguage() {
		let newLang = lang === "ar" ? "en" : "ar";
		let newDir = lang === "ar" ? "ltr" : "rtl";
		language.set(newLang);
		direction.set(newDir);
	}

	let user = null;

	onMount(async () => {
		// Check if a user is already signed in
		auth.onAuthStateChanged((currentUser) => {
			user = currentUser;
		});
	});
</script>

<header>
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container-fluid">
			<a class="navbar-brand" href="/">{translate("jihadLabs", lang)}</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<a
							class="nav-link {$page.url.pathname === '/'
								? 'active'
								: undefined}"
							aria-current={$page.url.pathname === "/"
								? "page"
								: undefined}
							href="/">{translate("home", lang)}</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link {$page.url.pathname.startsWith(
								'/subjects'
							)
								? 'active'
								: undefined}"
							aria-current={$page.url.pathname.startsWith(
								"/subjects"
							)
								? "page"
								: undefined}
							href="/subjects">{translate("subjects", lang)}</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link {$page.url.pathname.includes(
								'/experiments'
							)
								? 'active'
								: undefined}"
							aria-current={$page.url.pathname === "/experiments"
								? "page"
								: undefined}
							href="/experiments"
							>{translate("experiments", lang)}</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link {$page.url.pathname.includes(
								'/random'
							)
								? 'active'
								: undefined}
						"
							href="/random">{translate("surpriseMe", lang)}</a
						>
					</li>
				</ul>
				<ul class="navbar-nav ms-auto">
					<li class="nav-item">
						<a
							class="nav-link {$page.url.pathname.includes(
								'/account'
							)
								? 'active'
								: undefined}"
							aria-current={$page.url.pathname === "/account"
								? "page"
								: undefined}
							href="/account">{translate("account", lang)}</a
						>
					</li>
					<li class="nav-item">
						<button class="nav-link" on:click={changeLanguage}>
							{translate("language", lang)}
						</button>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</header>

{#if lang === "ar"}
	<style>
		@import "bootstrap/dist/css/bootstrap.rtl.min.css";
	</style>
	<script>
		document.documentElement.dir = "rtl";
		document.documentElement.lang = "ar";
	</script>
{:else}
	<style>
		@import "bootstrap/dist/css/bootstrap.min.css";
	</style>
	<script>
		document.documentElement.dir = "ltr";
		document.documentElement.lang = "en";
	</script>
{/if}

<style>
	header {
		z-index: 5;
	}
	.nav-link {
		font-family: "Tajawal", sans-serif;
		font-size: 1.3rem;
	}
	.navbar-brand {
		font-family: "Tajawal", sans-serif;
		font-weight: 800;
		font-size: 1.5rem;
	}
	.active {
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-color: red;
	}
</style>
