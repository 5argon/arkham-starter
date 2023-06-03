<script lang="ts">
	import type { DecklistLabel } from '$lib/deck-table/decklist-entry'

	export let label: DecklistLabel
</script>

<span
	class={'label' + (label.color.indexOf('#') === -1 ? ' ' + label.color : '')}
	style={label.color.indexOf('#') === 0 ? 'background-color:' + label.color : null}
	>{label.text}</span
>

<style>
	.label {
		font-size: x-small;
		padding: 1px 4px;
		border-radius: 2px;
		white-space: nowrap;
		margin: 0px 1px;
	}

	.skill-flex {
		display: flex;
	}
</style>
