export interface DecklistEntry {
	/**
	 * Must uniquely identify the deck and cards from that deck.
	 */
	id: string
	cardId: string
	amount: number
	labels?: DecklistLabel[]
}

export interface DecklistLabel {
	text: string
	color: string
}

export function isEntry(d: DecklistEntry | GroupedCards): d is DecklistEntry {
	return 'cardId' in d
}

export interface GroupedCards {
	groupName: string | null
	entries: (DecklistEntry | GroupedCards)[]
}
