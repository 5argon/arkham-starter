<script lang="ts">
	import { CardClass, classToFontColorCss } from '$lib/design/interface/card-class'
	import type { CardPackIcon } from '$lib/design/interface/card-pack'
	import ClassIcon from '../inline/ClassIcon.svelte'
	import {
		TextIcon,
		textIconToFontCharacter,
		textIconFontClass,
	} from '$lib/design/interface/text-icon'
	import { makePips } from '$lib/design/interface/string-util'

	export let text: string
	export let amount: number | null = null
	export let color: boolean = false
	export let class1: CardClass | null = null
	export let class2: CardClass | null = null
	export let class3: CardClass | null = null
	export let xp: number | null = null
	export let xpTaboo: number | null = null
	export let exceptional: boolean = false
	export let packIcon: CardPackIcon | null = null
	export let packNumber: number | null = null

	let colorClass: string
	$: colorClass = classToFontColorCss(class1, class2, class3)
	const signatureCharacter = '✮'
	const tabooCharacter = '✎'
	let pips: string
	let tabooPips: string
	$: {
		if (xp !== null) {
			pips = makePips(xp)
		}
	}
	$: {
		if (xpTaboo !== null) {
			tabooPips = makePips(xpTaboo)
		}
	}
</script>

<!-- <span>{0}x {text}</span> -->
<span>
	{#if amount !== null}<span class="amount">{amount}x</span>{/if}
	{#if class1 !== null}<ClassIcon cardClass={class1} />{/if}{#if class2 !== null}<ClassIcon
			cardClass={class2}
		/>{/if}{#if class3 !== null}<ClassIcon cardClass={class3} />{/if}
	<span class={colorClass}>{text}</span>
	{#if xp !== null && xp > 0}<span>{pips}</span>{/if}
	{#if xpTaboo !== null && xpTaboo > 0}
		<span>{tabooPips}</span>
		<span title="Taboo" class={textIconFontClass}
			>{textIconToFontCharacter(TextIcon.TokenTablet)}</span
		>
	{/if}{#if exceptional}<span title="Exceptional" class={textIconFontClass}
			>{textIconToFontCharacter(TextIcon.TokenElderSign)}</span
		>{/if}
</span>

<style>
	.amount {
		font-family: 'Bolton';
	}
</style>
