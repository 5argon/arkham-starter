/**
 * Minimal data about all the campaign cards.
 * - Only cards that can go into player deck.
 * - Only for translating ID to readable name. No card text information.
 */
export type CampaignDatabaseRaw = CampaignDatabaseItem[]

export type LazyCampaignDatabase = Promise<CampaignDatabase>

export interface CampaignDatabaseItem {
	id: string
	name: string
}

export class CampaignDatabase {
	private cards: CampaignDatabaseItem[]
	private map: { [k: string]: CampaignDatabaseItem }
	constructor(raw: CampaignDatabaseRaw) {
		this.cards = raw
		const makeMap: { [k: string]: CampaignDatabaseItem } = {}
		this.cards.forEach((x) => {
			makeMap[x.id] = x
		})
		this.map = makeMap
	}

	getById(card: string): CampaignDatabaseItem | null {
		if (card in this.map) {
			return this.map[card]
		}
		return null
	}
}

export async function fetchCampaignDatabase(): LazyCampaignDatabase {
	const res = await fetch('/db/campaign.json')
	const p = (await res.json()) as CampaignDatabaseRaw
	return new CampaignDatabase(p)
}
