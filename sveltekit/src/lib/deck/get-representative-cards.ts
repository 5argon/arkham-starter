import type { PopupDatabase } from '$lib/core/popup-database'

interface Sorter {
	side: boolean
	card: string
}
export function getRepresentativeCards(
	mainDeck: string[],
	sideDeck: string[],
	pdb: PopupDatabase,
): string[] {
	const sorters: Sorter[] = []
	mainDeck.forEach((x) => {
		sorters.push({ card: x, side: false })
	})
	sideDeck.forEach((x) => {
		sorters.push({ card: x, side: true })
	})
	sorters.sort((a, b) => {
		const cardA = pdb.getById(a.card)
		const cardB = pdb.getById(b.card)
		if (cardA === null) {
			return 1
		}
		if (cardB === null) {
			return -1
		}
		if (cardA.original.xp !== cardB.original.xp) {
			return (cardB.original.xp ?? 0) - (cardA.original.xp ?? 0)
		} else {
			if (a.side) {
				return -1
			} else {
				return 1
			}
		}
	})
	return sorters.map((x) => x.card).slice(0, 5)
}
