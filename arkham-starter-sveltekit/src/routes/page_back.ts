import { FullDatabase, fetchFullDatabaseStatic } from '$lib/core/full-database'
import { PopupDatabase, fetchPopupDatabaseStatic } from '$lib/core/popup-database'
import type { PageLoad } from './$types'
import decksJson from '$lib/data/decks.json'
import { ahdbToOurs } from '$lib/ahdb/public-api/high-level'
import type { DeckEntry, DeckEntryBeforeProcess } from '$lib/deck/deck'

interface Ret {
	fdb: FullDatabase
	pdb: PopupDatabase
	deckEntries: DeckEntry[]
}

export const load: PageLoad<Ret> = async (pl) => {
	const rawDecks = decksJson as unknown as DeckEntryBeforeProcess[]
	const ours = rawDecks.map<DeckEntry>((x) => {
		return {
			modifiedDeckName: x.modifiedDeckName,
			raw: x.raw,
			deck: ahdbToOurs(x.deck, true),
		}
	})

	const fdb = await fetchFullDatabaseStatic()
	const pdb = await fetchPopupDatabaseStatic()
	return {
		deckEntries: ours,
		pdb: pdb,
		fdb: fdb,
	}
}
