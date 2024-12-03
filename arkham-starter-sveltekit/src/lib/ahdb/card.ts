import { CardPack } from '$lib/core/card-pack'

export const randomBasicWeakness = '01000'
export function isRandomBasicWeakness(cardId: string): boolean {
	return cardId === randomBasicWeakness
}

export function isUnknownCardNumber(pack: CardPack | null, num: number): boolean {
	if (pack === CardPack.TheScarletKeys && num > 123) return true
	return num === 1000 || num === 0
}

export interface AhdbCard {
	pack_code: string
	pack_name: string
	type_code: string
	type_name: string
	subtype_code?: string
	subtype_name?: string
	faction_code: string
	faction_name: string
	faction2_code?: string
	faction2_name?: string
	faction3_code?: string
	faction3_name?: string
	duplicate_of_code?: string
	duplicate_of_name?: string
	position: number
	exceptional: boolean
	myriad: false
	code: string
	name: string
	real_name: string
	subname: string
	cost?: number
	text?: string
	real_text: string
	quantity: number
	skill_combat?: number
	skill_intellect?: number
	skill_agility?: number
	skill_willpower?: number
	skill_wild?: number
	xp?: number
	health?: number
	sanity?: number
	health_per_investigator: boolean
	deck_limit: number
	slot?: string
	real_slot?: string
	traits?: string
	real_traits?: string
	restrictions?:
		| null
		| string
		| {
				investigator?: { [k: string]: string }
				trait?: string[]
		  }
	flavor?: string
	illustrator: string
	is_unique: boolean
	permanent: boolean
	double_sided: boolean
	octgn_id: string
	url: string
	imagesrc?: string
	backimagesrc?: string
	duplicated_by?: string[]
	alternated_by?: string[]
	customization_text?: string
	customization_change?: string
	customization_options?: {
		xp: number
		text_change: 'replace' | 'insert' | 'append'
		choice: 'remove_slot' | 'choose_trait' | 'choose_card'
		position?: number
		quantity?: number
	}[]
	hidden?: boolean
	linked_to_code?: string
	linked_to_name?: string
	spoiler?: number
	deck_options?: AhdbDeckOption[]
	tags?: string
	bonded_to?: null | string
	bonded_cards?: { count: number; code: string }[]
	back_link?: string
}

export interface AhdbDeckOption {
	faction?: string[]
	faction_select?: string[]
	not?: boolean
	trait?: string[]
	level?: { min: number; max: number }
	text?: string[]
	tag?: string[]
	limit?: number
	error?: string
	atleast: { factions: number; min: number }
	name?: string
	id?: string
	option_select?: AhdbDeckOption[]
	uses?: string[]
	size?: number
	type?: string[]
	deck_size_select?: string[]
}
