<script context="module" lang="ts">
</script>

<script lang="ts">
	import type { CardClass } from '$lib/design/interface/card-class'

	import type { CardPackIcon } from '$lib/design/interface/card-pack'
	import CardBlockButton, { type CardBlockButtonProp } from './CardBlockButton.svelte'

	import CardSpan from './CardSpan.svelte'

	export let cardId: string
	export let amount: number | null = null
	export let showImageStrip: boolean = false
	export let text: string | null = null
	export let class1: CardClass | null = null
	export let class2: CardClass | null = null
	export let class3: CardClass | null = null
	export let xp: number | null = null
	export let xpTaboo: number | null = null
	export let exceptional: boolean = false
	export let packIcon: CardPackIcon | null = null
	export let packNumber: number | null = null
	export let restriction: boolean = false
	export let weakness: boolean = false
	export let dragDataPrefix: string = ''
	export let leftButtons: CardBlockButtonProp[] = []
	export let rightButtons: CardBlockButtonProp[] = []
	let hovering: boolean = false
	export let onChangeHovering: (h: boolean) => void = () => {
		// do nothing
	}
	export let onDropSwap: (fromIndex: number, fromRight: boolean, swapTo: string) => void = () => {
		// do nothing
	}

	function dragLeaveHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (e.dataTransfer !== null) {
			hovering = false
			onChangeHovering(false)
		}
	}

	function dragEnterHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (e.dataTransfer !== null) {
			hovering = true
			onChangeHovering(true)
		}
	}

	function dragStartHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (e.dataTransfer !== null) {
			e.dataTransfer.setData('text/plain', dragDataPrefix + cardId)
		}
	}

	function dragoverHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (e.dataTransfer !== null) {
			if (e.dataTransfer.types.length === 1 && e.dataTransfer.types[0] === 'text/plain') {
				// Apparently this allows dragging over the characters... lol
				hovering = true
				e.dataTransfer.dropEffect = 'move'
			} else {
				e.dataTransfer.dropEffect = 'none'
			}
		}
	}

	function dropHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (e.dataTransfer !== null) {
			hovering = false
			const receive = e.dataTransfer.getData('text/plain').split(',')
			onDropSwap(parseInt(receive[0], 10), receive[1] === 'right', receive[2])
		}
	}

	function dragendHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (e.dataTransfer !== null) {
			if (e.dataTransfer.dropEffect !== 'none') {
				// Do nothing, since swap at drop target will remove this one.
			}
		}
	}
</script>

<div class="card-block-div">
	{#each leftButtons as b}
		<CardBlockButton label={b.label} iconPath={b.iconPath} onClick={b.onClick} />
	{/each}
	<div
		on:dragleave={dragLeaveHandler}
		on:dragenter={dragEnterHandler}
		on:dragstart={dragStartHandler}
		on:dragover|preventDefault={dragoverHandler}
		on:drop|preventDefault={dropHandler}
		on:dragend|preventDefault={dragendHandler}
		draggable={true}
		class:hovering
		class="block"
	>
		<CardSpan
			{amount}
			{cardId}
			{showImageStrip}
			{text}
			{class1}
			{class2}
			{class3}
			{xp}
			{xpTaboo}
			{exceptional}
			{packIcon}
			{packNumber}
			{weakness}
			{restriction}
			color={true}
		/>
	</div>
	{#each rightButtons as b}
		<CardBlockButton label={b.label} iconPath={b.iconPath} onClick={b.onClick} />
	{/each}
</div>

<style>
	.card-block-div {
		display: flex;
		align-items: center;
	}

	.block {
		flex: 1;
		border: 1px solid rgba(0, 0, 0, 0.108);
		padding: 2px 10px;
		margin: 2px 2px;
		box-shadow: 1px 1px 0px 0px rgba(0, 0, 0, 0.035);
		display: flex;
		cursor: grab;
	}

	.hovering {
		background-color: rgba(255, 234, 0, 0.385);
	}
</style>
