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
	export let toggleMap: { [cardId: string]: boolean[] }
	export let fullDatabase: FullDatabase
	export let showLabel: boolean = false
	export let showOwner: boolean = false
	export let onClickToggle:
		| ((id: string, copy: number, maxCopy: number, t: boolean) => void)
		| null = null
	$: gc = groupCards(entries, groupings, sortings, fullDatabase)
	$: linear = flattenGroupedCards(gc)
	$: getToggled = (en: DecklistEntry, i: number): boolean[] => {
		if (!(en.id in toggleMap)) {
			return new Array(en.amount).fill(false)
		}
		const tg = toggleMap[en.id]
		return [tg[i]]
	}
</script>

<div class="card-scan-flex">
	{#each linear as en}
		{#each new Array(en.amount) as _, i}
			<CardScan
				{small}
				cardId={en.cardId}
				amount={1}
				unlink={i !== en.amount - 1}
				{fullDatabase}
				toggled={getToggled(en, i)}
				labels={showLabel ? en.labels?.map((x) => x.text) ?? null : null}
				onToggleChanged={onClickToggle === null
					? undefined
					: (c, maxCopy, t) => {
							if (onClickToggle) {
								onClickToggle(en.id, i, en.amount, t)
							}
					  }}
			/>
		{/each}
	{/each}
</div>

<style>
	.card-scan-flex {
		display: flex;
		flex-wrap: wrap;
	}

	@media only screen and (max-width: 1000px) {
		.card-scan-flex {
			margin-top: 8px;
			display: flex;
			justify-content: center;
		}
	}
</style>
