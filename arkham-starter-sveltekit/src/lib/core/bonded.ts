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
	main: CardAndAmount[],
	side: CardAndAmount[],
): BondedEntries {
	const bondedToMain: CardAndAmount[] = []
	const bondedToSide: CardAndAmount[] = []
	const alreadyAdded = new Map<string, boolean>()
	main.forEach((x) => bonding(x, bondedToMain))
	side.forEach((x) => bonding(x, bondedToSide))

	function bonding(x: CardAndAmount, pushTo: CardAndAmount[]) {
		const card = pdb.getByIdThrowNull(x.cardId)
		if (card.original.bdt !== undefined) {
			card.original.bdt.forEach((bonded) => {
				// Sanity check
				pdb.getByIdThrowNull(bonded.c)
				if (alreadyAdded.has(bonded.c)) {
					return
				}
				pushTo.push({
					amount: bonded.q ?? 1, // ?? 1 fixes null count mistakes from DB.
					cardId: bonded.c,
				})
				alreadyAdded.set(bonded.c, true)
			})
			// Cards not explicitly listed as Bonded.
			if (specialLinkedCards[x.cardId]) {
				specialLinkedCards[x.cardId].forEach((bonded) => {
					if (alreadyAdded.has(bonded)) {
						return
					}
					pushTo.push({
						amount: 1,
						cardId: bonded,
					})
					alreadyAdded.set(bonded, true)
				})
			}
		}
	}

	return {
		bondedToMain: bondedToMain,
		bondedToSide: bondedToSide,
	}
}
