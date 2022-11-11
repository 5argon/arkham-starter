<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'

	import { isEntry, type GroupedCards } from '$lib/deck-table/decklist-entry'
	import type { ExtraColumn } from '$lib/deck-table/grouping'
	import CardCell from './CardCell.svelte'
	import CardGroup from './CardGroup.svelte'
	import CardScan from './CardScan.svelte'
	import ColumnCell from './ColumnCell.svelte'
	export let taboo: boolean
	export let level: number
	export let totalLevels: number
	export let theOnlyGroup: boolean
	export let groupedCards: GroupedCards
	export let previousGroupedCards: GroupedCards[]
	export let fullDatabase: FullDatabase | null
	export let columns: ExtraColumn[] = []
	export let toggleMap: { [id: string]: boolean }
	export let onClickToggle: ((id: string, t: boolean) => void) | null = null
	export let hideAmount: boolean = false
	export let scansMode: boolean = false
	$: spanning = columns.length + 1
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
		{#if scansMode && fullDatabase !== null}
			<CardScan cardId={en.cardId} {fullDatabase} />
		{:else}
			<tr>
				<td class={index % 2 === 0 ? 'even' : 'odd'}>
					<CardCell
						onToggleChanged={onClickToggle === null
							? undefined
							: (t) => {
									// It is surely entry at this point but Svelte
									// is not powerful enough to carry the type narrowing to here.
									if (onClickToggle !== null && isEntry(en)) {
										onClickToggle(en.id, t)
									}
							  }}
						toggled={en.id in toggleMap ? toggleMap[en.id] : false}
						cardId={en.cardId}
						{fullDatabase}
						amount={hideAmount ? null : en.amount}
						{taboo}
					/>
				</td>
				{#each columns as c}
					<td>
						<ColumnCell column={c} {taboo} cardId={en.cardId} label={en.label} {fullDatabase} />
					</td>
				{/each}
			</tr>
		{/if}
	{:else}
		<!-- theOnlyGroup in effect for only the topmost level. This is surely deeper level grouping. -->
		<svelte:self
			level={level + 1}
			groupedCards={en}
			previousGroupedCards={[...previousGroupedCards, groupedCards]}
			{toggleMap}
			{totalLevels}
			{fullDatabase}
			{columns}
			{taboo}
			{hideAmount}
			{onClickToggle}
			theOnlyGroup={false}
			{scansMode}
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
