import { coreToRcore, rcoreToCore } from '../conversion'
import type { CardList } from '../deck'
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
	function cardListToArray(cl: CardList): CardAndAmount[] {
		if (cl === null) {
			return []
		}
		return Object.entries(cl).map<CardAndAmount>((x) => {
			return { cardId: x[0], amount: x[1] }
		})
	}

	const d = published ? await publicDeckPublished(deck) : await publicDeckPersonal(deck)
	if (d === null) {
		return null
	}
	const userId: number | null = d.user_id
	const link = published ? [...realUrlDecklist, deck].join('/') : [...realUrlDeck, deck].join('/')
	return {
		id: deck,
		published: published,
		userId: userId,
		link: link,
		deck: d.name,
		investigatorCode: d.investigator_code,
		cards1: cardListToArray(d.slots),
		cards2: cardListToArray(d.sideSlots),
		cards3: cardListToArray(d.ignoreDeckLimitSlots),
	}
}
