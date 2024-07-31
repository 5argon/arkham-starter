import type { CardAndAmount } from '$lib/ahdb/public-api/high-level'
import type { PopupDatabase } from '$lib/core/popup-database'

export interface BondedEntries {
  bondedToMain: CardAndAmount[]
  bondedToSide: CardAndAmount[]
}

const specialLinkedCards: { [key: string]: string[] } = {
  '04040': ['04041', '04042'], // Doomed -> Accursed Fate, The Bell Tolls
  '04041': ['04042'], // Accursed Fate -> The Bell Tolls
  '04038': ['04039'], // Dark Pact -> The Price of Failure
  '04039': ['04038'], // The Price of Failure -> Dark Pact
  '53013': ['53014', '53015'], // Offer You Cannot Refuse -> Fine Print, Sell Your Soul
  '53014': ['53015'], // Fine Print -> Sell Your Soul
}

/**
 * Return what bonded cards are required to be set-aside near both your main and side deck.
 * Using mapping information in PopupDatabase.
 *
 * Many different cards with the same bonded card will get bonded card merged.
 * (e.g. Side deck with all versions of Researched Dream Diary results in only one Essence of the Dream
 * in the side deck.)
 *
 * If both main deck and side deck has a card that calls for the same bonded card, the bonded card
 * is put into only the main deck.
 */
export function makeBondedDecklistEntries(
  pdb: PopupDatabase,
  investigatorCode: string,
  main: CardAndAmount[],
  side: CardAndAmount[],
): BondedEntries {
  const bondedToMain = new Map<string, CardAndAmount>()
  const bondedToSide = new Map<string, CardAndAmount>()
  bonding({ cardId: investigatorCode, amount: 1 }, bondedToMain)
  main.forEach((x) => bonding(x, bondedToMain))
  side.forEach((x) => bonding(x, bondedToSide))

  function bonding(x: CardAndAmount, pushTo: Map<string, CardAndAmount>) {
    const card = pdb.getByIdThrowNull(x.cardId)
    if (card.original.bdt !== undefined) {
      card.original.bdt.forEach((bonded) => {
        // 10016b is Resolute Hank's back side. It is the same card as his front side.
        // We only want one card to be bonded.
        if (bonded.c !== '10016b') {
          // Sanity check
          const bondedCard = pdb.getByIdThrowNull(bonded.c)
          // Quantity of bonded cards needed are max available regardless of how many you have
          // cards that calls for them.

          // The && prevents Dream Diary Researched waiting in the side deck to also
          // request Essence of the Dream in the Side-Linked deck, while that card is
          // already in use in Main-Linked deck due to playing with the Untranslated version.
          if (!pushTo.has(bonded.c) && !bondedToMain.has(bonded.c)) {
            pushTo.set(bonded.c, { amount: bondedCard.original.q, cardId: bonded.c })
          }
        }
      })
      // Cards not explicitly listed as Bonded.
      if (specialLinkedCards[x.cardId]) {
        specialLinkedCards[x.cardId].forEach((bonded) => {
          pdb.getByIdThrowNull(bonded)
          if (!pushTo.has(bonded) && !bondedToMain.has(bonded)) {
            pushTo.set(bonded, { amount: 1, cardId: bonded })
          }
        })
      }
    }
  }

  return {
    bondedToMain: Array.from(bondedToMain.values()),
    bondedToSide: Array.from(bondedToSide.values()),
  }
}
