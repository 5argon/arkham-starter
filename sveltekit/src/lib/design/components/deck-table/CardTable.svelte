<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import type { GroupedCards } from '$lib/deck-table/decklist-entry'
	import { extraColumnToHeader, type ExtraColumn } from '$lib/deck-table/grouping'
	import RenderGroupedCards from './RenderGroupedCards.svelte'

	export let groupedCards: GroupedCards[]
	export let toggleMap: { [cardId: string]: boolean }
	export let taboo: boolean
	export let totalLevels: number
	export let fullDatabase: FullDatabase
	export let columns: ExtraColumn[] = []
	export let centered: boolean = false
	export let clickToggle: boolean = false
</script>

<table class:centered>
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
			<RenderGroupedCards
				groupedCards={gc}
				{toggleMap}
				level={0}
				previousGroupedCards={[]}
				{totalLevels}
				{fullDatabase}
				{columns}
				{taboo}
				{clickToggle}
				theOnlyGroup={groupedCards.length === 1}
			/>
		{/each}
	</tbody>
</table>

<style>
	.centered {
		margin: 0 auto;
	}
</style>
