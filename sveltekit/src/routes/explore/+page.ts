import { browser } from '$app/environment'
import type { Load } from '@sveltejs/kit'

export const load: Load<ExploreParam, ExploreInputData, ExploreParentData, ExploreData> = () => {
	let q = ''
	if (browser) {
		q = new URL(window.location.href).searchParams.get('q') ?? ''
	}
	const ret: ExploreData = {
		q: q,
	}
	return ret
}

export interface ExploreParam {
	[s: string]: string
	q: string
}

export interface ExploreInputData {
	[s: string]: string
}

export interface ExploreParentData {
	[s: string]: string
}

export interface ExploreData {
	[s: string]: string
	q: string
}
