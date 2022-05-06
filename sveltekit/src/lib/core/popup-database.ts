import { classConversion, packCodeToIconConversion } from '$lib/ahdb/conversion'
import type { CardPackIcon } from '$lib/design/interface/card-pack'
import pdb from '../data/popupdb.json'
import type { CardClass } from './card-class'
export type LazyPopupDatabase = Promise<PopupDatabase>

export class PopupDatabase {
	private cards: PopupDatabaseItem[]
	private map: { [k: string]: PopupDatabaseItem }
	constructor(raw: PopupDatabaseItemRaw[]) {
		this.cards = raw.map<PopupDatabaseItem>((x) => {
			const p: PopupDatabaseItem = {
				...x,
				pc: packCodeToIconConversion(x.pc),
				c1: classConversion(x.c1),
				c2: x.c2 !== undefined ? classConversion(x.c2) : x.c2,
				c3: x.c3 !== undefined ? classConversion(x.c3) : x.c3,
			}
			return p
		})
		const makeMap: { [k: string]: PopupDatabaseItem } = {}
		this.cards.forEach((x) => {
			makeMap[x.id] = x
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

export type PopupDatabaseItem = Omit<PopupDatabaseItemRaw, 'pc' | 'c1' | 'c2' | 'c3'> & {
	pc: CardPackIcon
	c1: CardClass
	c2?: CardClass
	c3?: CardClass
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
	pc: string
	/**
	 * Pack name
	 */
	pn: string
	/**
	 * Subpack name
	 */
	spn: string
	/**
	 * Position
	 */
	ps: number
	/**
	 * Position string
	 */
	pss: string
	/**
	 * Class string 1
	 */
	c1: string
	/**
	 * Class string 2
	 */
	c2?: string
	/**
	 * Class string 3
	 */
	c3?: string
	/**
	 * XP
	 */
	xp?: number
	/**
	 * XP added from taboo
	 */
	xpat: number
	/**
	 * XP string
	 */
	xps: string
	/**
	 * XP string after added from taboo
	 */
	xpts: string
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
}

export async function fetchPopupDatabase(): LazyPopupDatabase {
	// Real app use fetch, dev use direct import?
	// const res = await fetch('/db/popupdb.json')
	// const pdb = (await res.json()) as PopupDatabase
	const p = pdb as PopupDatabaseItemRaw[]
	return new PopupDatabase(p)
}
