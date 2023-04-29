<script lang="ts">
	import { isRandomBasicWeakness } from '$lib/ahdb/card'
	import type { FullDatabase } from '$lib/core/full-database'
	export let cardId: string
	export let small: boolean
	export let fullDatabase: FullDatabase
	export let toggled: boolean
	export let amount: number
	export let onToggleChanged: undefined | ((t: boolean) => void) = undefined
	const sizeMultiplier = small ? 0.45 : 1
	$: card = fullDatabase.getCard(cardId)
	$: vertical = card.original.type_code !== 'investigator'
	$: rbw = isRandomBasicWeakness(cardId)
	$: shiftDown = amount * 10

	$: width = (vertical ? 215 : 300) * sizeMultiplier
	$: height = (vertical ? 300 : 215) * sizeMultiplier

	function backCodeExtract(s: string): string {
		var filename = s.match(/([\w\d_-]*)\.?[^\\\/]*$/i)
		return filename?.[1] ?? ''
	}

	function handler(e: MouseEvent & { currentTarget: HTMLElement }) {
		onToggleChanged?.(!toggled)
	}
</script>

{#if amount > 1}
	<!-- <div class="behind"> -->
		<svelte:self {cardId} {small} {fullDatabase} {toggled} {onToggleChanged} amount={amount - 1} />
	<!-- </div> -->
{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span
	class:toggle-div={onToggleChanged}
	class:toggle-div-on={toggled}
	on:click={handler}
	style={'width:' + width + 'px;' + 'height:' + height + 'px;'}
>
	<img
		class:vertical
		class:horizontal={!vertical}
		{width}
		{height}
		class:normal-radius={!small}
		class:small-radius={small}
		src={'/image/card/full/' + cardId + '.png'}
		alt={card.original.name}
		loading="lazy"
		draggable="false"
	/>
	{#if card.original.double_sided && card.original.backimagesrc !== undefined}
		<img
			class:vertical
			class:horizontal={!vertical}
			{width}
			{height}
			class:normal-radius={!small}
			class:small-radius={small}
			class={'alt-card'}
			src={'/image/card/full/' + backCodeExtract(card.original.backimagesrc) + '.png'}
			alt={card.original.name}
			loading="lazy"
			draggable="false"
		/>
	{/if}
	{#if card.original.linked_to_code !== undefined}
		<img
			class:vertical
			class:horizontal={!vertical}
			{width}
			{height}
			class:normal-radius={!small}
			class:small-radius={small}
			class={'alt-card'}
			src={'/image/card/full/' + card.original.linked_to_code + '.png'}
			alt={card.original.name}
			loading="lazy"
			draggable="false"
		/>
	{/if}
</span>

<style>
	.behind {
		margin-top: -10px;
		display: inline-block;
		position: absolute;
	}

	span {
		flex: 1;
		margin: 4px;
		display: inline-block;
	}

	img {
		/* Both required to tame Alt text when the image is missing... */
		display: inline-block;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.195);
		user-select: none;
	}

	.normal-radius {
		border-radius: 12px;
	}

	.small-radius {
		border-radius: 6px;
	}

	.toggle-div {
		cursor: pointer;
		user-select: none;
	}

	.toggle-div-on {
		filter: grayscale() opacity(0.3);
	}
</style>
