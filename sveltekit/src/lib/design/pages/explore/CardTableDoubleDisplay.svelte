<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import type { Grouping, Sorting } from '$lib/deck-table/grouping'
	import CardLaid from '$lib/design/components/deck-table/CardLaid.svelte'
	import CardTableGrouped from '$lib/design/components/deck-table/CardTableGrouped.svelte'

	export let entries: DecklistEntry[]
	export let singleRight: boolean = false
	$: singleEntries = entries.map<DecklistEntry>((x) => {
		return {
			amount: 1,
			cardId: x.cardId,
			id: x.id,
			labels: x.labels,
		}
	})
	export let groupings: Grouping[]
	export let sortings: Sorting[]
	export let toggleMap: { [cardId: string]: boolean }
	export let taboo: boolean
	export let fullDatabase: FullDatabase
	export let onClickToggle: ((id: string, t: boolean) => void) | null = null

	export let showList: boolean
	export let showScans: boolean
	export let small: boolean = false
</script>

<div class="flex-lr">
	{#if showList}
		<div class="list-flex">
			<CardTableGrouped
				{toggleMap}
				{entries}
				{groupings}
				{sortings}
				{taboo}
				{fullDatabase}
				{onClickToggle}
			/>
		</div>
	{/if}
	{#if showScans}
		<div class="scans-flex">
			<CardLaid
				{toggleMap}
				{groupings}
				{sortings}
				entries={singleRight ? singleEntries : entries}
				{fullDatabase}
				{onClickToggle}
				scansMode={{ small: small }}
			/>
		</div>
	{/if}
</div>

<style>
	.flex-lr {
		display: flex;
	}

	.list-flex {
		flex-basis: 330px;
	}

	.scans-flex {
		flex: 3;
	}
</style>
