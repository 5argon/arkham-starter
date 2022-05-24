<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import type { GroupedCards } from '$lib/deck-table/decklist-entry'
	import { extraColumnToHeader, type ExtraColumn } from '$lib/deck-table/grouping'
	import RenderGroupedCards from './RenderGroupedCards.svelte'

	export let groupedCards: GroupedCards[]
	export let taboo: boolean
	export let fullDatabase: FullDatabase
	export let columns: ExtraColumn[] = []
	console.log(groupedCards)
</script>

<table>
	{#if columns.length > 0}
		<thead>
			<tr>
				<!-- This is for the card, which has no header. -->
				<th />
				{#each columns as c}
					<th>
						{extraColumnToHeader(c)}
					</th>
				{/each}
			</tr>
		</thead>
	{/if}
	<tbody>
		{#each groupedCards as gc}
			<RenderGroupedCards groupedCards={gc} level={0} {fullDatabase} {columns} {taboo} />
		{/each}
	</tbody>
</table>
