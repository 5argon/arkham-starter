import type { GetDeckCardIdReturns } from '$lib/ahdb/public-api/high-level'
import { goto } from '$app/navigation'

export function goToGather(decks: GetDeckCardIdReturns[]) {
	const ids = decks.map((x, i) => 'p' + (i + 1) + '=' + (x.published ? 'p-' : '') + x.id)
	const joined = ids.join('&')
	goto('/tool/gather?' + joined)
}
