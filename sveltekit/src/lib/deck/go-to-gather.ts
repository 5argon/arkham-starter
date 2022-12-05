import { goto } from '$app/navigation'

export interface GoToGatherInputArgs {
	id: string
	published: boolean
}
export function goToGather(decks: GoToGatherInputArgs[]) {
	const ids = decks.map((x, i) => 'p' + (i + 1) + '=' + (x.published ? 'p-' : '') + x.id)
	const joined = ids.join('&')
	goto('/tool/gather?' + joined)
}
