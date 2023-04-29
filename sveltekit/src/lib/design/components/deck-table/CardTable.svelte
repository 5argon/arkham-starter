<script lang="ts">
	import type { CampaignDatabase } from '$lib/core/campaign-database'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { GroupedCards } from '$lib/deck-table/decklist-entry'
	import { extraColumnToHeader, type ExtraColumn } from '$lib/deck-table/grouping'
	import RenderGroupedCards, { type ScansOption } from './RenderGroupedCards.svelte'

	export let groupedCards: GroupedCards[]
	export let toggleMap: { [cardId: string]: boolean }
	export let taboo: boolean
	export let totalLevels: number
	export let fullDatabase: FullDatabase
	export let campaignDatabase: CampaignDatabase | null
	export let columns: ExtraColumn[] = []
	export let centered: boolean = false
	export let hideAmount: boolean = false
	export let scansMode: ScansOption | null = null
	export let onClickToggle: ((id: string, t: boolean) => void) | null = null
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
				{campaignDatabase}
				{columns}
				{taboo}
				theOnlyGroup={groupedCards.length === 1}
				{hideAmount}
				{onClickToggle}
				{scansMode}
			/>
		{/each}
	</tbody>
</table>

<style>
	.centered {
		margin: 0 auto;
	}
</style>
