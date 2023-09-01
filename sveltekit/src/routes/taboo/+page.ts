import { fetchFullDatabaseV2 } from '$lib/core/full-database'
import { PopupDatabase, fetchPopupDatabaseV2 } from '$lib/core/popup-database'
import type { PageLoad } from './$types'

interface Ret {
	pdb: PopupDatabase
}

export const load: PageLoad<Ret> = async (pl) => {
	const pdb = await fetchPopupDatabaseV2(pl.fetch)
	const fdb = await fetchFullDatabaseV2(pl.fetch)
	return {
		pdb: pdb,
		fdb:fdb,
	}
}
