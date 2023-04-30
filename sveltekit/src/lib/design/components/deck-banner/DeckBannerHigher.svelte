<script lang="ts" context="module">
</script>

<script lang="ts">
	import { forwardDeckToRcore, type GetDeckCardIdReturns } from '$lib/ahdb/public-api/high-level'
	import { CardPack } from '$lib/core/card-pack'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import { addPackCount, countPacks } from '$lib/deck/deck-count'
	import { getRepresentativeCards } from '$lib/deck/get-representative-cards'
	import { CardPackIcon } from '$lib/design/interface/card-pack'
	import type { PackInfoSpanItem } from '../inline/PackInfoSpan.svelte'

	import DeckBanner from './DeckBanner.svelte'
	export let popupDatabase: PopupDatabase
	export let deck: GetDeckCardIdReturns
	let packInfoSpanItems: PackInfoSpanItem[]
	const rcoreDeck = forwardDeckToRcore(deck)
	const representativeCards = getRepresentativeCards(
		rcoreDeck.cards1.map((x) => x.cardId),
		rcoreDeck.cards2.map((x) => x.cardId),
		popupDatabase,
	)
	const a = countPacks(
		rcoreDeck.cards1,
		(c) => popupDatabase.getById(c)?.packIcon ?? CardPack.Unknown,
	)
	const b = countPacks(
		rcoreDeck.cards2,
		(c) => popupDatabase.getById(c)?.packIcon ?? CardPack.Unknown,
	)
	const c = countPacks(
		rcoreDeck.cards3,
		(c) => popupDatabase.getById(c)?.packIcon ?? CardPack.Unknown,
	)
	const packCount = addPackCount(addPackCount(a, b), c)
	packInfoSpanItems = Object.entries(packCount).map<PackInfoSpanItem>(([packString, count]) => {
		return {
			pack: parseInt(packString),
			count: count,
		}
	})

	const altFront = deck.decodedMeta.alternateFront
	const altBack = deck.decodedMeta.alternateBack
	const parFront: boolean =
		altFront !== undefined &&
		(popupDatabase.getById(altFront)?.packIcon === CardPackIcon.ParallelInvestigator ?? false)
	const parBack: boolean =
		altBack !== undefined &&
		(popupDatabase.getById(altBack)?.packIcon === CardPackIcon.ParallelInvestigator ?? false)
</script>

<DeckBanner
	popupDb={popupDatabase}
	link={deck.link}
	packs={packInfoSpanItems}
	deckName={deck.deck}
	investigatorCode={deck.investigatorCode}
	previewCards={representativeCards}
	parallelFront={parFront}
	parallelBack={parBack}
/>
