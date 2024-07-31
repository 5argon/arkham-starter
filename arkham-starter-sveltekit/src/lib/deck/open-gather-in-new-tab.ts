import { DeckSource } from '$lib/ahdb/public-api/high-level'

export interface GoToGatherInputArgs {
	id: string
	source: DeckSource
}
export function openGatherInNewTab(decks: GoToGatherInputArgs[]) {
	const ids = decks.map((x, i) => 'p' + (i + 1) + '=' + (x.source === DeckSource.ArkhamDbPublished ? 'p-' : '') + x.id)
	const joined = ids.join('&')
	window.open('/tool/gather?' + joined, '_blank')
}
