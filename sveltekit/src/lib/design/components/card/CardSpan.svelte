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
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import { isRandomBasicWeakness, isUnknownCardNumber } from '$lib/ahdb/card'
	import ImageStrip from './ImageStrip.svelte'

	export let cardId: string
	export let showImageStrip: boolean = false
	export let text: string | null = null
	export let subText: string | null = null
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
	export let restriction: boolean = false
	export let weakness: boolean = false

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

<span class="outer-span">
	{#if !isRandomBasicWeakness(cardId)}
		<ImageStrip name={text} {showImageStrip} {xp} {cardId} {class1} {class2} {class3} />
	{/if}

	{#if text !== null}
		{#if amount !== null}<span class="amount">{amount}</span><span class="amount-x">x</span>{/if}
		<span class="all-class-icons">
			{#if class1 !== null}<ClassIcon cardClass={class1} />{/if}{#if class2 !== null}<ClassIcon
					cardClass={class2}
				/>{/if}{#if class3 !== null}<ClassIcon cardClass={class3} />{/if}
		</span>
		<span class="card-name-container">
			<span class:card-name-long={text.length >= 25} class={colorClass + ' ' + 'card-name'}
				>{text}</span
			>{#if subText !== null}<span class={colorClass + ' ' + 'card-subname'}>{subText}</span>{/if}
			{#if weakness || isRandomBasicWeakness(cardId)}<span
					title="Weakness"
					class={'pips ' + textIconFontClass}>{textIconToFontCharacter(TextIcon.Weakness)}</span
				>{/if}{#if restriction}<FaIcon path={allIcons.investigatorRestriction} />{/if}
			{#if xp !== null && xp > 0}<span class="pips">{pips}</span>{/if}
			{#if xpTaboo !== null && xpTaboo > 0}
				<span class="pips taboo-pips">{tabooPips}</span>
				<span title="Taboo" class={'pips ' + textIconFontClass}
					>{textIconToFontCharacter(TextIcon.TokenTablet)}</span
				>
			{/if}{#if exceptional}<span title="Exceptional" class={'pips ' + textIconFontClass}
					>{textIconToFontCharacter(TextIcon.TokenElderSign)}</span
				>{/if}
			{#if !(packNumber !== null && isUnknownCardNumber(packNumber)) && (packIcon !== null || packNumber !== null)}
				<span class="pips pack-span"
					>({#if packIcon !== null}<img class="pack-icon" src={packStaticUrl} alt="Pack icon" />
					{/if}
					{#if packNumber !== null}<span>{packNumber}</span>{/if})</span
				>
			{/if}
		</span>
	{/if}
</span>

<style>
	.outer-span {
		display: inline-flex;
		align-items: center;
		vertical-align: middle;
	}

	.amount {
		width: 8px;
		user-select: none;
		font-family: 'ArkhamNumber';
		font-size: 0.9em;
	}

	.amount-x {
		user-select: none;
		width: 5px;
		margin-right: 2px;
		margin-top: 2px;
		font-family: 'ArkhamNumber';
		font-size: xx-small;
	}

	.card-name {
		font-weight: normal;
		font-size: small;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.card-name-long {
		font-size: 0.8em;
	}

	.card-name-container {
		display: inline-flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.card-subname {
		max-width: 42px;
		max-height: 18px;
		line-height: 1em;
		margin-left: 4px;
		font-size: xx-small;
		text-overflow: ellipsis;
	}

	.pips {
		user-select: none;
		margin-left: 2px;
	}

	.taboo-pips {
		margin-left: 4px;
	}

	.pack-span {
		display: inline-flex;
		align-items: center;
		font-family: 'SerifText';
		font-size: xx-small;
		color: rgba(1, 1, 1, 0.4);
		margin-top: 4px;
		margin-left: 4px;
	}

	.all-class-icons {
		height: 16px;
		margin-right: 4px;
		flex-shrink: 0;
	}

	.pack-icon {
		height: 10px;
		margin-right: 2px;
		margin-bottom: 3px;
		filter: opacity(0.4);
	}
</style>
