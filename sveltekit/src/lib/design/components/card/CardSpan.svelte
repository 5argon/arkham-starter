<script context="module" lang="ts">
	export interface CardSpanProp {
		text: string
		amount: number | null
		color: boolean
		class1: CardClass | null
		class2: CardClass | null
		class3: CardClass | null
		xp: number | null
		xpTaboo: number | null
		exceptional: boolean
		packIcon: CardPackIcon | null
		packNumber: number | null
	}
</script>

<script lang="ts">
	import { CardClass, classToFontColorCss } from '$lib/design/interface/card-class'
	import {
		CardPackIconColor,
		getPackStaticUrl,
		type CardPackIcon,
	} from '$lib/design/interface/card-pack'
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
	$: {
		if (color) {
			colorClass = classToFontColorCss(class1, class2, class3)
		} else {
			colorClass = ''
		}
	}
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
	let packStaticUrl: string
	$: {
		if (packIcon !== null) {
			packStaticUrl = getPackStaticUrl(packIcon, CardPackIconColor.Black)
		}
	}
</script>

<!-- <span>{0}x {text}</span> -->
<span class="outer-span">
	{#if amount !== null}<span class="amount">{amount}x</span>{/if}
	{#if class1 !== null}<ClassIcon cardClass={class1} />{/if}{#if class2 !== null}<ClassIcon
			cardClass={class2}
		/>{/if}{#if class3 !== null}<ClassIcon cardClass={class3} />{/if}
	<span class={colorClass + ' ' + 'card-name'}>{text}</span>
	{#if xp !== null && xp > 0}<span>{pips}</span>{/if}
	{#if xpTaboo !== null && xpTaboo > 0}
		<span class="taboo-pips">{tabooPips}</span>
		<span title="Taboo" class={textIconFontClass}
			>{textIconToFontCharacter(TextIcon.TokenTablet)}</span
		>
	{/if}{#if exceptional}<span title="Exceptional" class={textIconFontClass}
			>{textIconToFontCharacter(TextIcon.TokenElderSign)}</span
		>{/if}
	{#if packIcon !== null || packNumber !== null}
		<span class="pack-span"
			>({#if packIcon !== null}<img class="pack-icon" src={packStaticUrl} alt="Pack icon" />
			{/if}
			{#if packNumber !== null}<span>{packNumber}</span>{/if})</span
		>
	{/if}
</span>

<style>
	.outer-span {
		display: inline-flex;
		align-items: center;
		vertical-align: middle;
	}

	.amount {
		font-family: 'ArkhamNumber';
		margin-right: 3px;
	}

	.card-name {
		font-weight: normal;
		margin: 0px 4px;
	}

	.taboo-pips {
		margin-left: 4px;
	}

	.pack-span {
		display: inline-flex;
		align-items: center;
		font-family: 'SerifText';
		font-size: 0.8em;
		color: rgb(0.3, 0.3, 0.3);
		margin-left: 4px;
	}

	.pack-icon {
		width: 12px;
		margin-right:2px;
	}
</style>
