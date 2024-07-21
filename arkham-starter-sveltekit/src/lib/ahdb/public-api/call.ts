import type { AhdbCard } from '../card'
import type { AhdbDeck, AhdbRealPublished } from '../deck'
import type { AhdbPack } from '../pack'
import type { AhdbTaboo, AhdbTabooProcessing, TabooItem } from '../taboo'
import {
	arkhamBuildShareUrl,
	publicApiCard,
	publicApiCards,
	publicApiDeck,
	publicApiDecklist,
	publicApiPacks,
	publicApiTaboos,
	realUrlDecklist,
} from './constants'
import { fetchWithRetries } from './fetch'

function joinPath(...s: string[]): string {
	return s.join('/')
}

export async function publicCard(cardNumber: string): Promise<AhdbCard> {
	const joinedPath = joinPath(...publicApiCard, cardNumber)
	const ret = await fetchWithRetries(joinedPath)
	const c = (await ret.json()) as AhdbCard
	//console.log(c);
	return c
}

export async function publicAllCards(): Promise<AhdbCard[]> {
	const joinedPath = joinPath(...publicApiCards)
	const ret = await fetchWithRetries(joinedPath)
	const c = (await ret.json()) as AhdbCard[]
	//console.log(c);
	return c
}

export async function fetchArkhamBuildDeck(deckId  :string) : Promise<AhdbDeck | null> {
	const publicDeck = joinPath(...arkhamBuildShareUrl, deckId)
	try {
		const ret2 = await fetchWithRetries(publicDeck)
		const s2 = (await ret2.json()) as AhdbDeck
		return s2
	} catch {
		return null
	}
}

export async function fetchPublishedArkhamDbDeck(deckNumber: string): Promise<AhdbDeck | null> {
	const publicDecklist = joinPath(...publicApiDecklist, deckNumber)
	try {
		const ret = await fetchWithRetries(publicDecklist)
		const s = (await ret.json()) as AhdbDeck
		//console.log(s)
		return s
	} catch {
		return null
	}
}

export async function realDeckPublished(deckNumber: string): Promise<AhdbRealPublished | null> {
	const publicDecklist = joinPath(...realUrlDecklist, deckNumber)
	try {
		const ret = await fetchWithRetries(publicDecklist)
		const s = await ret.text()
		const parser = new DOMParser()
		const doc = parser.parseFromString(s, 'text/html')
		const username = doc.querySelector('.username')
		if (username !== null) {
			const ret: AhdbRealPublished = { username: username.textContent ?? '', userUrl: '' }
			return ret
		}
		return null
	} catch {
		return null
	}
}

export async function fetchPublicArkhamDbDeck(deckNumber: string): Promise<AhdbDeck | null> {
	const publicDeck = joinPath(...publicApiDeck, deckNumber)
	try {
		const ret2 = await fetchWithRetries(publicDeck)
		const s2 = (await ret2.json()) as AhdbDeck
		//console.log(s2)
		return s2
	} catch {
		return null
	}
}

export async function publicPacks(): Promise<AhdbPack[]> {
	const joinedPath = joinPath(...publicApiPacks)
	const ret = await fetchWithRetries(joinedPath)
	const c = (await ret.json()) as AhdbPack[]
	//console.log(c);
	return c
}

export async function publicTaboos(): Promise<AhdbTaboo[]> {
	const joinedPath = joinPath(...publicApiTaboos)
	const ret = await fetchWithRetries(joinedPath)
	const c = (await ret.json()) as AhdbTabooProcessing[]
	const cc = c.map<AhdbTaboo>((x) => {
		return {
			...x,
			cards: JSON.parse(x.cards) as TabooItem[],
		}
	})
	return cc
}
