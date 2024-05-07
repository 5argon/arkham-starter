<script lang="ts">
	import { allIcons } from '$lib/design/icons/all-icons'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	export let title: string
	export let expanded: boolean
	export let onToggle: () => void
	let element: HTMLDivElement
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={element} class="top-expand">
	<div
		class="top-wrap"
		on:click={() => {
			onToggle()
		}}
	>
		<span class="set" class:expanded-set={expanded}
			><span class="arrow"
				><FaIcon path={expanded ? allIcons.foldoutDown : allIcons.foldoutRight} /></span
			>{title}</span
		><slot name="right" />
	</div>
	{#if expanded}
		<slot />
	{/if}
</div>

<style>
	.top-expand {
		padding: 4px 8px;
		border: 1px solid #ccc;
		margin: 2px 0px;
	}

	.top-wrap {
		padding: 4px 8px;
		user-select: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.top-wrap:hover {
		background-color: #eee;
	}

	.set {
		font-size: large;
	}

	.expanded-set {
		font-weight: bold;
	}

	.arrow {
		margin-right: 8px;
	}
</style>
