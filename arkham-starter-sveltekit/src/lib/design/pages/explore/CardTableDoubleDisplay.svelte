<script lang="ts">
	import type { CustomizableMeta } from '$lib/ahdb/public-api/high-level'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import type { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
	import CardLaid from '$lib/design/components/deck-table/CardLaid.svelte'
	import CardTableGrouped from '$lib/design/components/deck-table/CardTableGrouped.svelte'
		import type { Localization } from '$lib/design/interface/localization'

	export let entries: DecklistEntry[]
	export let singleRight: boolean = false
	export let localization: Localization = 'en'
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
	export let toggleMap: { [cardId: string]: boolean[] }
	export let taboo: boolean
	export let fullDatabase: FullDatabase
	export let popupDatabase: PopupDatabase
	export let onClickToggle: ((id: string, newToggles: boolean[]) => void) | null = null
	export let showLabelOnScans: boolean = false

	export let showList: boolean
	export let showScans: boolean
	export let small: boolean = false
	export let big: boolean = false
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
				{localization}
				onClickToggle={(id, copy, toggle) => {
					// Toggles all copies the same way.
					if (onClickToggle === null) return
					const toggles = new Array(copy).fill(toggle)
					onClickToggle(id, toggles)
				}}
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
				{popupDatabase}
				{big}
				{localization}
				entries={singleRight ? singleEntries : entries}
				showLabel={showLabelOnScans}
				{fullDatabase}
				onClickToggle={(id, copy, maxCopy, toggle) => {
					if (onClickToggle === null) return
					let toggles
					if (!(id in toggleMap)) {
						toggles = new Array(maxCopy).fill(false)
					} else {
						toggles = [...toggleMap[id]]
					}
					toggles[copy] = toggle
					onClickToggle(id, toggles)
				}}
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
		flex-basis: 400px;
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
			flex-basis: unset;
		}
	}
</style>
