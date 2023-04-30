<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import type { Grouping, Sorting } from '$lib/deck-table/grouping'
	import { flattenGroupedCards, groupCards } from '$lib/deck-table/grouping/group-cards'
	import CardScan from './CardScan.svelte'

	export let entries: DecklistEntry[]
	export let groupings: Grouping[]
	export let sortings: Sorting[]
	export let small: boolean
	export let toggleMap: { [cardId: string]: boolean }
	export let fullDatabase: FullDatabase
	export let onClickToggle: ((id: string, t: boolean) => void) | null = null
	$: gc = groupCards(entries, groupings, sortings, fullDatabase)
	$: linear = flattenGroupedCards(gc)
</script>

<div class="card-scan-flex">
	{#each linear as en}
		<CardScan
			{small}
			cardId={en.cardId}
			amount={en.amount}
			{fullDatabase}
			toggled={en.id in toggleMap ? toggleMap[en.id] : false}
			onToggleChanged={onClickToggle === null
				? undefined
				: (t) => {
						if (onClickToggle) {
							onClickToggle(en.id, t)
						}
				  }}
		/>
	{/each}
</div>

<style>
	.card-scan-flex {
		display: flex;
		flex-wrap: wrap;
	}
</style>
