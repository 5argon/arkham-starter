<script lang="ts">
	import {
		type ArkhamStarterDeckData,
		type CustomizableMeta,
		DeckSource,
		type FetchDeckResult,
		forwardDeckToRcore,
	} from '$lib/ahdb/public-api/high-level'
	import { CardPack } from '$lib/core/card-pack'
	import { CommitIcon } from '$lib/core/commit-icon'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import { addPackCount, countPacks } from '$lib/deck/deck-count'
	import { calculateCardsXp } from '$lib/deck/deck-xp'
	import { getRepresentativeCards } from '$lib/deck/get-representative-cards'
	import type {
		ChosenClasses,
		ChosenNumber,
		ChosenSkills,
		ChosenTraits,
	} from '$lib/design/interface/deck-banner'

	import type { PackInfoSpanItem } from '../inline/PackInfoSpan.svelte'
	import DeckBanner from './DeckBanner.svelte'

	export let popupDatabase: PopupDatabase
	export let deck: FetchDeckResult
	export let ahst: ArkhamStarterDeckData | null = null
	export let linkToInternalViewer: boolean = false
	export let taboo: boolean = true
	export let compact: boolean = false
	export let showSource: boolean = false
	export let customizableMetas: CustomizableMeta[] = []
	export let onNextDeck: (() => void) | null = null
	let packInfoSpanItems: PackInfoSpanItem[]
	const rcoreDeck = forwardDeckToRcore(deck)
	const mainDeckXp = calculateCardsXp(rcoreDeck.cards1, popupDatabase, taboo, customizableMetas)
	const representativeCards = getRepresentativeCards(
		rcoreDeck.cards1.map((x) => x.cardId),
		rcoreDeck.cards2.map((x) => x.cardId).filter((x) => !ahst?.extraCards.includes(x) ?? true),
		popupDatabase,
		customizableMetas,
	)
	const a = countPacks(
		rcoreDeck.cards1,
		(c) => popupDatabase.getById(c)?.packIcon ?? CardPack.Unknown,
	)
	const b = countPacks(
		rcoreDeck.cards2.filter((x) => !ahst?.extraCards.includes(x.cardId) ?? true),
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
		(popupDatabase.getById(altFront)?.packIcon === CardPack.ParallelInvestigator ?? false)
	const parBack: boolean =
		altBack !== undefined &&
		(popupDatabase.getById(altBack)?.packIcon === CardPack.ParallelInvestigator ?? false)

	let chosenClasses: ChosenClasses | null = null
	$: {
		if (deck.decodedMeta.factionSelected !== undefined) {
			chosenClasses = {
				title: 'Secondary Class',
				classes: [deck.decodedMeta.factionSelected],
			}
		} else if (deck.decodedMeta.faction1 !== undefined && deck.decodedMeta.faction2 !== undefined) {
			chosenClasses = {
				title: 'Class Choices',
				classes: [deck.decodedMeta.faction1, deck.decodedMeta.faction2],
			}
		} else {
			chosenClasses = null
		}
	}

	let chosenTraits: ChosenTraits | null = null
	$: {
		if (deck.decodedMeta.optionSelected === 'both') {
			chosenTraits = { title: 'Trait Choice', traits: ['Blessed', 'Cursed'] }
		} else if (deck.decodedMeta.optionSelected === 'blessed') {
			chosenTraits = { title: 'Trait Choice', traits: ['Blessed'] }
		} else if (deck.decodedMeta.optionSelected === 'cursed') {
			chosenTraits = { title: 'Trait Choice', traits: ['Cursed'] }
		} else {
			chosenTraits = null
		}
	}

	let chosenSkills: ChosenSkills | null = null
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
		} else {
			chosenNumber = null
		}
	}
	let chosenNumber: ChosenNumber | null = null
	$: {
		if (deck.decodedMeta.deckSizeSelected !== undefined) {
			chosenNumber = {
				title: 'Deck Size',
				number: deck.decodedMeta.deckSizeSelected,
			}
		} else {
			chosenNumber = null
		}
	}

	let link: string | null
	$: {
		if (linkToInternalViewer) {
			// Construct the right in-site URL for the kind of deck
			switch (deck.source) {
				case DeckSource.ArkhamStarter: {
					link = '/deck/' + deck.id
					break
				}
				case DeckSource.ArkhamDbPublished:
					link = '/decklist/view?id=' + deck.id
					break
				case DeckSource.ArkhamBuildShared:
				case DeckSource.ArkhamDbPublic:
					link = '/deck/view?id=' + deck.id
					break
				default:
					throw new Error('Unknown deck source')
			}
		} else {
			if (deck.source === DeckSource.ArkhamStarter) {
				link = null
			} else {
				link = deck.link
			}
		}
	}
</script>

<DeckBanner
	popupDb={popupDatabase}
	{link}
	openInNewTab={true}
	packs={packInfoSpanItems}
	deckName={ahst?.rename ?? deck.deck}
	investigatorCode={deck.investigatorCode}
	xpCosted={mainDeckXp}
	xp={deck.xp}
	xpSpent={deck.xpSpent}
	xpAdjustment={deck.xpAdjustment}
	previewCards={representativeCards}
	parallelFront={parFront}
	parallelBack={parBack}
	{compact}
	deckSource={showSource ? deck.source : null}
	{chosenClasses}
	{chosenTraits}
	{chosenSkills}
	{chosenNumber}
	excerpt={ahst?.excerpt}
	authorName={ahst?.authorName}
	authorUrl={ahst !== null
		? `https://arkhamdb.com/user/profile/${ahst.authorId}/${ahst.authorUsername}`
		: undefined}
	seriesName={ahst?.series}
	onNextDeck={deck.nextDeck !== null ? onNextDeck : null}
/>
