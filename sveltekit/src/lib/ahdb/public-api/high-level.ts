import type { CardList } from '../deck'
import { publicDeckPersonal, publicDeckPublished } from './call'

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
	deck: string
	cards1: string[]
	cards2: string[]
	cards3: string[]
	amounts1: number[]
	amounts2: number[]
	amounts3: number[]
}

export async function getDeckCardIds(
	deck: string,
	published: boolean,
): Promise<GetDeckCardIdReturns | null> {
	function cardListToArray(cl: CardList): string[] {
		if (cl === null) {
			return []
		}
		return Object.keys(cl)
	}
	function cardListToAmounts(cl: CardList): number[] {
		if (cl === null) {
			return []
		}
		return Object.values(cl)
	}

	const d = published ? await publicDeckPublished(deck) : await publicDeckPersonal(deck)
	if (d === null) {
		return null
	}
	return {
		deck: d.name,
		cards1: cardListToArray(d.slots),
		cards2: cardListToArray(d.sideSlots),
		cards3: cardListToArray(d.ignoreDeckLimitSlots),
		amounts1: cardListToAmounts(d.slots),
		amounts2: cardListToAmounts(d.sideSlots),
		amounts3: cardListToAmounts(d.ignoreDeckLimitSlots),
	}
}
