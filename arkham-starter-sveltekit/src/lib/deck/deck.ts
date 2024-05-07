import type { AhdbDeck } from '$lib/ahdb/deck'

import { type GetDeckCardIdReturns, getDeckCardIds } from '../ahdb/public-api/high-level'

export interface RawDeck {
	user: string
	userUrl: string
	arkhamdbUserId: string
	id: string
	renameRegex: string
	series: string
	seriesUrl: string
	upgrade: string
	upgradeBreakpoint1: string
	upgradeBreakpoint2: string
	sideExtras: string
	excerpt: string
}

export function decodeSideExtras(s: string): string[] {
	const r = s.replace(/[[\]]/g, '')
	return r.split(',').map((x) => x.trim())
}

export interface DeckEntry {
	modifiedDeckName: string
	deck: AhdbDeck
	raw: RawDeck
}

export interface DeckEntryBeforeProcess {
	modifiedDeckName: string
	deck: AhdbDeck
	raw: RawDeck
}

export async function processRawDeck(r: RawDeck): Promise<DeckEntry | null> {
	const deck = await getDeckCardIds(r.id, true)
	if (deck === null) {
		return null
	}
	return {
		raw: r,
		deck: deck,
		modifiedDeckName: deck.deck.replace(new RegExp(r.renameRegex), ''),
	}
}

export function getExtraName(investigator: string): string {
	switch (investigator) {
		case '90049': {
			return 'Spirit'
		}
		default: {
			return 'Extra'
		}
	}
}
