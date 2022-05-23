import type { AhdbCard } from '$lib/ahdb/card'

/**
 * In static page, this can contains only what the deck really needs and nothing else.
 */
export class FullDatabase {
	private cards: AhdbCard[]
	private cardsMap: { [k: string]: AhdbCard }
	constructor(cards: AhdbCard[]) {
		this.cards = cards
		this.cardsMap = {}
		cards.forEach((x) => {
			this.cardsMap[x.code] = x
		})
	}
	public getCard(id: string): AhdbCard {
		if (id in this.cardsMap) {
			return this.cardsMap[id]
		}
		throw new Error(`Card not found : ${id}`)
	}
}
