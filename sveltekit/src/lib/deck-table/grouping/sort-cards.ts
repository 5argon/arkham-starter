import type { CardClass } from '$lib/core/card-class'
import type { DecklistEntry } from '../decklist-entry'
import { Sorting } from '../grouping'
import type { WithCard } from './group-cards'

export function sortCards(entries: WithCard[], sortings: Sorting[]): DecklistEntry[] {
	const e = [...entries]
	const sortingLength = sortings.length
	e.sort((a, b) => {
		for (let i = 0; i < sortingLength; i++) {
			const s = sortings[i]
			const result = vs(a, b, s)
			// console.log(a.card.original.name, b.card.original.name, result)
			if (result !== 0) {
				return result
			} else {
				continue
			}
		}
		return 0
	})
	const ret = e.map((x) => x.dle)
	return ret
}

function vs(a: WithCard, b: WithCard, s: Sorting): number {
	switch (s) {
		case Sorting.Number: {
			return a.card.original.position - b.card.original.position
		}
		case Sorting.Class: {
			return (
				classesScore(a.card.class1, a.card.class2, a.card.class3) -
				classesScore(b.card.class1, b.card.class2, b.card.class3)
			)
		}
		case Sorting.Type: {
			return (
				typeScore(a.card.original.type_code, a.card.original.subtype_code) -
				typeScore(b.card.original.type_code, b.card.original.subtype_code)
			)
		}
		case Sorting.Name: {
			return a.card.original.name.localeCompare(b.card.original.name)
		}
		case Sorting.Set: {
			return a.card.packIcon - b.card.packIcon
		}
		case Sorting.Level : {
			const undefinedXp = -99
			return (a.card.original.xp ?? undefinedXp) - (b.card.original.xp ?? undefinedXp)
		}
		default: {
			return 0
		}
	}
}

export function classesScore(
	a: CardClass | undefined,
	b: CardClass | undefined,
	c: CardClass | undefined,
): number {
	const total = classScore(a, 0) | classScore(b, 1) | classScore(c, 2)
	// Have fewer class count always win.
	let bonusShift = 3
	if (b === undefined && c === undefined) {
		bonusShift = 2
	} else if (b !== undefined && c === undefined) {
		bonusShift = 1
	}
	// console.log(a,b,c,total)
	return total << bonusShift
}

function classScore(c: CardClass | undefined, pos: number): number {
	if (c === undefined) {
		return 0 << (pos * 3)
	}
	return (c + 1) << (pos * 3)
}

export function typeScore(typeCode: string, subtypeCode: string | undefined): number {
	switch (typeCode) {
		case 'asset':
			return 1 << 3
		case 'event':
			return 2 << 3
		case 'skill':
			return 3 << 3
		default:
			return 4 << 3
	}
}

export function topLevelTypeScore(typeCode: string): number {
	switch (typeCode) {
		case 'Asset':
			return 1 << 3
		case 'Event':
			return 2 << 3
		case 'Skill':
			return 3 << 3
		case 'Permanent':
			return 4 << 3
		case 'Weakness':
			return 5 << 3
		default:
			return 6 << 3
	}
}

export const multipleSlotsString = "Multiple Slots"
export const noSlotString= "No Slot"
export const nonAssetString = "Non-Asset"

export function slotScore(slot: string): number {
	switch (slot) {
		case 'Hand':
			return 1 << 4
		case 'Hand x2':
			return 2 << 4
		case 'Arcane':
			return 3 << 4
		case 'Arcane x2':
			return 4 << 4
		case 'Accessory':
			return 5 << 4
		case 'Body':
			return 6 << 4
		case 'Ally':
			return 7 << 4
		case multipleSlotsString:
			return 8 << 4
		case noSlotString:
			return 9 << 4
		case nonAssetString:
			return 10 << 4
		default:
			return 11 << 4
	}
}
