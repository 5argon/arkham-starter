<script lang="ts">
	export let url: string
	export let title: string
	export let description: string
	export let image: string | undefined = undefined
</script>

<div class="frame">
	{#if image}
		<img src="image/resource/{image}" alt={title} />
	{/if}
	<div class="text">
		<h3><a href={url}>{title}</a></h3>
		<p>{description}</p>
	</div>
</div>

<style>
	.frame {
		display: flex;
		flex-direction: column;
		border: 1px solid #ccc;
		padding: 0px 16px;
		margin: 8px 0px;
	}

	@media (min-width: 768px) {
		.frame {
			flex-direction: row;
		}
	}

	img {
		max-width: 250px;
		margin: 0 auto;
	}

	.text {
		flex: 1;
		margin: 0px 16px;
	}
</style>
