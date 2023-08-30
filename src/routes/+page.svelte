<script>
	import PinkRectangle from "./PinkRectangle.svelte";
	import CategoryCard from "./CategoryCard.svelte";

	const categories = [
		{
			name: "physics",
			color: "#7fd6c2",
		},
		{
			name: "chemistry",
			color: "#AAC6FC",
		},
		{
			name: "biology",
			color: "#F6E049",
		},
		{
			name: "astronomy",
			color: "#EEBED3",
		},
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
	<section>
		<PinkRectangle />
	</section>

	<br />

	<div class="container">
		<div class="row justify-content-center">
			{#each categories as category (category.name)}
				<div class="col-lg-6 col-md-6 col-sm-12 mt-3 mx-auto">
					<CategoryCard
						color={category.color}
						subject={category.name}
						description={category.name + "Description"}
					/>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	@import "bootstrap/dist/css/bootstrap.rtl.min.css";
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
	.container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
