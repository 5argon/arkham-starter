<script lang="ts">
	import type { CustomizableMeta } from '$lib/ahdb/public-api/high-level'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import type { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
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
	export let columns: ExtraColumn[] = []
	export let toggleMap: { [cardId: string]: boolean }
	export let taboo: boolean
	export let fullDatabase: FullDatabase
	export let popupDatabase: PopupDatabase
	export let onClickToggle: ((id: string, t: boolean) => void) | null = null

	export let showList: boolean
	export let showScans: boolean
	export let small: boolean = false
	export let customizableMetas: CustomizableMeta[] = []
</script>

<div class="flex-lr">
	{#if showList}
		<div class="list-flex">
			<CardTableGrouped
				{toggleMap}
				{entries}
				{columns}
				{groupings}
				{sortings}
				{taboo}
				{fullDatabase}
				{popupDatabase}
				{onClickToggle}
				{customizableMetas}
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
				{small}
			/>
		</div>
	{/if}
</div>

<style>
	.flex-lr {
		display: flex;
	}

	.list-flex {
		flex-basis: 380px;
	}

	.scans-flex {
		flex: 3;
	}

	@media only screen and (max-width: 1000px) {
		.flex-lr {
			flex-direction: column;
		}

		.list-flex {
			margin: 0 auto;
		}
	}
</style>
