import {
	ahdbToOurs,
	type ArkhamStarterDeckData,
	type GetDeckCardIdReturns,
} from '$lib/ahdb/public-api/high-level'
import { FullDatabase, fetchFullDatabaseV2 } from '$lib/core/full-database'
import { PopupDatabase, fetchPopupDatabaseV2 } from '$lib/core/popup-database'
import type { PageLoad } from './$types'
import decksJson from '$lib/data/decks.json'
import type { DeckEntryBeforeProcess } from '$lib/deck/deck'

interface Ret {
	fdb: FullDatabase
	pdb: PopupDatabase
	deck: GetDeckCardIdReturns
	ahst: ArkhamStarterDeckData
}

export const load: PageLoad<Ret> = async (pl) => {
	const id = pl.params.id
	const rawDecks = decksJson as unknown as DeckEntryBeforeProcess[]
	const deck = rawDecks.find((x) => x.raw.id === id)
	if (deck === undefined) {
		throw new Error('Unexpected error: deck not found.')
	}
	const fdb = await fetchFullDatabaseV2(pl.fetch)
	const pdb = await fetchPopupDatabaseV2(pl.fetch)
	return {
		pdb: pdb,
		fdb: fdb,
		deck: ahdbToOurs(deck.deck, true),
		ahst: {
			rename: deck.modifiedDeckName,
			excerpt: deck.raw.excerpt,
			authorId: deck.raw.arkhamdbUserId,
			authorName: deck.raw.user,
			authorUsername: deck.raw.userUrl,
			series: deck.raw.series,
		},
	}
}

export const entries = async () => {
	const rawDecks = decksJson as unknown as DeckEntryBeforeProcess[]
	return rawDecks.map((x) => {
		return { id: x.raw.id }
	})
}
