import { FullDatabase, fetchFullDatabaseV2 } from '$lib/core/full-database'
import { PopupDatabase, fetchPopupDatabaseV2 } from '$lib/core/popup-database'
import type { PageLoad } from './$types'

interface Ret {
	fdb: FullDatabase
	pdb: PopupDatabase
}

export const load: PageLoad<Ret> = async (pl) => {
	const fdb = await fetchFullDatabaseV2(pl.fetch)
	const pdb = await fetchPopupDatabaseV2(pl.fetch)
	return {
		pdb: pdb,
		fdb: fdb,
	}
}
