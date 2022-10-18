import type { PopupDatabase } from '$lib/core/popup-database'
import type { GlobalSettings } from '$lib/proto/generated/global_settings'
import type { Row } from '../interface'

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
			costs.push(r.xp)
			cumulatives.push(cumulative)
		} else {
			if (r.xpUnlock) {
				cumulative += r.xp
				costs.push(r.xp)
				cumulatives.push(cumulative)
			} else {
				const customizing: number | false = r.custom ? r.customizationChoice : false
				const xp = findXpDifference(r.left, r.right, db, gs, customizing)
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
	customizing: number | false,
): number {
	if (cardLeft === null && cardRight === null) {
		return 0
	}
	let leftXp = 0
	let rightXp = 0
	let cn1: string | null = null
	let cn2: string | null = null
	if (cardLeft !== null) {
		leftXp = findXp(cardLeft, db, gs, false)
		cn1 = findCardName(cardLeft, db, gs)
	}
	if (cardRight !== null) {
		rightXp = findXp(cardRight, db, gs, customizing)
		cn2 = findCardName(cardRight, db, gs)
	}
	if (cardRight !== null && cardLeft === null) {
		return Math.max(1, rightXp)
	} else if (cardRight === null && cardLeft !== null) {
		return 0
	} else {
		if (cn1 !== null && cn2 !== null && cn1 === cn2) {
			return Math.max(1, rightXp - leftXp)
		} else {
			return Math.max(1, rightXp)
		}
	}
}

function findXp(
	card: string,
	db: PopupDatabase,
	gs: GlobalSettings,
	customizing: number | false,
): number {
	const c = db.getById(card)
	if (c !== null) {
		const cus = c.original.cus
		if (customizing !== false && cus !== undefined && customizing < cus.length) {
			const choice = cus[customizing]
			return choice.xp
		} else {
			return (
				((c.original.xp ?? 0) + (gs.taboo ? c.original.xpat : 0)) *
				(c.original.ex || (gs.taboo && c.original.ext) ? 2 : 1)
			)
		}
	} else {
		return 0
	}
}

function findCardName(card: string, db: PopupDatabase, gs: GlobalSettings): string | null {
	const c = db.getById(card)
	return c?.original.n ?? null
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
	return result[1]
}
