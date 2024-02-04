<script lang="ts">
	import { CardClass, classToFontColorCss } from '$lib/design/interface/card-class'
	import {
		CardPackIconColor,
		getPackStaticUrl,
		CardPackIcon,
	} from '$lib/design/interface/card-pack'
	import ClassIcon from '../inline/ClassIcon.svelte'
	import { makePips } from '$lib/design/interface/string-util'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import { isRandomBasicWeakness, isUnknownCardNumber } from '$lib/ahdb/card'
	import ImageStrip from './ImageStrip.svelte'
	import CustomizableCheckBoxes from './CustomizableCheckBoxes.svelte'

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
	export let investigator: boolean = false
	export let customizable: boolean = false
	export let permanent: boolean = false
	export let bonded: boolean = false
	export let checkBoxes: number = 0
	export let checkedBoxes: number = 0
	export let forceSmall: boolean = false

	$: hasBoxes = checkBoxes > 0 || checkedBoxes > 0
	$: rbw = isRandomBasicWeakness(cardId)
	$: effectiveText = rbw ? 'Random Basic Weakness' : text

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
			tabooPips = '(' + (xpTaboo > 0 ? '+' : '') + xpTaboo.toString() + ')'
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
	<ImageStrip name={effectiveText} {showImageStrip} {xp} {cardId} {class1} {class2} {class3} />
	{#if effectiveText !== null}
		{#if amount !== null}<span
				class="amount"
				class:amount-minus={amount < 0}
				class:amount-two-digit={amount >= 10}>{amount}</span
			><span class="amount-x">x</span>{/if}
		{#if !hasBoxes}
			<span class="all-class-icons">
				{#if class1 !== null}<ClassIcon cardClass={class1} />{/if}{#if class2 !== null}<ClassIcon
						cardClass={class2}
					/>{/if}{#if class3 !== null}<ClassIcon cardClass={class3} />{/if}
			</span>
		{/if}
		<span class="card-name-container">
			<CustomizableCheckBoxes {checkBoxes} {checkedBoxes} />
			<span
				class:card-name-long={forceSmall || effectiveText.length >= 25}
				class={colorClass + ' ' + 'card-name'}>{effectiveText}</span
			>{#if subText !== null}<span class={colorClass + ' ' + 'card-subname'}>{subText}</span>{/if}
			{#if xp !== null && xp > 0}<span class="pips">{pips}</span
				>{/if}{#if xpTaboo !== null && xpTaboo !== 0}
				<span class="pips taboo-pips">{tabooPips}</span>
			{/if}{#if weakness || rbw}<FaIcon path={allIcons.anyWeakness} />{/if}{#if restriction}<FaIcon
					path={allIcons.investigatorRestriction}
				/>{/if}{#if investigator}<FaIcon
					path={allIcons.investigator}
				/>{/if}{#if customizable}<FaIcon path={allIcons.customizable} />{/if}{#if permanent}<FaIcon
					path={allIcons.permanent}
				/>{/if}{#if exceptional}<FaIcon path={allIcons.exceptional} />{/if}{#if bonded}<FaIcon
					path={allIcons.bonded}
				/>{/if}
			{#if !(packNumber !== null && isUnknownCardNumber(packNumber)) && (packIcon !== null || packNumber !== null)}
				<span class="pips pack-span"
					>({#if packIcon !== null && packIcon !== CardPackIcon.Unknown}<img
							class="pack-icon"
							src={packStaticUrl}
							alt="Pack icon"
						/>
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
		margin-left: 4px;
		user-select: none;
		font-family: 'ArkhamNumber';
		font-size: 0.9em;
	}

	/* Rarely deck has negative amount when upgrade bugged and removed a card that was not there. */
	.amount-minus {
		margin-right: 5px;
	}

	.amount-two-digit {
		margin-right: 6px;
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
		max-width: 65px;
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
		font-size: xx-small;
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
		margin-left: 2px;
		margin-right: 2px;
		flex-shrink: 0;
	}

	.pack-icon {
		height: 10px;
		margin-right: 2px;
		margin-bottom: 3px;
		filter: opacity(0.4);
	}
</style>
