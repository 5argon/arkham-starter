<script lang="ts" context="module">
</script>

<script lang="ts">
	import { forwardDeckToRcore, type GetDeckCardIdReturns } from '$lib/ahdb/public-api/high-level'
	import { CardPack } from '$lib/core/card-pack'
	import { CommitIcon } from '$lib/core/commit-icon'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import { addPackCount, countPacks } from '$lib/deck/deck-count'
	import { getRepresentativeCards } from '$lib/deck/get-representative-cards'
	import { CardPackIcon } from '$lib/design/interface/card-pack'
	import type {
		ChosenClasses,
		ChosenNumber,
		ChosenSkills,
		ChosenTraits,
	} from '$lib/design/interface/deck-banner'
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
	let chosenClasses: ChosenClasses | undefined
	$: {
		if (deck.decodedMeta.factionSelected !== undefined) {
			chosenClasses = {
				title: 'Secondary Class',
				classes: [deck.decodedMeta.factionSelected],
			}
		}
		if (deck.decodedMeta.faction1 !== undefined && deck.decodedMeta.faction2 !== undefined) {
			chosenClasses = {
				title: 'Class Choices',
				classes: [deck.decodedMeta.faction1, deck.decodedMeta.faction2],
			}
		}
	}

	let chosenTraits: ChosenTraits | undefined
	$: {
		if (deck.decodedMeta.optionSelected === 'both') {
			chosenTraits = { title: 'Trait Choice', traits: ['Blessed', 'Cursed'] }
		}
		if (deck.decodedMeta.optionSelected === 'blessed') {
			chosenTraits = { title: 'Trait Choice', traits: ['Blessed'] }
		}
		if (deck.decodedMeta.optionSelected === 'cursed') {
			chosenTraits = { title: 'Trait Choice', traits: ['Cursed'] }
		}
	}

	let chosenSkills: ChosenSkills | undefined
	$: {
		const willDiscipline = '08011a'
		const intDiscipline = '08012a'
		const comDiscipline = '08013a'
		const agiDiscipline = '08014a'
		const isLily = deck.investigatorCode === '08010'
		if (isLily) {
			const foundWill =
				deck.cards1.find((x) => x.cardId === willDiscipline) ||
				deck.cards2.find((x) => x.cardId === willDiscipline)
			const foundInt =
				deck.cards1.find((x) => x.cardId === intDiscipline) ||
				deck.cards2.find((x) => x.cardId === intDiscipline)
			const foundCom =
				deck.cards1.find((x) => x.cardId === comDiscipline) ||
				deck.cards2.find((x) => x.cardId === comDiscipline)
			const foundAgi =
				deck.cards1.find((x) => x.cardId === agiDiscipline) ||
				deck.cards2.find((x) => x.cardId === agiDiscipline)
			const disciplines: CommitIcon[] = []
			if (foundWill) {
				disciplines.push(CommitIcon.Willpower)
			}
			if (foundInt) {
				disciplines.push(CommitIcon.Intellect)
			}

			if (foundCom) {
				disciplines.push(CommitIcon.Combat)
			}

			if (foundAgi) {
				disciplines.push(CommitIcon.Agility)
			}
			chosenSkills = {
				title: 'Discipline',
				skills: disciplines,
			}
		}
	}
	let chosenNumber: ChosenNumber | undefined
	$: {
		if (deck.decodedMeta.deckSizeSelected !== undefined) {
			chosenNumber = {
				title: 'Deck Size',
				number: deck.decodedMeta.deckSizeSelected,
			}
		}
	}
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
	{chosenClasses}
	{chosenTraits}
	{chosenSkills}
	{chosenNumber}
/>
