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
	faction1?: CardClass
	faction2?: CardClass
}

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
	const json = JSON.parse(meta)
	const dm: DecodedMeta = {
		customizableMetas: [],
	}
	if ('alternate_front' in json && json.alternate_front !== '') {
		dm.alternateFront = json.alternate_front
	}
	if ('alternate_back' in json && json.alternate_back !== '') {
		dm.alternateBack = json.alternate_back
	}
	if ('faction_selected' in json) {
		dm.factionSelected = classCodeToCardClass(json.faction_selected)
	}
	if ('faction_1' in json) {
		dm.faction1 = classCodeToCardClass(json.faction_1)
	}
	if ('faction_2' in json) {
		dm.faction2 = classCodeToCardClass(json.faction_2)
	}
	if ('option_selected' in json) {
		dm.optionSelected = json.option_selected
	}
	if ('deck_size_selected' in json) {
		dm.deckSizeSelected = json.deck_size_selected
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
