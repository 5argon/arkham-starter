<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import type { Grouping, Sorting } from '$lib/deck-table/grouping'
	import { flattenGroupedCards, groupCards } from '$lib/deck-table/grouping/group-cards'
	import type { Localization } from '$lib/design/interface/localization'

	import CardScan from './CardScan.svelte'

	export let entries: DecklistEntry[]
	export let groupings: Grouping[]
	export let sortings: Sorting[]
	export let toggleMap: { [cardId: string]: boolean[] }
	export let fullDatabase: FullDatabase
	export let popupDatabase: PopupDatabase
	export let small: boolean = false
	export let big: boolean = false
	export let showLabel: boolean = false
	export let showOwner: boolean = false
	export let localization: Localization = 'en'
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

	function getInvestigator(en: DecklistEntry): string | null {
		if (en.labels !== undefined && en.labels.length >= 1) {
			const firstLabel = en.labels[0]
			return firstLabel.cardId ?? null
		}
		return null
	}

	function getLabels(en: DecklistEntry): string[] | null {
		const labels = en.labels
		if (labels !== undefined) {
			return labels.filter((x) => x.text !== undefined).map((x) => x.text ?? '')
		}
		return null
	}
</script>

<div class="card-scan-flex">
	{#each linear as en}
		{#each Array(en.amount) as _, i}
			<CardScan
				{small}
				{big}
				cardId={en.cardId}
				amount={1}
				unlink={i !== en.amount - 1}
				{popupDatabase}
				{fullDatabase}
				toggled={getToggled(en, i)}
				investigatorStrip={getInvestigator(en)}
				labels={getLabels(en)}
				{localization}
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
