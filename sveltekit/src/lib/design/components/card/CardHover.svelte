<script lang="ts">
	import type { CardClass } from '$lib/core/card-class'
	import type { CardPackIcon } from '$lib/design/interface/card-pack'
	import CardSpan from './CardSpan.svelte'

	export let cardId: string
	export let text: string | null = null
	export let subText: string | null = null
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
</script>

<span class="frame">
	<CardSpan
		{cardId}
		{text}
		color
		{xp}
		{xpTaboo}
		{exceptional}
		{subText}
		{weakness}
		{restriction}
		amount={null}
		showImageStrip={false}
		{class1}
		{class2}
		{class3}
		{packIcon}
		{packNumber}
	/>
</span>

<style>
	.frame {
		border: 1px solid black;
		padding: 2px 8px;
		user-select: none;
		box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.13);
		background-color: rgba(255, 255, 255, 0.95);
	}
</style>
