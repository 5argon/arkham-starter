import { isRandomBasicWeakness } from '$lib/ahdb/card'
import type { CustomizableMeta } from '$lib/ahdb/public-api/high-level'
import type { PopupDatabase } from '$lib/core/popup-database'

interface Sorter {
	side: boolean
	card: string
}
export function getRepresentativeCards(
	mainDeck: string[],
	sideDeck: string[],
	pdb: PopupDatabase,
	customizableMetas: CustomizableMeta[],
): string[] {
	let sorters: Sorter[] = []
	mainDeck.forEach((x) => {
		sorters.push({ card: x, side: false })
	})
	sideDeck.forEach((x) => {
		sorters.push({ card: x, side: true })
	})
	sorters = sorters.filter((x) => {
		return !isRandomBasicWeakness(x.card)
	})

	function score(s: Sorter): number {
		const c = pdb.getById(s.card)
		if (
			c === null ||
			c.original.sp === true ||
			isRandomBasicWeakness(c.original.id) ||
			c.original.wk
		) {
			return -99999
		}
		let sc = 0
		if (c.original.xp ?? 0 > 0) {
			sc += 100000
		}
		if (!s.side) {
			sc += 10000
		}
		if (c.original.cus !== undefined) {
			sc += 5000
		}
		sc += (c.original.xp ?? 0) * 100
		sc += c.packIcon * 10
		return sc
	}

	sorters.sort((a, b) => {
		return score(b) - score(a)
		// if (cardA === null) {
		// 	return 1
		// }
		// if (cardB === null) {
		// 	return -1
		// }
		// if (a.side && !b.side) {
		// 	return 1
		// } else if (b.side && !a.side) {
		// 	return -1
		// }
		// if (cardA.original.xp !== cardB.original.xp) {
		// 	return (cardB.original.xp ?? 0) - (cardA.original.xp ?? 0)
		// } else {
		// 	return 0
		// }
	})
	return sorters.map((x) => x.card).slice(0, 5)
}
