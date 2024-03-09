<script lang="ts">
	import type { CardClass } from '$lib/core/card-class'
	import type { CardPackIcon } from '$lib/design/interface/card-pack'

	import HoverFrame from '../inline/HoverFrame.svelte'
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
	export let investigator: boolean = false
	export let customizable: boolean = false
	export let permanent: boolean = false
	export let bonded: boolean = false
	export let myriad: boolean = false
</script>

<HoverFrame>
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
		{investigator}
		{customizable}
		{permanent}
		{bonded}
		{myriad}
	/>
</HoverFrame>
