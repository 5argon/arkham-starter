import type { CardAndAmount, FetchDeckResult } from '$lib/ahdb/public-api/high-level'
import { CardPack, cardPackToRevised } from '$lib/core/card-pack'

export type PackCount = { [pack: number]: number }

export function countPacksHigher(
	rcoreDeck: FetchDeckResult,
	extraCards: string[],
	getPack: (c: string) => CardPack,
): PackCount {
	const a = countPacks(rcoreDeck.cards1, getPack)
	const b = countPacks(
		rcoreDeck.cards2.filter((x) => !extraCards.includes(x.cardId)),
		getPack,
	)
	const c = countPacks(rcoreDeck.cards3, getPack)
	const packCount = addPackCount(addPackCount(a, b), c)
	return packCount
}

export function countPacks(cards: CardAndAmount[], getPack: (c: string) => CardPack): PackCount {
	const pc: PackCount = {}
	cards.forEach((x) => {
		const pack = cardPackToRevised(getPack(x.cardId))
		if (pack === CardPack.Unknown || pack === CardPack.RandomBasicWeakness) {
			return
		}
		if (!(pack in pc)) {
			pc[pack] = 0
		}
		pc[pack] = pc[pack] + x.amount
	})
	return pc
}

export function addPackCount(a: PackCount, b: PackCount): PackCount {
	const pc: PackCount = {}
	function iterAdd(base: PackCount, add: PackCount) {
		Object.entries(add).forEach((x) => {
			const pack = parseInt(x[0])
			const count = x[1]
			if (!(pack in base)) {
				base[pack] = 0
			}
			base[pack] = base[pack] + count
		})
	}
	iterAdd(pc, a)
	iterAdd(pc, b)
	return pc
}
