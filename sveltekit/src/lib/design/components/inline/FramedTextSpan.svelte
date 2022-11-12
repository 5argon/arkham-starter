<script lang="ts">
	export let text: string
</script>

{#if text !== ''}
	<span>{text}</span>
{/if}

<style>
	span {
		font-weight: bold;
		background-color: gray;
		color: white;
		padding: 2px 4px;
	}
</style>
