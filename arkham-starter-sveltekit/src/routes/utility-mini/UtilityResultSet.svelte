<script lang="ts">
	import utilityMiniCardJsonImport from '$lib/data/util-mini-db.json'

	import type { ResultSet } from './result'
	import UtilityResultItem from './UtilityResultItem.svelte'
	import UtilityResultSet from './UtilityResultSet.svelte'

	export let resultSet: ResultSet
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
		<span class="set">{resultSet.setName}</span><span class="count"
			>Items : {resultSet.itemCount}, Printed Count : {resultSet.printedQuantity}</span
		>
	</div>
	{#if expanded}
		{#each resultSet.items as item}
			<UtilityResultItem {item} />
		{/each}
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
	}

	.top-wrap:hover {
		background-color: #eee;
	}

	.set {
		font-size: x-large;
	}

	.count {
		float: right;
	}
</style>
