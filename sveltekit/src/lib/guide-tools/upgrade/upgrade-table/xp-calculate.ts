import type { PopupDatabase } from '$lib/core/popup-database'
import type { GlobalSettings, Row } from '../interface'

export interface CalculatedXp {
	costs: number[]
	cumulatives: number[]
}

export function calculateXps(db: PopupDatabase, rows: Row[], gs: GlobalSettings): CalculatedXp {
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
	return {
		costs: costs,
		cumulatives: cumulatives,
	}
}

/**
 * Returns 0 XP if card not found or not a card.
 */
function findXpDifference(
	cardLeft: string | null,
	cardRight: string | null,
	db: PopupDatabase,
	gs: GlobalSettings,
): number {
	if (cardLeft === null && cardRight === null) {
		return 0
	}
	let leftXp = 0
	let rightXp = 0
	if (cardLeft !== null) {
		const leftC = extractCard(cardLeft)
		leftXp = leftC !== null ? findXp(leftC, db, gs) : 0
	}
	if (cardRight !== null) {
		const rightC = extractCard(cardRight)
		rightXp = rightC !== null ? findXp(rightC, db, gs) : 0
	}
	if (cardRight !== null && cardLeft === null) {
		return rightXp
	} else if (cardRight === null && cardLeft !== null) {
		return 0
	} else {
		return Math.max(1, rightXp - leftXp)
	}
}

function findXp(card: string, db: PopupDatabase, gs: GlobalSettings): number {
	const c = db.getById(card)
	if (c !== null) {
		return ((c.xp ?? 0) + (gs.taboo ? c.xpat : 0)) * (c.ex || c.ext ? 2 : 1)
	} else {
		return 0
	}
}

/**
 * Returns `null` if not a card.
 */
function extractCard(s: string): string | null {
	const captureCardId = new RegExp(/\(\/card\/([^)]*)\)/gm)
	const result = captureCardId.exec(s)
	if (result === null) {
		return null
	}
	console.log(result)
	return result[1]
}
