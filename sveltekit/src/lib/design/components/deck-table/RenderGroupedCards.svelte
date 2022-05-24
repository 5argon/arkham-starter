<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'

	import { isEntry, type GroupedCards } from '$lib/deck-table/decklist-entry'
	import type { ExtraColumn } from '$lib/deck-table/grouping'
	import CardCell from './CardCell.svelte'
	import CardGroup from './CardGroup.svelte'
	import ColumnCell from './ColumnCell.svelte'
	export let taboo: boolean
	export let level: number
	export let groupedCards: GroupedCards
	export let fullDatabase: FullDatabase
	export let columns: ExtraColumn[] = []
	$: spanning = columns.length + 1
</script>

{#if groupedCards.groupName !== null}
	<CardGroup groupName={groupedCards.groupName} {level} {spanning} />
{/if}
{#each groupedCards.entries as en, index}
	{#if isEntry(en)}
		<tr>
			<td class={index % 2 === 0 ? 'even' : 'odd'}>
				<CardCell cardId={en.cardId} {fullDatabase} amount={en.amount} {taboo} />
			</td>
			{#each columns as c}
				<td>
					<ColumnCell column={c} {taboo} cardId={en.cardId} label={en.label} {fullDatabase} />
				</td>
			{/each}
		</tr>
	{:else}
		<svelte:self level={level + 1} groupedCards={en} {fullDatabase} {columns} {taboo} />
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
