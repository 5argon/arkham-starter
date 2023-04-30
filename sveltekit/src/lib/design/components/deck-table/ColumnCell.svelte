<script lang="ts">
	import type { DecklistLabel } from '$lib/deck-table/decklist-entry'
	import { ExtraColumn } from '$lib/deck-table/grouping'

	export let cardId: string
	export let taboo: boolean
	export let labels: DecklistLabel[] | undefined
	export let column: ExtraColumn
</script>

{#if column === ExtraColumn.Label && labels !== undefined}
	{#each labels as label}
		<span
			class={'label' + (label.color.indexOf('#') === -1 ? ' ' + label.color : '')}
			style={label.color.indexOf('#') === 0 ? 'background-color:' + label.color : null}
			>{label.text}</span
		>
	{/each}
{/if}

<style>
	.label {
		font-size: x-small;
		padding: 1px 4px;
		border-radius: 2px;
		white-space: nowrap;
	}
</style>
