import { fetchFullDatabaseStatic, FullDatabase } from '$lib/core/full-database'
import { fetchPopupDatabaseStatic, PopupDatabase } from '$lib/core/popup-database'

import type { PageLoad } from './$types'
interface Ret {
	fdb: FullDatabase
	pdb: PopupDatabase
}

export const load: PageLoad<Ret> = async () => {
	const fdb = await fetchFullDatabaseStatic()
	const pdb = await fetchPopupDatabaseStatic()
	return {
		pdb: pdb,
		fdb: fdb,
	}
}
