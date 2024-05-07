<script lang="ts">
	import Foldout from '$lib/design/components/basic/Foldout.svelte'
	import type { ResultSet } from './result'
	import UtilityResultItem from './UtilityResultItem.svelte'

	export let resultSet: ResultSet
	export let expanded: boolean
	export let onToggle: () => void
</script>

<Foldout title={resultSet.setName} {expanded} {onToggle}>
	<svelte:fragment slot="default">
		{#each resultSet.items as item}
			<UtilityResultItem {item} />
		{/each}
	</svelte:fragment>
	<svelte:fragment slot="right">
		<span class="count"
			>Items : {resultSet.itemCount}, Printed Count : {resultSet.printedQuantity}</span
		>
	</svelte:fragment>
</Foldout>
