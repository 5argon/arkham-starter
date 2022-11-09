<script lang="ts">
	import { isRandomBasicWeakness } from '$lib/ahdb/card'
	import { type FullDatabase, shouldShowSubname } from '$lib/core/full-database'
	import CardSpan from '../card/CardSpan.svelte'

	export let taboo: boolean
	export let cardId: string
	export let amount: number | null
	export let fullDatabase: FullDatabase
	export let toggled: boolean
	export let onToggleChanged: undefined | ((t: boolean) => void) = undefined

	function handler(e: MouseEvent & { currentTarget: HTMLElement }) {
		onToggleChanged?.(!toggled)
	}
	$: card = fullDatabase.getCard(cardId)
	$: rbw = isRandomBasicWeakness(cardId)
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class:toggle-div={onToggleChanged} class:toggle-div-on={toggled} on:click={handler}>
	<CardSpan
		{cardId}
		{amount}
		class1={card.class1}
		class2={card.class2 ?? null}
		class3={card.class3 ?? null}
		exceptional={taboo && card.tabooExceptional ? card.tabooExceptional : card.original.exceptional}
		color={true}
		packIcon={card.packIcon}
		packNumber={card.original.position}
		restriction={card.original.restrictions !== undefined}
		showImageStrip={true}
		text={card.original.name}
		subText={shouldShowSubname(card, fullDatabase) ? card.original.subname : null}
		weakness={card.original.subtype_code === 'weakness' ||
			card.original.subtype_code === 'basicweakness'}
		investigator={card.original.type_code === 'investigator'}
		xp={card.original.xp}
		xpTaboo={taboo ? card.tabooXp ?? null : null}
	/>
</div>

<style>
	.toggle-div {
		cursor: pointer;
		user-select: none;
	}

	.toggle-div-on {
		filter: grayscale() opacity(0.2);
	}
</style>
