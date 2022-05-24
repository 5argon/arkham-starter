<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import type { ExtraColumn, Grouping } from '$lib/deck-table/grouping'
	import { groupCards } from '$lib/deck-table/grouping/group-cards'
	import CardTable from './CardTable.svelte'

	export let entries: DecklistEntry[]
	export let groupings: Grouping[]
	export let taboo: boolean
	export let fullDatabase: FullDatabase
	export let columns: ExtraColumn[] = []
	$: gc = groupCards(entries, groupings, fullDatabase)
</script>

<CardTable {fullDatabase} {taboo} groupedCards={gc} {columns} />
