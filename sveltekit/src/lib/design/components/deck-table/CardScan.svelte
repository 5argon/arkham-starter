<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	export let cardId: string
	export let fullDatabase: FullDatabase
	$: card = fullDatabase.getCard(cardId)

	$: vertical = card.original.type_code !== 'investigator'

	function backCodeExtract(s: string): string {
		var filename = s.match(/([\w\d_-]*)\.?[^\\\/]*$/i)
		return filename?.[1] ?? ''
	}
</script>

<img
	class:vertical
	class:horizontal={!vertical}
	width={vertical ? 215 : 300}
	height={vertical ? 300 : 215}
	src={'/image/card/full/' + cardId + '.png'}
	alt={card.original.name}
	loading="lazy"
/>
{#if card.original.double_sided && card.original.backimagesrc !== undefined}
	<img
		class:vertical
		class:horizontal={!vertical}
		width={vertical ? 215 : 300}
		height={vertical ? 300 : 215}
		class={'alt-card'}
		src={'/image/card/full/' + backCodeExtract(card.original.backimagesrc) + '.png'}
		alt={card.original.name}
		loading="lazy"
	/>
{/if}
{#if card.original.linked_to_code !== undefined}
	<img
		class:vertical
		class:horizontal={!vertical}
		width={vertical ? 215 : 300}
		height={vertical ? 300 : 215}
		class={'alt-card'}
		src={'/image/card/full/' + card.original.linked_to_code + '.png'}
		alt={card.original.name}
		loading="lazy"
	/>
{/if}

<style>
	img {
		flex: 1;
		margin: 4px;
		border-radius: 12px;
	}
</style>
