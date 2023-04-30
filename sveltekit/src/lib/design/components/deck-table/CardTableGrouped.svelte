<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import type { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
	import { groupCards } from '$lib/deck-table/grouping/group-cards'
	import CardTable from './CardTable.svelte'

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
	// TODO: Remove if possible
	export let fullDatabase: FullDatabase
	export let popupDatabase: PopupDatabase
	export let columns: ExtraColumn[] = []
	export let centered: boolean = false
	export let onClickToggle: ((id: string, t: boolean) => void) | null = null
	export let hideAmount: boolean = false
	$: gc = groupCards(entriesForwarded, groupings, sortings, fullDatabase)
</script>

<CardTable
	{toggleMap}
	{popupDatabase}
	{taboo}
	groupedCards={gc}
	{columns}
	{centered}
	{onClickToggle}
	totalLevels={groupings.length}
	{hideAmount}
/>
