<script lang="ts">
	import { CardClass } from '$lib/core/card-class'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { DecklistLabel } from '$lib/deck-table/decklist-entry'

	import CardSpan from '../card/CardSpan.svelte'

	export let label: DecklistLabel
	export let popupDatabase: PopupDatabase
	let cardClass: CardClass = CardClass.Neutral
	$: {
		if (label.cardId !== undefined) {
			cardClass = popupDatabase.getByIdThrowNull(label.cardId).class1
		}
	}
	let labelColorClass = ''
	let labelStyle = ''
	$: {
		if (label.color !== undefined) {
			if (label.color.indexOf('#') === -1) {
				labelColorClass = ' ' + label.color
				labelStyle = ''
			} else {
				labelColorClass = ''
				labelStyle = 'background-color:' + label.color
			}
		}
	}
</script>

<div class="flex">
	{#if label.cardId !== undefined}
		<CardSpan cardId={label.cardId} showImageStrip class1={cardClass} />
	{/if}
	{#if label.text !== undefined}
		<span class={'labelz' + labelColorClass} style={labelStyle}>{label.text}</span>
	{/if}
</div>

<style>
	.flex {
		display: flex;
		align-items: center;
	}

	.labelz {
		font-size: x-small;
		padding: 1px 4px;
		border-radius: 2px;
		white-space: nowrap;
		margin: 1px 4px;
		display: flex;
	}

	.skill-flex {
		display: flex;
	}
</style>
