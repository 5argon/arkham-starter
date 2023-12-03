export interface AhdbTaboo {
	id: number
	code: string
	name: string
	active: number
	date_start: string
	date_update: string
	cards: TabooItem[]
}

export interface AhdbTabooProcessing {
	id: number
	code: string
	name: string
	active: number
	date_start: string
	date_update: string
	cards: TabooItemString
}

export type TabooItemString = string

export interface TabooItem {
	code: string
	xp?: number
	text?: string
	deck_limit?: number
	exceptional?: boolean
}
