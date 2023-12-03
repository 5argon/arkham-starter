interface CampaignManager {
	campaigns: Campaign[]
	activeCampaignIndex: number
}

interface Campaign {
	decks: Deck[]
}

interface Deck {
	arkhamDbId: number
	arkhamStarter: boolean
}
