<script lang="ts">
	import type { CustomizableMeta } from '$lib/ahdb/public-api/high-level'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { GroupedCards } from '$lib/deck-table/decklist-entry'
	import { type ExtraColumn, extraColumnToHeader } from '$lib/deck-table/grouping'
	import type { Localization } from '$lib/design/interface/localization'

	import RenderGroupedCards from './RenderGroupedCards.svelte'

	export let groupedCards: GroupedCards[]
	export let toggleMap: { [cardId: string]: boolean[] }
	export let localization: Localization = 'en'
	export let taboo: boolean
	export let totalLevels: number
	export let popupDatabase: PopupDatabase
	export let columns: ExtraColumn[] = []
	export let centered: boolean = false
	export let hideAmount: boolean = false
	export let customizableMetas: CustomizableMeta[] = []
	export let onClickToggle: ((id: string, copy: number, t: boolean) => void) | null = null
</script>

<table class:centered>
	{#if columns.length > 0}
		<thead>
			<tr>
				<!-- This is for the card, which has no header. -->
				<th />
				{#each columns as c}
					<th>
						{extraColumnToHeader(c)}
					</th>
				{/each}
			</tr>
		</thead>
	{/if}
	<tbody>
		{#each groupedCards as gc}
			<RenderGroupedCards
				groupedCards={gc}
				{localization}
				{toggleMap}
				level={0}
				previousGroupedCards={[]}
				{totalLevels}
				{columns}
				{taboo}
				theOnlyGroup={groupedCards.length === 1}
				{hideAmount}
				{onClickToggle}
				{popupDatabase}
				{customizableMetas}
			/>
		{/each}
	</tbody>
</table>

<style>
	.centered {
		margin: 0 auto;
	}
</style>
