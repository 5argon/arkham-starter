
export interface DecklistEntry {
	cardId: string
	amount: number
	label?: string
}

export interface DecklistCards {
	deck: DecklistEntry[]
	sideDeck: DecklistEntry[]
	ignoreDeckLimit: DecklistEntry[]
}
