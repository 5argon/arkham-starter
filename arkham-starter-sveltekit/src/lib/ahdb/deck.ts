export interface AhdbDeck {
	id: number
	name: string
	date_creation: string
	date_update: string
	description_md: string
	user_id: number | null
	investigator_code: string
	investigator_name: string
	slots: CardList
	sideSlots: CardList
	ignoreDeckLimitSlots: CardList
	version: number
	xp: number | null
	xp_spent: number | null
	xp_adjustment: number
	exile_string: null
	taboo_id: number
	meta: string
	tags: string
	previous_deck: number | null
	next_deck: number | null
	problem: string | null
}

export interface AhdbRealPublished {
	username: string
	userUrl: string
}

export type CardList = { [k: string]: number } | null
