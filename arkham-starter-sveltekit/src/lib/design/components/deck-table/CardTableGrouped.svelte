<script lang="ts">
	import type { CustomizableMeta } from '$lib/ahdb/public-api/high-level'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import type { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
	import { groupCards } from '$lib/deck-table/grouping/group-cards'
	import type { Localization } from '$lib/design/interface/localization'

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
	export let toggleMap: { [cardId: string]: boolean[] }
	export let taboo: boolean
	export let localization: Localization = 'en'
	// TODO: Remove if possible
	export let fullDatabase: FullDatabase
	export let popupDatabase: PopupDatabase
	export let columns: ExtraColumn[] = []
	export let centered: boolean = false
	export let onClickToggle: ((id: string, copy: number, t: boolean) => void) | null = null
	export let hideAmount: boolean = false
	export let customizableMetas: CustomizableMeta[] = []
	$: gc = groupCards(entriesForwarded, groupings, sortings, fullDatabase)
</script>

<CardTable
	{toggleMap}
	{popupDatabase}
	{taboo}
	{localization}
	groupedCards={gc}
	{columns}
	{centered}
	{onClickToggle}
	totalLevels={groupings.length}
	{hideAmount}
	{customizableMetas}
/>
