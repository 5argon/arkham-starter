import pdb from './popupdb.json'
export type LazyPopupDatabase = Promise<PopupDatabase>

export class PopupDatabase {
	private cards: PopupDatabaseItem[]
	private map: { [k: string]: PopupDatabaseItem }
	constructor(cards: PopupDatabaseItem[]) {
		this.cards = cards
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

export interface PopupDatabaseItem {
	id: string
	n: string
	sn: string
	pc: string
	pn: string
	spn: string
	ps: number
	pss: string
	c1: string
	c2?: string
	c3?: string
	xp?: number
	xpat: number
	xps: string
	xpts: string
	ex: boolean
	ext: boolean
}

export async function fetchPopupDatabase(): LazyPopupDatabase {
	// Real app use fetch, dev use direct import?
	// const res = await fetch('/db/popupdb.json')
	// const pdb = (await res.json()) as PopupDatabase
	const p = pdb as PopupDatabaseItem[]
	return new PopupDatabase(p)
}
