<script context="module" lang="ts">
</script>

<script lang="ts">
	import type { CardClass } from '$lib/design/interface/card-class'

	import type { CardPackIcon } from '$lib/design/interface/card-pack'
	import CardBlockButton, { type CardBlockButtonProp } from './CardBlockButton.svelte'

	import CardSpan from './CardSpan.svelte'

	export let text: string
	export let class1: CardClass | null = null
	export let class2: CardClass | null = null
	export let class3: CardClass | null = null
	export let xp: number | null = null
	export let xpTaboo: number | null = null
	export let exceptional: boolean = false
	export let packIcon: CardPackIcon | null = null
	export let packNumber: number | null = null
	export let leftButtons: CardBlockButtonProp[] = []
	export let rightButtons: CardBlockButtonProp[] = []
</script>

<div class="card-block-div">
	{#each leftButtons as b}
		<CardBlockButton label={b.label} iconPath={b.iconPath} onClick={b.onClick} />
	{/each}
	<span class="block">
		<CardSpan
			{text}
			{class1}
			{class2}
			{class3}
			{xp}
			{xpTaboo}
			{exceptional}
			{packIcon}
			{packNumber}
			color={true}
		/>
	</span>
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
		border: 1px solid black;
		padding: 2px 10px;
		margin: 4px 2px;
		box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.2);
	}
</style>
