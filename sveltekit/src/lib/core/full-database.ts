import {
	classConversion,
	iconToNewNameConversion,
	packCodeToIconConversion,
} from '$lib/ahdb/conversion'
import type { AhdbTaboo } from '$lib/ahdb/taboo'
import tb from '../data/taboo.json'
import { CardClass } from '$lib/design/interface/card-class'
import { CardPackIcon } from '$lib/design/interface/card-pack'
import type { CardPack } from './card-pack'
import type { AhdbCard } from '$lib/ahdb/card'
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
	private byPack: { [k: string]: FullDatabaseItem[] }
	constructor(cards: AhdbCard[], taboo: AhdbTaboo | null) {
		this.cardsMap = {}
		this.sameName = {}
		this.byPack = {}
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

			if (!(x.packIcon in this.byPack)) {
				this.byPack[x.packIcon] = []
			}
			this.byPack[x.packIcon].push(x)

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

		// if (randomBasicWeakness in this.cardsMap) {
		// 	const rbw = this.cardsMap[randomBasicWeakness]
		// 	this.cardsMap[randomBasicWeaknessRcore] = {
		// 		...rbw,
		// 		packIcon: CardPackIcon.RandomBasicWeakness,
		// 		original: {
		// 			...rbw.original,
		// 			code: randomBasicWeaknessRcore,
		// 			pack_name: 'Random Basic Weakness',
		// 			pack_code: 'rbw',
		// 		},
		// 	}
		// }
	}

	/**
	 * Has built-in unknown card forwarding.
	 */
	public getCard(id: string): FullDatabaseItem {
		if (id in this.cardsMap) {
			return this.cardsMap[id]
		}
		return this.createUnknownCard(id)
	}

	public queryPack(packs: CardPack[]): FullDatabaseItem[] {
		return packs.flatMap<FullDatabaseItem>((x) => {
			if (x in this.byPack) {
				return this.byPack[x]
			}
			throw new Error('Pack not found ' + x)
		})
	}

	private createUnknownCard(id: string): FullDatabaseItem {
		return {
			class1: CardClass.Neutral,
			packIcon: CardPackIcon.Unknown,
			packNameTransformed: null,
			original: {
				code: id,
				deck_limit: 0,
				double_sided: false,
				exceptional: false,
				faction_code: 'neutral',
				faction_name: 'Neutral',
				health_per_investigator: false,
				illustrator: '',
				is_unique: false,
				myriad: false,
				name: `Unknown (ID: ${id})`,
				octgn_id: '',
				pack_code: 'unk',
				pack_name: '(Unknown Set)',
				permanent: false,
				position: 0,
				quantity: Number.MAX_SAFE_INTEGER,
				real_name: 'Unknown',
				real_slot: '',
				real_text: '',
				slot: '',
				subname: '',
				text: '',
				type_code: 'unknown',
				type_name: 'Unknown',
				url: '',
			},
		}
	}

	public getSameName(name: string): FullDatabaseItem[] {
		if (name in this.sameName) {
			return this.sameName[name]
		}
		return []
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
