<script lang="ts">
	export let url: string
	export let title: string
	export let description: string
</script>

<div class="frame">
	<h3><a href={url}>{title}</a></h3>
	<p>{description}</p>
</div>

<style>
	.frame {
		border: 1px solid #ccc;
		padding: 0px 16px;
		margin: 8px 0px;
	}
</style>
