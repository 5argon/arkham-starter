<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import CardSpan from '../card/CardSpan.svelte'

	export let taboo: boolean
	export let cardId: string
	export let amount: number
	export let fullDatabase: FullDatabase
	$: card = fullDatabase.getCard(cardId)
</script>

<CardSpan
	{cardId}
	{amount}
	class1={card.class1}
	class2={card.class2}
	class3={card.class3}
	exceptional={taboo && card.tabooExceptional ? card.tabooExceptional : card.original.exceptional}
	color={true}
	packIcon={card.packIcon}
	packNumber={card.original.position}
	restriction={card.original.restrictions !== undefined}
	showImageStrip={true}
	text={card.original.name}
	weakness={card.original.subtype_code === 'weakness'}
	xp={card.original.xp}
	xpTaboo={taboo ? card.tabooXp : undefined}
/>
