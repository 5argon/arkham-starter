import {
	classConversion,
	iconToNewNameConversion,
	packCodeToIconConversion,
} from '$lib/ahdb/conversion'
import type { CardPackIcon } from '$lib/design/interface/card-pack'
import type { LoadEvent } from '@sveltejs/kit'
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
	/**
	 * Card string ID like in ArkhamDB, such as "01006".
	 */
	id: string

	/**
	 * Card name.
	 */
	n: string

	/**
	 * Card subname, such as "The Fed" of "Roland Banks".
	 */
	sn?: string

	/**
	 * If `true`, it means there are other cards with the same name
	 * and requires showing subname explicitly to not be confused.
	 * Such as various instances of "Strange Solution".
	 */
	esn: boolean

	/**
	 * Pack code.
	 * Use number to map with the real string in outer maps.
	 */
	pc: number

	/**
	 * Pack name
	 * Use number to map with the real string in outer maps.
	 */
	pn: number

	/**
	 * Position. The number of cards on the bottom right corner.
	 */
	ps: number

	/**
	 * Class string from ArkhamDB, such as "survivor". (all lowercase)
	 */
	c1: number

	/**
	 * Class string from ArkhamDB, such as "survivor". (all lowercase)
	 */
	c2?: number

	/**
	 * Class string from ArkhamDB, such as "survivor". (all lowercase)
	 */
	c3?: number

	/**
	 * XP pips
	 */
	xp?: number

	/**
	 * XP added (chained) from taboo. Can be negative in the case of unchain.
	 */
	xpat: number

	/**
	 * Exceptional status.
	 */
	ex: boolean

	/**
	 * Exceptional status after latest taboo applied.
	 */
	ext: boolean

	/**
	 * Investigator restriction.
	 * Essentially `true` when it is an investigator signature card / weakness.
	 */
	ir: boolean

	/**
	 * Weakness.
	 */
	wk: boolean

	/**
	 * Cost.
	 */
	cs?: number

	/**
	 * Intellect icons.
	 */
	sit?: number

	/**
	 * Combat icons.
	 */
	scm?: number

	/**
	 * Wild icons.
	 */
	swl?: number

	/**
	 * Agility icons.
	 */
	sag?: number

	/**
	 * Willpower icons.
	 */
	swi?: number

	/**
	 * Traits.
	 * Use number to map with the real string in outer maps.
	 */
	tra: number[]

	/**
	 * Customizable choices.
	 */
	cus?: {
		/**
		 * XP checkboxes
		 */
		xp: number

		/**
		 * Customizable name
		 */
		n: string
	}[]

	/**
	 * Quantity
	 */
	q: number
}

export async function fetchPopupDatabase(): LazyPopupDatabase {
	const res = await fetch('/db/popupdb.json')
	const p = (await res.json()) as PopupDatabaseRaw
	return new PopupDatabase(p)
}

export async function fetchPopupDatabaseV2(f: LoadEvent['fetch']): LazyPopupDatabase {
	const res = await f('/db/popupdb.json')
	const p = (await res.json()) as PopupDatabaseRaw
	return new PopupDatabase(p)
}
