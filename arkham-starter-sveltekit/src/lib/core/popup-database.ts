import Fuse from 'fuse.js'

import { isRandomBasicWeakness } from '$lib/ahdb/card'
import {
	classConversion,
	iconToNameConversion,
	packCodeToIconConversion,
} from '$lib/ahdb/conversion'
import pdbJson from '$lib/data/popupdb.json'

import type { CardClass } from './card-class'
import { CardPack } from './card-pack'
export type LazyPopupDatabase = Promise<PopupDatabase>

export class PopupDatabase {
	private cards: PopupDatabaseItem[]
	private fuse: Fuse<PopupDatabaseItem>
	private map: { [k: string]: PopupDatabaseItem }
	private byPack: { [k: string]: PopupDatabaseItem[] }
	private allInvestigators: PopupDatabaseItem[]

	constructor(raw: PopupDatabaseRaw) {
		this.byPack = {}
		this.byPack[CardPack.TheDrownedCity] = []
		this.allInvestigators = []
		this.cards = raw.items.map<PopupDatabaseItem>((x) => {
			let icon = packCodeToIconConversion(raw.packCodes[x.pc])
			if (isRandomBasicWeakness(x.id)) {
				icon = CardPack.RandomBasicWeakness
			}
			const p: PopupDatabaseItem = {
				original: x,
				class1: classConversion(raw.classNames[x.c1]),
				class2: x.c2 !== undefined ? classConversion(raw.classNames[x.c2]) : x.c2,
				class3: x.c3 !== undefined ? classConversion(raw.classNames[x.c3]) : x.c3,
				packCode: raw.packCodes[x.pc],
				packIcon: icon,
				packName: raw.packNames[x.pn],
				packNameTransformed: iconToNameConversion(icon),
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
			if (!(x.packIcon in this.byPack)) {
				this.byPack[x.packIcon] = []
			}
			this.byPack[x.packIcon].push(x)
			if (x.original.inv) {
				this.allInvestigators.push(x)
			}
		})
		this.map = makeMap
		this.fuse = new Fuse<PopupDatabaseItem>(this.cards, {
			keys: ['original.n'],
		})
	}

	getById(card: string): PopupDatabaseItem | null {
		if (card in this.map) {
			return this.map[card]
		}
		return null
	}

	getByIdThrowNull(card: string): PopupDatabaseItem {
		if (card in this.map) {
			return this.map[card]
		}
		throw 'Card not found in popup database: ' + card
	}

	fuzzySearch(s: string): PopupDatabaseItem[] {
		const result = this.fuse.search('="' + s + '"')
		return result.map((x) => x.item)
	}

	public queryPack(packs: CardPack[]): PopupDatabaseItem[] {
		return packs.flatMap<PopupDatabaseItem>((x) => {
			if (x in this.byPack) {
				return this.byPack[x]
			}
			throw new Error('Pack not found ' + x)
		})
	}
}

export interface PopupDatabaseItem {
	packIcon: CardPack
	class1: CardClass
	class2?: CardClass
	class3?: CardClass
	traits: string[]
	positionString: string
	packName: string
	packNameTransformed: string
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
	 * It is also `true` when it is Bonded to an another `ir` card, even if that card is
	 * techically not IR.
	 */
	ir?: boolean

	/**
	 * This is an investigator card.
	 */
	inv?: boolean

	/**
	 * Weakness.
	 */
	wk?: boolean

	/**
	 * Basic Weakness.
	 */
	bwk?: boolean

	/**
	 * If defined, it is linked to this card ID.
	 */
	lnk?: string

	/**
	 * If defined, card is double-sided and this is the image name of the back side.
	 */
	dbl?: string

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

	/**
	 * Spoiler was on in arkhamdb
	 */
	sp?: boolean

	/**
	 * Hidden was on in arkhamdb
	 */
	hd?: boolean

	/**
	 * Whether the card has Bonded keyword.
	 */
	bd?: boolean

	/**
	 * This card can call for these Bonded cards.
	 */
	bdt?: { c: string; q: number }[]

	/**
	 * Is a Permanent card.
	 */
	pe?: boolean

	/*
	 * Is a Myraid card.
	 */
	myr?: boolean
}

export async function fetchPopupDatabaseStatic(): LazyPopupDatabase {
	return new PopupDatabase(pdbJson)
}
