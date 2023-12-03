import type { CardPack } from '$lib/core/card-pack'
import type { Grouping, Sorting } from '$lib/deck-table/grouping'

export interface ExploreInput {
	packs: CardPack[]
	groupings: Grouping[]
	sortings: Sorting[]
}
