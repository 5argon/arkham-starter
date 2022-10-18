<script lang="ts">
	import CardBlock from '$lib/design/components/card/CardBlock.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import type { CardClass } from '$lib/design/interface/card-class'
	import type { CardPackIcon } from '$lib/design/interface/card-pack'

	export let singleMode: boolean = false
	export let cardId: string
	export let amount: number | null = null
	export let showImageStrip: boolean = false
	export let text: string | null = null
	export let subText: string | null = null
	export let collapse: boolean = false
	export let onClickDelete: () => void = () => {
		// do nothing
	}
	export let onClickLeft: () => void = () => {
		// do nothing
	}
	export let onClickRight: () => void = () => {
		// do nothing
	}
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
	export let customizable: boolean = false
</script>

<CardBlock
	{cardId}
	{amount}
	{showImageStrip}
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
	{weakness}
	{customizable}
	disableHoverEffects
	dragDataPrefix={'-1,staging,'}
	leftButtons={collapse
		? []
		: [
				{
					label: 'Delete',
					iconPath: allIcons.delete,
					onClick: () => {
						onClickDelete()
					},
				},
		  ]}
	rightButtons={singleMode
		? [
				{
					label: 'Add',
					iconPath: allIcons.arrowRightBordered,
					onClick: () => {
						onClickLeft()
					},
				},
		  ]
		: [
				{
					label: 'Add to left side',
					iconPath: allIcons.arrowLeftBordered,
					onClick: () => {
						onClickLeft()
					},
				},
				{
					label: 'Add to right side',
					iconPath: allIcons.arrowRightBordered,
					onClick: () => {
						onClickRight()
					},
				},
		  ]}
/>
