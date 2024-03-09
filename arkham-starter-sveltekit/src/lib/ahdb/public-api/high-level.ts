import { type CardClass, classCodeToCardClass } from '$lib/core/card-class'

import { coreToRcore, rcoreToCore } from '../conversion'
import type { AhdbDeck, CardList } from '../deck'
import { publicDeckPersonal, publicDeckPublished } from './call'
import { realUrlDeck, realUrlDecklist } from './constants'

export interface ExtractResult {
	deck: string
	published: boolean
}
export function extractDeckFromUrl(url: string): ExtractResult {
	{
		const urlRegex = new RegExp(/decklist\/view\/([^\/]*)/gm)
		const matchResult = urlRegex.exec(url)
		if (matchResult !== null) {
			return { deck: matchResult[1], published: true }
		}
	}
	{
		const urlRegex = new RegExp(/decklist\/edit\/([^\/]*)/gm)
		const matchResult = urlRegex.exec(url)
		if (matchResult !== null) {
			return { deck: matchResult[1], published: true }
		}
	}
	{
		const urlRegex = new RegExp(/deck\/view\/([^\/]*)/gm)
		const matchResult = urlRegex.exec(url)
		if (matchResult !== null) {
			return { deck: matchResult[1], published: false }
		}
	}
	{
		const urlRegex = new RegExp(/edit\/([^\/]*)/gm)
		const matchResult = urlRegex.exec(url)
		if (matchResult !== null) {
			return { deck: matchResult[1], published: false }
		}
	}
	{
		const pRegex = new RegExp(/p:(\d+)$/gm)
		const matchResult = pRegex.exec(url)
		if (matchResult !== null) {
			return { deck: matchResult[1], published: true }
		}
	}

	// If no match, assume the input is already deck code, hopefully.
	return { deck: url, published: false }
}

export interface ArkhamStarterDeckData {
	authorName: string
	authorId: string
	authorUsername: string
	series: string
	rename: string
	excerpt: string
	extraCards: string[]
}

export interface GetDeckCardIdReturns {
	id: string
	published: boolean
	/**
	 * No way to know user in unpublished deck, it will be `null`.
	 */
	userId: number | null
	link: string
	deck: string
	investigatorCode: string
	cards1: CardAndAmount[]
	cards2: CardAndAmount[]
	cards3: CardAndAmount[]
	nextDeck: number | null
	previousDeck: number | null

	xp: number
	xpSpent: number
	xpAdjustment: number

	decodedMeta: DecodedMeta
}

export interface CardAndAmount {
	cardId: string
	amount: number
}

export function forwardDeckToRcore(d: GetDeckCardIdReturns): GetDeckCardIdReturns {
	function fw(cards: CardAndAmount[]): CardAndAmount[] {
		return cards.map<CardAndAmount>((x) => {
			return { cardId: coreToRcore(x.cardId), amount: x.amount }
		})
	}
	return {
		...d,
		investigatorCode: coreToRcore(d.investigatorCode),
		cards1: fw(d.cards1),
		cards2: fw(d.cards2),
		cards3: fw(d.cards3),
	}
}

export function forwardDeckToOldCore(d: GetDeckCardIdReturns): GetDeckCardIdReturns {
	function fw(cards: CardAndAmount[]): CardAndAmount[] {
		return cards.map<CardAndAmount>((x) => {
			return { cardId: rcoreToCore(x.cardId), amount: x.amount }
		})
	}
	return {
		...d,
		cards1: fw(d.cards1),
		cards2: fw(d.cards2),
		cards3: fw(d.cards3),
	}
}

export async function getDeckCardIds(
	deck: string,
	published: boolean,
): Promise<GetDeckCardIdReturns | null> {
	const d = published ? await publicDeckPublished(deck) : await publicDeckPersonal(deck)
	if (d === null) {
		return null
	}
	return ahdbToOurs(d, published)
}

export function ahdbToOurs(d: AhdbDeck, published: boolean): GetDeckCardIdReturns {
	const userId: number | null = d.user_id
	const link = published ? [...realUrlDecklist, d.id].join('/') : [...realUrlDeck, d.id].join('/')
	function cardListToArray(cl: CardList): CardAndAmount[] {
		if (cl === null) {
			return []
		}
		return Object.entries(cl).map<CardAndAmount>((x) => {
			return { cardId: x[0], amount: x[1] }
		})
	}

	return {
		id: d.id.toString(),
		published: published,
		userId: userId,
		link: link,
		deck: d.name,
		investigatorCode: d.investigator_code,
		cards1: cardListToArray(d.slots),
		cards2: cardListToArray(d.sideSlots),
		cards3: cardListToArray(d.ignoreDeckLimitSlots),
		nextDeck: d.next_deck,
		previousDeck: d.previous_deck,
		xp: d.xp ?? 0,
		xpAdjustment: d.xp_adjustment,
		xpSpent: d.xp_spent ?? 0,
		decodedMeta: metaDecode(d.meta),
	}
}

export interface DecodedMeta {
	alternateFront?: string
	alternateBack?: string
	customizableMetas?: CustomizableMeta[]
	factionSelected?: CardClass
	optionSelected?: string
	deckSizeSelected?: number
	extraDeck?: string[]
	faction1?: CardClass
	faction2?: CardClass
}

interface RawMeta extends CustMeta {
	alternate_front?: string
	alternate_back?: string

	/**
	 * Parallel Back Wendy Adams
	 */
	option_selected?: 'blessed' | 'cursed' | 'both'

	/**
	 * Mandy Thompson
	 */
	deck_size_selected?: 30 | 40 | 50

	/**
	 * For anyone with one faction choice.
	 */
	faction_selected?: 'guardian' | 'seeker' | 'rogue' | 'mystic' | 'survivor'

	/**
	 * Charlie Kane
	 */
	faction_1?: 'guardian' | 'seeker' | 'rogue' | 'mystic' | 'survivor'

	/**
	 * Charlie Kane
	 */
	faction_2?: 'guardian' | 'seeker' | 'rogue' | 'mystic' | 'survivor'

	/**
	 * Parallel Back Jim Culver
	 */
	extra_deck?: ExtraDeckString
}

export interface CustMeta {
	/** Hunter's Armor */
	cus_09021?: CustMetaString
	/** Runic Axe */
	cus_09022?: CustMetaString
	/** Custom Modifications */
	cus_09023?: CustMetaString

	/** Alchemical Distillation */
	cus_09040?: CustMetaString
	/** Empirical Hypothesis */
	cus_09041?: CustMetaString
	/** The Raven Quill */
	cus_09042?: CustMetaString

	/** Damning Testimony */
	cus_09059?: CustMetaString
	/** Friends in Low Places */
	cus_09060?: CustMetaString
	/** Honed Instinct */
	cus_09061?: CustMetaString

	/** Living Ink */
	cus_09079?: CustMetaString
	/** Summoned Servitor */
	cus_09080?: CustMetaString
	/** Power Word */
	cus_09081?: CustMetaString

	/** Pocket Multi Tool */
	cus_09099?: CustMetaString
	/** Makeshift Trap */
	cus_09100?: CustMetaString
	/** Grizzled */
	cus_09101?: CustMetaString

	/** Hyperphysical Shotcaster */
	cus_09119?: CustMetaString
}

/**
 * Format: X,X,X,...
 * Each X: index|checked_boxes OR index|checked_boxes|details
 *
 * Each details :
 * - Card's ID
 * - Trait string
 * - willpower | intellect | combat | agility (Living Ink)
 * - Multiple of above, separated by ^
 */
type CustMetaString = string

/**
 * Format: X,X,X,...
 * Each X: Card's ID.
 */
type ExtraDeckString = string

export interface CustomizableMeta {
	card: string
	index: number
	checked: number
	detail: string
}

function metaDecode(meta: string): DecodedMeta {
	if (meta === '') {
		return {}
	}
	const json = JSON.parse(meta) as RawMeta
	const dm: DecodedMeta = {
		customizableMetas: [],
	}
	if (json.alternate_front && json.alternate_front !== '') {
		dm.alternateFront = json.alternate_front
	}
	if (json.alternate_back && json.alternate_back !== '') {
		dm.alternateBack = json.alternate_back
	}
	if (json.faction_selected) {
		dm.factionSelected = classCodeToCardClass(json.faction_selected)
	}
	if (json.faction_1) {
		dm.faction1 = classCodeToCardClass(json.faction_1)
	}
	if (json.faction_2) {
		dm.faction2 = classCodeToCardClass(json.faction_2)
	}
	if (json.option_selected) {
		dm.optionSelected = json.option_selected
	}
	if (json.deck_size_selected) {
		dm.deckSizeSelected = json.deck_size_selected
	}
	if (json.extra_deck) {
		dm.extraDeck = json.extra_deck.split(',')
	}
	const customizableMetas: CustomizableMeta[] = []
	Object.entries(json).forEach(([key, value]) => {
		if (key.startsWith('cus_') && typeof value === 'string') {
			const custCard = key.slice(4)
			const custSep = value.split(',')
			custSep.forEach((x) => {
				const custValue = x.split('|')
				if (custValue.length >= 2) {
					customizableMetas.push({
						card: custCard,
						index: parseInt(custValue[0]),
						checked: parseInt(custValue[1]),
						detail: custValue.length > 2 ? custValue[2] : '',
					})
				}
			})
		}
	})
	dm.customizableMetas = customizableMetas
	return dm
}
