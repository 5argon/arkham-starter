import { fetchPopupDatabaseStatic, PopupDatabase } from '$lib/core/popup-database'

import type { PageLoad } from './$types'

interface Ret {
	pdb: PopupDatabase
}

export const load: PageLoad<Ret> = async () => {
	const pdb = await fetchPopupDatabaseStatic()
	return {
		pdb: pdb,
	}
}
