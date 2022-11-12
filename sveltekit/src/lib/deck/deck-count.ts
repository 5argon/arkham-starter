import type { CardAndAmount } from '$lib/ahdb/public-api/high-level'
import { CardPack } from '$lib/core/card-pack'

export type PackCount = { [pack: number]: number }

export function countPacks(cards: CardAndAmount[], getPack: (c: string) => CardPack): PackCount {
	const pc: PackCount = {}
	cards.forEach((x) => {
		let pack = getPack(x.cardId)
		if (pack === CardPack.CoreSet) {
			pack = CardPack.RevisedCoreSet
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
