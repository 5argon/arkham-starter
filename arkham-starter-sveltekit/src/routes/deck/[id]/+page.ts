import {
  ahdbToOurs,
  type ArkhamStarterDeckData,
  DeckSource,
  type FetchDeckResult,
} from '$lib/ahdb/public-api/high-level'
import { fetchFullDatabaseStatic, FullDatabase } from '$lib/core/full-database'
import { fetchPopupDatabaseStatic, PopupDatabase } from '$lib/core/popup-database'
import decksJson from '$lib/data/decks.json'
import { type DeckEntryBeforeProcess, decodeSideExtras } from '$lib/deck/deck'

import type { EntryGenerator, PageLoad } from './$types'

interface Ret {
  fdb: FullDatabase
  pdb: PopupDatabase
  deck: FetchDeckResult
  ahst: ArkhamStarterDeckData
}

export const load: PageLoad<Ret> = async (pl) => {
  const id = pl.params.id
  const rawDecks = decksJson as unknown as DeckEntryBeforeProcess[]
  const deck = rawDecks.find((x) => x.raw.id === id)
  if (deck === undefined) {
    throw new Error('Unexpected error: deck not found.')
  }
  const fdb = await fetchFullDatabaseStatic()
  const pdb = await fetchPopupDatabaseStatic()
  return {
    pdb: pdb,
    fdb: fdb,
    deck: ahdbToOurs(deck.deck, DeckSource.ArkhamStarter),
    ahst: {
      rename: deck.modifiedDeckName,
      excerpt: deck.raw.excerpt,
      authorId: deck.raw.arkhamdbUserId,
      authorName: deck.raw.user,
      authorUsername: deck.raw.userUrl,
      series: deck.raw.series,
      extraCards: decodeSideExtras(deck.raw.sideExtras),
    },
  }
}

export const entries: EntryGenerator = async () => {
  const rawDecks = decksJson as unknown as DeckEntryBeforeProcess[]
  return rawDecks.map((x) => {
    return { id: x.raw.id }
  })
}
