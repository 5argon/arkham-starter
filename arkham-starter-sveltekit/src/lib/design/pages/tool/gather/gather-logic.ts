import { coreToRcore } from '$lib/ahdb/conversion'
import type { FetchDeckResult } from '$lib/ahdb/public-api/high-level'
import { makeBondedDecklistEntries } from '$lib/core/bonded'
import { cardClassToBackgroundClass } from '$lib/core/card-class'
import type { PopupDatabase } from '$lib/core/popup-database'
import { getExtraName } from '$lib/deck/deck'
import type { DecklistEntry } from '$lib/deck-table/decklist-entry'

export interface Player {
  deckUrl: string
  deck: string
  error: boolean
}

export function newDeck(startingUrl: string): Player {
  return {
    deck: '',
    deckUrl: startingUrl,
    error: false,
  }
}

export function pushInCentralEntry(
  g: FetchDeckResult,
  player: number,
  ents: DecklistEntry[],
  fw: boolean,
  showMain: boolean,
  showSide: boolean,
  pdb: PopupDatabase,
) {
  const invCard = pdb.getByIdThrowNull(g.investigatorCode)
  const colorHex: string = cardClassToBackgroundClass(invCard.class1)
  const bonded = makeBondedDecklistEntries(pdb, g.investigatorCode, g.cards1, g.cards2)

  if (showMain) {
    for (let i = 0; i < g.cards1.length; i++) {
      const c1 = fw ? coreToRcore(g.cards1[i].cardId) : g.cards1[i].cardId
      const a1 = g.cards1[i].amount
      ents.push({
        id: 'd' + player + c1,
        amount: a1,
        cardId: c1,
        labels: [{ color: colorHex, cardId: g.investigatorCode }],
      })
    }
    ents.push(
      ...bonded.bondedToMain.map<DecklistEntry>((x) => {
        return {
          amount: x.amount,
          cardId: x.cardId,
          id: 'MainLinked' + x.cardId,
          labels: [
            { color: colorHex, cardId: g.investigatorCode },
            { color: colorHex, text: 'Linked' },
          ],
        }
      }),
    )
    if (g.decodedMeta.extraDeck) {
      ents.push(
        ...g.decodedMeta.extraDeck.map<DecklistEntry>((x) => {
          const gator = g.decodedMeta.alternateBack ?? g.investigatorCode
          return {
            amount: 1,
            cardId: x,
            id: 'Extra' + x,
            labels: [
              { color: colorHex, cardId: g.investigatorCode },
              { color: colorHex, text: getExtraName(gator) },
            ],
          }
        }),
      )
    }
  }
  if (showSide) {
    for (let i = 0; i < g.cards2.length; i++) {
      const c2 = fw ? coreToRcore(g.cards2[i].cardId) : g.cards2[i].cardId
      const a2 = g.cards2[i].amount
      ents.push({
        id: 's' + player + c2,
        amount: a2,
        cardId: c2,
        labels: [
          { color: colorHex, cardId: g.investigatorCode },
          { text: 'Side', color: colorHex },
        ],
      })
    }
    ents.push(
      ...bonded.bondedToSide.map<DecklistEntry>((x) => {
        return {
          amount: x.amount,
          cardId: x.cardId,
          id: 'SideLinked' + x.cardId,
          labels: [
            { color: colorHex, cardId: g.investigatorCode },
            { color: colorHex, text: 'Side-LK' },
          ],
        }
      }),
    )
  }
}
