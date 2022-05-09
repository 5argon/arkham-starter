export const randomBasicWeakness = '01000'
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
	text: string
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
	slot: string
	real_slot: string
	traits?: string
	real_traits?: string
	restrictions?: null | {
		investigator: { [k: string]: string }
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
}
