<script lang="ts">
	import CardBlock from '$lib/design/components/card/CardBlock.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import type { CardClass } from '$lib/design/interface/card-class'
	import type { CardPackIcon } from '$lib/design/interface/card-pack'

	export let text: string
	export let onClickDelete: () => void = () => {
		// do nothing
	}
	export let onClickUp: () => void = () => {
		// do nothing
	}
	export let onClickDown: () => void = () => {
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
</script>

<CardBlock
	{text}
	{class1}
	{class2}
	{class3}
	{xp}
	{xpTaboo}
	{exceptional}
	{packIcon}
	{packNumber}
	leftButtons={[]}
	rightButtons={[
		{
			label: 'Move Up',
			iconPath: allIcons.arrowUp,
			onClick: () => {
				onClickUp()
			},
		},
		{
			label: 'Move Down',
			iconPath: allIcons.arrowDown,
			onClick: () => {
				onClickDown()
			},
		},
		{
			label: 'Delete',
			iconPath: allIcons.delete,
			onClick: () => {
				onClickDelete()
			},
		},
	]}
/>
