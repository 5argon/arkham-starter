<script lang="ts">
	import type { CardClass } from '$lib/core/card-class'
	import type { PopupDatabase } from '$lib/core/popup-database'
import type { ChosenCards } from '$lib/design/interface/deck-banner'

	import CardSquareList from './CardSquareList.svelte'
	import DeckInsightItem from './DeckInsightItem.svelte'

	export let cardClass: CardClass
	export let chosenCards: ChosenCards
	export let popupDb: PopupDatabase
	let previewCards: string[] = chosenCards.cards
</script>

<DeckInsightItem {cardClass} title={chosenCards.title}>
	<CardSquareList {popupDb} {previewCards} />
</DeckInsightItem>
