<script lang="ts">
	export let show: boolean
	export let onClose: () => void
	export let title: string | null = null
</script>

{#if show}
	<div class="full-screen" on:click={onClose}>
		<div class="inner-white" on:click|stopPropagation>
			{#if title !== null}<h1>{title}</h1>{/if}
			<slot />
		</div>
	</div>
{/if}

<style>
	.full-screen {
		position: fixed;
		z-index: 9999;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.inner-white {
		margin-top: 5%;
		margin-left: 10%;
		margin-right: 10%;
		padding: 0% 10%;
		height: 75%;
		background-color: white;
		box-shadow: 1px 2px 5px 3px rgba(0, 0, 0, 0.3);
		overflow: scroll;
	}
</style>
