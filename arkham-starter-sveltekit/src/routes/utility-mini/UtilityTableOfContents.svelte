<script lang="ts">
	import utilityMiniCardJsonImport from '$lib/data/util-mini-db.json'
	import UtilityResultSet from './UtilityResultSet.svelte'
	import type { ResultSet } from './result'
	const utilityMiniCardJson: ResultSet[] = utilityMiniCardJsonImport as ResultSet[]
	let openedIndex = -1
</script>

{#each utilityMiniCardJson as resultSet, i}
	<UtilityResultSet
		{resultSet}
		expanded={openedIndex === i}
		onToggle={() => {
			openedIndex = openedIndex === i ? -1 : i
		}}
	/>
{/each}
