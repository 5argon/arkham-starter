<script lang="ts">
	import type { CustomizableMeta } from '$lib/ahdb/public-api/high-level'
	import type { PopupDatabase } from '$lib/core/popup-database'

	import { isEntry, type GroupedCards, type DecklistEntry } from '$lib/deck-table/decklist-entry'
	import type { ExtraColumn } from '$lib/deck-table/grouping'
	import CardCell from './CardCell.svelte'
	import CardGroup from './CardGroup.svelte'
	import ColumnCell from './ColumnCell.svelte'
	export let taboo: boolean
	export let level: number
	export let totalLevels: number
	export let theOnlyGroup: boolean
	export let groupedCards: GroupedCards
	export let previousGroupedCards: GroupedCards[]
	export let popupDatabase: PopupDatabase
	export let columns: ExtraColumn[] = []
	export let toggleMap: { [id: string]: boolean[] }
	export let onClickToggle: ((id: string, copy: number, t: boolean) => void) | null = null
	export let hideAmount: boolean = false
	export let customizableMetas: CustomizableMeta[] = []
	$: spanning = columns.length + 1

	function getCellToggled(tm: { [id: string]: boolean[] }, en: DecklistEntry): boolean {
		if (!(en.id in tm)) {
			return false
		}
		const toggles = tm[en.id]
		const re =
			toggles.find((t) => {
				return t === false
			}) === undefined
				? true
				: false
		return re
	}
</script>

{#if groupedCards.groupName !== null && !theOnlyGroup}
	<CardGroup
		groupName={groupedCards.groupName}
		previousGroupNames={previousGroupedCards.map((x) => {
			return x.groupName
		})}
		{level}
		{spanning}
		{totalLevels}
	/>
{/if}

{#each groupedCards.entries as en, index}
	{#if isEntry(en)}
		<tr>
			<td class={index % 2 === 0 ? 'even' : 'odd'}>
				<CardCell
					onToggleChanged={onClickToggle === null
						? undefined
						: (copy, t) => {
								// It is surely entry at this point but Svelte
								// is not powerful enough to carry the type narrowing to here.
								if (onClickToggle !== null && isEntry(en)) {
									// Clicking on cell either toggles or untoggles all copies.
									onClickToggle(en.id, copy, t)
								}
							}}
					toggled={getCellToggled(toggleMap, en)}
					cardId={en.cardId}
					{popupDatabase}
					amount={hideAmount ? null : en.amount}
					{customizableMetas}
					{taboo}
				/>
			</td>
			{#each columns as c}
				<td class={index % 2 === 0 ? 'even' : 'odd'}>
					<ColumnCell {popupDatabase} column={c} cardId={en.cardId} labels={en.labels} />
				</td>
			{/each}
		</tr>
	{:else}
		<svelte:self
			{taboo}
			level={level + 1}
			{totalLevels}
			theOnlyGroup={false}
			groupedCards={en}
			previousGroupedCards={[...previousGroupedCards, groupedCards]}
			{popupDatabase}
			{columns}
			{toggleMap}
			{onClickToggle}
			{hideAmount}
			{customizableMetas}
		/>
	{/if}
{/each}

<style>
	.even {
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
	}

	.odd {
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
	}
</style>
