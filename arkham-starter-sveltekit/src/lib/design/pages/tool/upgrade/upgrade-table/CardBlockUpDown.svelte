<script lang="ts">
	import CardBlock from '$lib/design/components/card/CardBlock.svelte'
	import type { CardBlockButtonProp } from '$lib/design/components/card/CardBlockButton.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import type { CardClass } from '$lib/design/interface/card-class'
	import type { CardPack } from '$lib/design/interface/card-pack'

	export let singleMode: boolean = false
	export let cardId: string
	export let text: string
	export let subText: string | null = null
	export let onClickDelete: () => void = () => {
		// do nothing
	}
	export let onDropSwap: (fromIndex: number, fromRight: boolean, swapTo: string) => void = () => {
		// do nothing
	}
	export let onCustomizableCycle: () => void = () => {
		// do nothing
	}
	export let class1: CardClass | null = null
	export let class2: CardClass | null = null
	export let class3: CardClass | null = null
	export let xp: number | null = null
	export let xpTaboo: number | null = null
	export let exceptional: boolean = false
	export let packIcon: CardPack | null = null
	export let packNumber: number | null = null
	export let restriction: boolean = false
	export let specialist: boolean = false
	export let weakness: boolean = false
	export let customizable: boolean = false
	export let permanent: boolean = false
	export let bonded: boolean = false
	export let myraid: boolean = false
	export let checkedBoxes: number = 0
	export let index: number
	export let right: boolean
	export let disableHoverEffects: boolean = false

	let width: number
	let cardBlockButtons: CardBlockButtonProp[]
	const deleteButton: CardBlockButtonProp = {
		label: 'Delete',
		iconPath: allIcons.delete,
		onClick: () => {
			onClickDelete()
		},
	}
	const customizableButton: CardBlockButtonProp = {
		label: 'Select Customization',
		iconPath: allIcons.customizable,
		onClick: () => {
			onCustomizableCycle()
		},
	}
	$: {
		if (customizable && right) {
			cardBlockButtons = [deleteButton, customizableButton]
		} else {
			cardBlockButtons = [deleteButton]
		}
	}
</script>

<svelte:window bind:outerWidth={width} />

<div>
	<CardBlock
		showImageStrip={singleMode || width > 1300}
		{cardId}
		{text}
		{subText}
		{class1}
		{class2}
		{class3}
		{xp}
		{xpTaboo}
		{exceptional}
		{packIcon}
		{packNumber}
		{restriction}
		{specialist}
		{weakness}
		{onDropSwap}
		{disableHoverEffects}
		customizable={checkedBoxes > 0 ? false : customizable}
		{permanent}
		{bonded}
		{myraid}
		{checkedBoxes}
		dragDataPrefix={index + ',' + (right ? 'right' : 'left') + ','}
		leftButtons={[]}
		rightButtons={singleMode ? [] : cardBlockButtons}
	/>
</div>
