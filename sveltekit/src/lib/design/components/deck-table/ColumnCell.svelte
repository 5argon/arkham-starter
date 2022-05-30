<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import type { DecklistLabel } from '$lib/deck-table/decklist-entry'
	import { ExtraColumn } from '$lib/deck-table/grouping'

	export let cardId: string
	export let taboo: boolean
	export let label: DecklistLabel | undefined
	export let fullDatabase: FullDatabase
	export let column: ExtraColumn
	$: card = fullDatabase.getCard(cardId)
</script>

{#if column === ExtraColumn.Label && label !== undefined}
	<span
		class={'label' + (label.color.indexOf('#') === -1 ? ' ' + label.color : '')}
		style={label.color.indexOf('#') === 0 ? 'background-color:' + label.color : null}
		>{label.text}</span
	>
{/if}

<style>
	.label {
		font-size: x-small;
		padding: 1px 4px;
		border-radius: 2px;
		white-space: nowrap;
	}
</style>
