import type { CardPack } from '$lib/core/card-pack'
import type { Grouping, Sorting } from '$lib/deck-table/grouping'

export interface ExploreInput {
	packs: CardPack[]
	groupings: Grouping[]
	sortings: Sorting[]
	links?: ExploreLink[]
}

export interface ExploreLink {
	site: string
	name: string
	url: string
	date?: string
	cards?: string[]
}
