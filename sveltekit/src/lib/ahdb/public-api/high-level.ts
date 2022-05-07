import type { CardList } from '../deck'
import { publicDeck } from './call'

export function extractDeckFromUrl(url: string): string {
	const urlRegex = new RegExp(/view\/([^\/]*)/gm)
	const matchResult = urlRegex.exec(url)
	if (matchResult !== null) {
		return matchResult[1]
	} else {
		// If no match, assume the input is already deck code, hopefully.
		return url
	}
}

export interface GetDeckCardIdReturns {
	deck: string
	cards1: string[]
	cards2: string[]
	cards3: string[]
}

export async function getDeckCardIds(deck: string): Promise<GetDeckCardIdReturns | null> {
	function cardListToArray(cl: CardList): string[] {
		if (cl === null) {
			return []
		}
		return Object.keys(cl)
	}
	const d = await publicDeck(deck)
	if (d === null) {
		return null
	}
	return {
		deck: d.name,
		cards1: cardListToArray(d.slots),
		cards2: cardListToArray(d.sideSlots),
		cards3: cardListToArray(d.ignoreDeckLimitSlots),
	}
}
