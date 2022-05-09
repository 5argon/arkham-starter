import {
	classConversion,
	iconToNewNameConversion,
	packCodeToIconConversion,
} from '$lib/ahdb/conversion'
import type { CardPackIcon } from '$lib/design/interface/card-pack'
import pdb from '../data/popupdb.json'
import type { CardClass } from './card-class'
export type LazyPopupDatabase = Promise<PopupDatabase>

export class PopupDatabase {
	private cards: PopupDatabaseItem[]
	private map: { [k: string]: PopupDatabaseItem }
	constructor(raw: PopupDatabaseRaw) {
		this.cards = raw.items.map<PopupDatabaseItem>((x) => {
			const icon = packCodeToIconConversion(raw.packCodes[x.pc])
			const p: PopupDatabaseItem = {
				original: x,
				class1: classConversion(raw.classNames[x.c1]),
				class2: x.c2 !== undefined ? classConversion(raw.classNames[x.c2]) : x.c2,
				class3: x.c3 !== undefined ? classConversion(raw.classNames[x.c3]) : x.c3,
				packCode: raw.packCodes[x.pc],
				packIcon: icon,
				packName: raw.packNames[x.pn],
				packNameTransformed: iconToNewNameConversion(icon),
				positionString: x.ps.toString(),
				xpString: x.xp?.toString() ?? '',
				xpStringAfterTaboo: x.xpat.toString(),
				traits: x.tra.map((x) => raw.traits[x]),
			}
			return p
		})
		const makeMap: { [k: string]: PopupDatabaseItem } = {}
		this.cards.forEach((x) => {
			makeMap[x.original.id] = x
		})
		this.map = makeMap
	}

	getById(card: string): PopupDatabaseItem | null {
		if (card in this.map) {
			return this.map[card]
		}
		return null
	}
}

export interface PopupDatabaseItem {
	packIcon: CardPackIcon
	class1: CardClass
	class2?: CardClass
	class3?: CardClass
	traits: string[]
	positionString: string
	packName: string
	packNameTransformed: string | null
	packCode: string
	xpString: string
	xpStringAfterTaboo: string
	original: PopupDatabaseItemRaw
}

/**
 * Compact database of all player cards that is enough to use in a quick popup
 * and card listing. Preprocessed from full data from ArkhamDB with the latest
 * taboo pre-applied.
 */
export interface PopupDatabaseRaw {
	packNames: { [k: number]: string }
	packCodes: { [k: number]: string }
	classNames: { [k: number]: string }
	traits: { [k: number]: string }
	items: PopupDatabaseItemRaw[]
}

export interface PopupDatabaseItemRaw {
	id: string

	/**
	 * Name
	 */
	n: string

	/**
	 * Subname
	 */
	sn: string

	/**
	 * Pack code
	 */
	pc: number

	/**
	 * Pack name
	 */
	pn: number

	/**
	 * Position
	 */
	ps: number

	/**
	 * Class string 1
	 */
	c1: number

	/**
	 * Class string 2
	 */
	c2?: number

	/**
	 * Class string 3
	 */
	c3?: number

	/**
	 * XP
	 */
	xp?: number

	/**
	 * XP added from taboo
	 */
	xpat: number

	/**
	 * Exceptional
	 */
	ex: boolean

	/**
	 * Exceptional after taboo
	 */
	ext: boolean

	/**
	 * Investigator restriction
	 */
	ir: boolean

	/**
	 * Weakness
	 */
	wk: boolean

	/**
	 * Intellect
	 */
	sit?: number

	/**
	 * Combat
	 */
	scm?: number

	/**
	 * Wild
	 */
	swl?: number

	/**
	 * Agility
	 */
	sag?: number

	/**
	 * Willpower
	 */
	swi?: number

	/**
	 * Traits
	 */
	tra: number[]
}

export async function fetchPopupDatabase(): LazyPopupDatabase {
	// Real app use fetch, dev use direct import?
	// const res = await fetch('/db/popupdb.json')
	// const pdb = (await res.json()) as PopupDatabase
	const p = pdb as PopupDatabaseRaw
	return new PopupDatabase(p)
}
