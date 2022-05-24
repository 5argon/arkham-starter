export interface DecklistEntry {
	cardId: string
	amount: number
	label?: DecklistLabel
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

export interface DecklistCards {
	deck: DecklistEntry[]
	sideDeck: DecklistEntry[]
	ignoreDeckLimit: DecklistEntry[]
}
