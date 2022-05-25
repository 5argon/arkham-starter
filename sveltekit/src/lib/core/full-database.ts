import {
	classConversion,
	iconToNewNameConversion,
	packCodeToIconConversion,
} from '$lib/ahdb/conversion'
import type { AhdbTaboo } from '$lib/ahdb/taboo'
import tb from '../data/taboo.json'
import type { CardClass } from '$lib/design/interface/card-class'
import { CardPackIcon } from '$lib/design/interface/card-pack'
import {
	isRandomBasicWeakness,
	randomBasicWeakness,
	randomBasicWeaknessRcore,
	type AhdbCard,
} from '$lib/ahdb/card'
export type LazyFullDatabase = Promise<FullDatabase>

export interface FullDatabaseItem {
	packIcon: CardPackIcon
	class1: CardClass
	class2?: CardClass
	class3?: CardClass
	packNameTransformed: string | null
	original: AhdbCard
	prioritySubname?: string
	tabooXp?: number
	tabooText?: string
	tabooDeckLimit?: number
	tabooExceptional?: boolean
}
/**
 * In static page, this can contains only what the deck really needs and nothing else.
 */
export class FullDatabase {
	private cardsMap: { [k: string]: FullDatabaseItem }
	private sameName: { [k: string]: FullDatabaseItem[] }
	constructor(cards: AhdbCard[], taboo: AhdbTaboo | null) {
		this.cardsMap = {}
		this.sameName = {}
		const mapped = cards.map<FullDatabaseItem>((x) => {
			const icon = packCodeToIconConversion(x.pack_code)
			const fdi: FullDatabaseItem = {
				class1: classConversion(x.faction_code),
				class2: x.faction2_code !== undefined ? classConversion(x.faction2_code) : x.faction2_code,
				class3: x.faction3_code !== undefined ? classConversion(x.faction3_code) : x.faction3_code,
				packIcon: icon,
				packNameTransformed: iconToNewNameConversion(icon),
				original: x,
			}
			if (taboo) {
				const tabooed = taboo.cards.find((y) => y.code === x.code)
				if (tabooed) {
					fdi.tabooDeckLimit = tabooed.deck_limit
					fdi.tabooExceptional = tabooed.exceptional
					fdi.tabooText = tabooed.text
					fdi.tabooXp = tabooed.xp
				}
			}
			return fdi
		})
		mapped.forEach((x) => {
			this.cardsMap[x.original.code] = x
			if (!(x.original.name in this.sameName)) {
				this.sameName[x.original.name] = []
			} else {
				if (
					this.sameName[x.original.name].findIndex(
						(y) => y.original.subname === x.original.subname,
					) === -1
				) {
					this.sameName[x.original.name].push(x)
				}
			}
		})

		if (randomBasicWeakness in this.cardsMap) {
			const rbw = this.cardsMap[randomBasicWeakness]
			this.cardsMap[randomBasicWeaknessRcore] = {
				...rbw,
				packIcon: CardPackIcon.RevisedCoreSet,
				original: {
					...rbw.original,
					code: randomBasicWeaknessRcore,
					pack_name: 'Revised Core Set',
					pack_code: 'rcore',
				},
			}
		}
	}
	public getCard(id: string): FullDatabaseItem {
		if (id in this.cardsMap) {
			return this.cardsMap[id]
		}
		throw new Error(`Card not found : ${id}`)
	}

	public getSameName(name: string): FullDatabaseItem[] {
		if (name in this.sameName) {
			return this.sameName[name]
		}
		throw new Error(`Card not found : ${name}`)
	}
}

export async function fetchLatestTaboo(): Promise<AhdbTaboo | null> {
	// const taboo = await fetch('/db/taboo.json')
	// const t = (await taboo.json()) as AhdbTaboo[]
	const t = tb as AhdbTaboo[]
	// const cc = t.map<AhdbTaboo>((x) => {
	// 	console.log(x)
	// 	return {
	// 		...x,
	// 		cards: JSON.parse(x.cards) as TabooItem[],
	// 	}
	// })
	const cc = t
	if (cc.length > 0) {
		return cc[0]
	}
	return null
}

export async function fetchFullDatabase(): LazyFullDatabase {
	const res = await fetch('/db/playerdb.json')
	const p = (await res.json()) as AhdbCard[]
	const tb = await fetchLatestTaboo()
	return new FullDatabase(p, tb)
}

export function shouldShowSubname(fdbi: FullDatabaseItem, fdb: FullDatabase): boolean {
	return fdb.getSameName(fdbi.original.name).length > 1
}
