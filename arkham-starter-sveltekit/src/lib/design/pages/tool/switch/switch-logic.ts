import { coreToRcore } from '$lib/ahdb/conversion'
import {
  type CardAndAmount,
  DeckSource,
  extractDeck,
  fetchDeckFromId,
  type FetchDeckResult,
} from '$lib/ahdb/public-api/high-level'
import { makeBondedDecklistEntries } from '$lib/core/bonded'
import { cardClassToBackgroundClass } from '$lib/core/card-class'
import type { FullDatabase, FullDatabaseItem } from '$lib/core/full-database'
import type { PopupDatabase } from '$lib/core/popup-database'
import type { DecklistEntry, DecklistLabel } from '$lib/deck-table/decklist-entry'

export interface BothDatabase {
  fdb: FullDatabase
  pdb: PopupDatabase
}

export interface Player {
  deckUrl: string
  deck: string
  fetchResult: FetchDeckResult | undefined
  nextDeck: string | undefined
  previousDeck: string | undefined
  source: DeckSource
  error: boolean
  investigator: FullDatabaseItem | null
}

export type PlayerOrNull = Player | null

export function doSide(bdb: BothDatabase, forwardRCore: boolean,
                       sr: (FetchDeckResult | null)[], rightSide: boolean): DecklistEntry[] {
  const activeAll = sr.flatMap<DecklistEntry>((x) => {
    if (x !== null) {
      const bondedEntries = makeBondedDecklistEntries(
        bdb.pdb,
        x.investigatorCode,
        x.cards1,
        x.cards2,
      )
      const allProcessed = [
        ...sideProcess(x.cards1, '', x.investigatorCode, rightSide),
        ...sideProcess(x.cards2, 'Side', x.investigatorCode, rightSide),
        ...sideProcess(bondedEntries.bondedToMain, 'Linked', x.investigatorCode, rightSide),
        ...sideProcess(bondedEntries.bondedToSide, 'Side-LK', x.investigatorCode, rightSide),
      ]
      return allProcessed
    }
    return []
  })
  return activeAll

  function sideProcess(
    sr: CardAndAmount[],
    additionalLabel: string,
    invCode: string,
    right: boolean,
  ): DecklistEntry[] {
    return sr.map<DecklistEntry>((x) => {
      const fdb = bdb.fdb
      const effectiveId = forwardRCore ? coreToRcore(x.cardId) : x.cardId
      const inv = fdb.getCard(invCode)
      const labels: DecklistLabel[] = [
        {
          cardId: inv.original.code,
          color: cardClassToBackgroundClass(inv.class1),
        },
      ]
      if (additionalLabel !== '') {
        labels.push({
          text: additionalLabel,
          color: cardClassToBackgroundClass(inv.class1),
        })
      }
      return {
        amount: x.amount,
        cardId: effectiveId,
        id: (right ? 'R' : 'L') + inv.original.code + effectiveId + additionalLabel,
        labels: labels,
      }
    })
  }
}

export function tempDis(pon: PlayerOrNull): PlayerOrNull {
  if (pon === null) {
    return null
  }
  return {
    ...pon,
    fetchResult: undefined,
    investigator: null,
    nextDeck: undefined,
    previousDeck: undefined,
    error: false,
  }
}

export async function oneSide(decks: PlayerOrNull[]) {
  const extracted = decks.map((x) => {
    if (x !== null) {
      return extractDeck(x?.deckUrl)
    } else {
      return null
    }
  })
  const awaitables = extracted.map<Promise<FetchDeckResult | null>>((x) => {
    if (x !== null && x.deck !== '') {
      return fetchDeckFromId(x.deck, x.source)
    }
    return Promise.resolve(null)
  })
  const awaited = await Promise.all(awaitables)
  return awaited
}

export function getPon(bdb: BothDatabase, aaa: FetchDeckResult | null): PlayerOrNull {
  if (aaa === null) {
    return null
  }
  const inv = bdb.fdb.getCard(aaa.investigatorCode)
  return {
    deck: aaa.deck,
    fetchResult: aaa,
    investigator: inv,
    nextDeck: aaa.nextDeck?.toString(),
    previousDeck: aaa.previousDeck?.toString(),
    error: false,
    source: aaa.source,
    deckUrl: aaa.link,
  }
}