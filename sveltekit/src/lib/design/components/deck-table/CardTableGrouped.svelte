<script lang="ts">
	import type { CampaignDatabase } from '$lib/core/campaign-database'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { DecklistEntry, GroupedCards } from '$lib/deck-table/decklist-entry'
	import type { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
	import { groupCards } from '$lib/deck-table/grouping/group-cards'
	import CardTable from './CardTable.svelte'
	import type { ScansOption } from './RenderGroupedCards.svelte'

	export let entries: DecklistEntry[]
	$: entriesForwarded = entries.map<DecklistEntry>((x) => {
		return {
			...x,
			cardId: x.cardId,
		}
	})
	export let groupings: Grouping[]
	export let sortings: Sorting[]
	export let toggleMap: { [cardId: string]: boolean }
	export let taboo: boolean
	export let fullDatabase: FullDatabase
	export let campaignDatabase: CampaignDatabase | null = null
	export let columns: ExtraColumn[] = []
	export let centered: boolean = false
	export let onClickToggle: ((id: string, t: boolean) => void) | null = null
	export let hideAmount: boolean = false
	export let scansMode: ScansOption | null = null
	$: gc = groupCards(entriesForwarded, groupings, sortings, fullDatabase)
	var flatGroup: GroupedCards[] = []
	$: {
		flatGroup = [
			{
				groupName: null,
				entries: gc.flatMap((x) => x.entries),
			},
		]
	}
</script>

<CardTable
	{toggleMap}
	{campaignDatabase}
	{fullDatabase}
	{taboo}
	groupedCards={scansMode ? flatGroup : gc}
	{columns}
	{centered}
	{onClickToggle}
	totalLevels={groupings.length}
	{hideAmount}
	{scansMode}
/>
