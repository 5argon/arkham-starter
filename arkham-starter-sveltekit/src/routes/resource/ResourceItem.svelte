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
		border: 1px solid #ccc;
		padding: 0px 16px;
		margin: 8px 0px;
	}

	img {
		max-width: 250px;
	}

	.text {
		margin: 0px 16px;
	}
</style>
