import type { CardAndAmount } from '$lib/ahdb/public-api/high-level'
import type { PopupDatabase } from '$lib/core/popup-database'

export interface BondedEntries {
  bondedToMain: CardAndAmount[]
  bondedToSide: CardAndAmount[]
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
export function makeBondedDecklistEntries(pdb: PopupDatabase,
                                          main: CardAndAmount[],
                                          side: CardAndAmount[]): BondedEntries {
  const bondedToMain: CardAndAmount[] = []
  const bondedToSide: CardAndAmount[] = []
  const alreadyAdded = new Map<string, boolean>()
  main.forEach(x => bonding(x, bondedToMain))
  side.forEach(x => bonding(x, bondedToSide))

  function bonding(x: CardAndAmount, pushTo: CardAndAmount[]) {
    const card = pdb.getByIdThrowNull(x.cardId)
    if (card.original.bdt !== undefined) {
      card.original.bdt.forEach((y) => {
        // Sanity check
        pdb.getByIdThrowNull(y.c)
        if (alreadyAdded.has(y.c)) {
          return
        }
        pushTo.push({
          amount: y.q ?? 1, // ?? 1 fixes null count mistakes from DB.
          cardId: y.c,
        })
        alreadyAdded.set(y.c, true)
      })
    }
  }

  return {
    bondedToMain: bondedToMain,
    bondedToSide: bondedToSide,
  }
}
