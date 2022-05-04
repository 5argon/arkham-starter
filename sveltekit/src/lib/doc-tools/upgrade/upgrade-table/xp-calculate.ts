import type { LazyPopupDatabase, PopupDatabase } from '$lib/popup-database'
import type { GlobalSettings, Row } from '../interface'

export interface CalculatedXp {
	costs: number[]
	cumulatives: number[]
}

export async function calculateXps(
	popupDatabase: LazyPopupDatabase,
	rows: Row[],
	gs: GlobalSettings,
): Promise<CalculatedXp> {
	console.log("Calc!")
	const db = await popupDatabase
	let cumulative = 0
	const costs: number[] = []
	const cumulatives: number[] = []
	for (let i = 0; i < rows.length; i++) {
		const r = rows[i]
		if (r.divider) {
			if (r.dividerXpCumulativeUnlock) {
				cumulative = r.carryoverXp
			}
			costs.push(0)
			cumulatives.push(cumulative)
		} else {
			if (r.xpUnlock) {
				cumulative += r.xp
				costs.push(0)
				cumulatives.push(cumulative)
			} else {
				const xp = findXpDifference(r.left, r.right, db, gs)
				costs.push(xp)
				cumulative += xp
				cumulatives.push(cumulative)
			}
		}
	}
	console.log(costs)
	console.log(cumulatives)
	return {
		costs: costs,
		cumulatives: cumulatives,
	}
}

/**
 * Returns 0 XP if card not found or not a card.
 */
function findXpDifference(
	left: string,
	right: string,
	db: PopupDatabase,
	gs: GlobalSettings,
): number {
	const cardLeft = extractCard(left)
	const cardRight = extractCard(right)
	console.log(cardLeft)
	const leftXp = cardLeft !== null ? findXp(cardLeft, db, gs) : 0
	const rightXp = cardRight !== null ? findXp(cardRight, db, gs) : 0
	return rightXp - leftXp
}

function findXp(card: string, db: PopupDatabase, gs: GlobalSettings): number {
	const c = db.getById(card)
	if (c !== null) {
		return (c.xp ?? 0) + (gs.taboo ? c.xpat : 0)
	} else {
		return 0
	}
}

/**
 * Returns `null` if not a card.
 */
function extractCard(s: string): string | null {
	const captureCardId = new RegExp(/\(\/card\/([^)]*)\)/gm)
	s.match(captureCardId)
	const result = captureCardId.exec(s)
	if (result === null) {
		return null
	}
	console.log(result)
	return result[1]
}
