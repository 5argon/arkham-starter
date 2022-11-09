import { isRandomBasicWeakness } from '$lib/ahdb/card'
import { classConversion } from '$lib/ahdb/conversion'
import { CardPack } from '$lib/core/card-pack'
import type { FullDatabase, FullDatabaseItem } from '$lib/core/full-database'
import { isEntry, type DecklistEntry, type GroupedCards } from '../decklist-entry'
import { Grouping, Sorting } from '../grouping'
import {
	classesScore,
	multipleSlotsString,
	nonAssetString,
	noSlotString,
	slotScore,
	sortCards,
	topLevelTypeScore,
	typeScore,
} from './sort-cards'

export function groupCards(
	entries: DecklistEntry[],
	groupings: Grouping[],
	sortings: Sorting[],
	fdb: FullDatabase,
): GroupedCards[] {
	const gc: GroupedCards = {
		groupName: null,
		entries: entries,
	}
	function vis(v: DecklistEntry | GroupedCards): v is GroupedCards {
		return !isEntry(v)
	}
	return groupCardsOneGroup(gc, groupings, sortings, 0, fdb).filter<GroupedCards>(vis)
}

export interface WithCard {
	card: FullDatabaseItem
	dle: DecklistEntry
}

function typeCodeTransform(
	typeCode: string,
	subtypeCode: string | undefined,
	permanent: boolean,
): string {
	if (permanent) {
		return 'Permanent Asset'
	}
	switch (subtypeCode) {
		case 'weakness': {
			return 'Weakness'
		}
		case 'basicweakness': {
			return 'Weakness'
		}
	}

	switch (typeCode) {
		case 'asset': {
			return 'Asset'
		}
		case 'event': {
			return 'Event'
		}
		case 'skill': {
			return 'Skill'
		}
		case 'enemy': {
			return 'Enemy'
		}
		case 'treachery': {
			return 'Treachery'
		}
	}
	return 'Others'
}

function groupCardsOneGroup(
	gc: GroupedCards,
	groupings: Grouping[],
	sortings: Sorting[],
	index: number,
	fdb: FullDatabase,
): (DecklistEntry | GroupedCards)[] {
	const entries = gc.entries
	const cs = entries.map<WithCard>((x) => {
		if (isEntry(x)) {
			const c = fdb.getCard(x.cardId)
			return {
				card: c,
				dle: x,
			}
		}
		throw new Error('Should be all entries at this point.')
	})
	if (index >= groupings.length) {
		// When it runs out of group, it is time to sort.
		const sorted = sortCards(cs, sortings)
		if (groupings.length === 0) {
			const fakeGroup: GroupedCards = {
				groupName: null,
				entries: sorted,
			}
			return [fakeGroup]
		} else {
			return sorted
		}
	}
	const grouping = groupings[index]
	let groups: GroupedCards[]
	switch (grouping) {
		case Grouping.Set: {
			const st: { [k: number]: { entries: DecklistEntry[]; packName: string } } = {}
			cs.forEach((x) => {
				const rbw = isRandomBasicWeakness(x.card.original.code)
				const sn: number = rbw ? CardPack.RandomBasicWeakness : x.card.packIcon
				if (!(sn in st)) {
					st[sn] = { entries: [], packName: '' }
				}
				st[sn].entries.push(x.dle)
				if (rbw) {
					st[sn].packName = 'Random Basic Weakness'
				} else {
					st[sn].packName = x.card.packNameTransformed ?? x.card.original.pack_name
				}
			})
			const sorted = Object.entries(st)
				.sort(([k], [k2]) => {
					return parseInt(k) - parseInt(k2)
				})
				.map<GroupedCards>(([, v]) => {
					return {
						entries: v.entries,
						groupName: v.packName,
					}
				})
			groups = sorted
			break
		}
		case Grouping.Type: {
			const st: { [k: string]: { entries: DecklistEntry[]; typeName: string } } = {}
			cs.forEach((x) => {
				const sn: string = typeCodeTransform(
					x.card.original.type_code,
					x.card.original.subtype_code,
					x.card.original.permanent,
				)
				if (!(sn in st)) {
					st[sn] = { entries: [], typeName: '' }
				}
				st[sn].entries.push(x.dle)
				st[sn].typeName = sn
			})
			const sorted = Object.entries(st)
				.sort(([k], [k2]) => {
					return topLevelTypeScore(k) - topLevelTypeScore(k2)
				})
				.map<GroupedCards>(([, v]) => {
					return {
						entries: v.entries,
						groupName: v.typeName,
					}
				})
			groups = sorted
			break
		}
		case Grouping.Slot: {
			const st: { [k: string]: { entries: DecklistEntry[]; slotName: string } } = {}
			cs.forEach((x) => {
				const slot = x.card.original.real_slot
				let sn = noSlotString
				if (x.card.original.type_code !== 'asset') {
					sn = nonAssetString
				} else if (slot !== '' && slot !== undefined) {
					if (slot.includes('.')) {
						sn = multipleSlotsString
					} else {
						sn = slot
					}
				}
				if (!(sn in st)) {
					st[sn] = { entries: [], slotName: '' }
				}
				st[sn].entries.push(x.dle)
				st[sn].slotName = sn
			})
			const sorted = Object.entries(st)
				.sort(([k], [k2]) => {
					return slotScore(k) - slotScore(k2)
				})
				.map<GroupedCards>(([, v]) => {
					return {
						entries: v.entries,
						groupName: v.slotName,
					}
				})
			groups = sorted
			break
		}
		case Grouping.Class: {
			const st: { [k: string]: { entries: DecklistEntry[]; className: string } } = {}
			const multi = 'multi'
			cs.forEach((x) => {
				let sn: string
				const isMulti = x.card.original.faction2_code || x.card.original.faction3_code
				if (isMulti) {
					sn = multi
				} else {
					sn = x.card.original.faction_code
				}
				if (!(sn in st)) {
					st[sn] = { entries: [], className: '' }
				}
				st[sn].entries.push(x.dle)
				st[sn].className = isMulti ? 'Multi-class' : x.card.original.faction_name
			})
			const sorted = Object.entries(st)
				.sort(([k], [k2]) => {
					const sc1 = classesScore(classConversion(k), undefined, undefined)
					const sc2 = classesScore(classConversion(k2), undefined, undefined)
					return sc1 - sc2
				})
				.map<GroupedCards>(([, v]) => {
					return {
						entries: v.entries,
						groupName: v.className,
					}
				})
			groups = sorted
			break
		}
		case Grouping.Level: {
			const st: { [k: number]: { entries: DecklistEntry[]; level: number } } = {}
			const undefinedXp = -99
			cs.forEach((x) => {
				const sn: number = x.card.original.xp ?? undefinedXp
				if (!(sn in st)) {
					st[sn] = { entries: [], level: sn }
				}
				st[sn].entries.push(x.dle)
				st[sn].level = sn
			})
			const sorted = Object.entries(st)
				.sort(([k], [k2]) => {
					return parseInt(k) - parseInt(k2)
				})
				.map<GroupedCards>(([, v]) => {
					return {
						entries: v.entries,
						groupName: v.level === undefinedXp ? 'Level -' : 'Level ' + v.level,
					}
				})
			groups = sorted
			break
		}
		case Grouping.Level015: {
			const st: { [k: number]: { entries: DecklistEntry[]; level: number } } = {}
			const undefinedXp = -99
			const level15 = 15
			cs.forEach((x) => {
				const actualLevel: number = x.card.original.xp ?? undefinedXp
				let groupingLevel: number = x.card.original.xp ?? undefinedXp
				switch (x.card.original.xp) {
					case undefined: {
						groupingLevel = undefinedXp
						break
					}
					case 0: {
						groupingLevel = 0
						break
					}
					default: {
						groupingLevel = level15
						break
					}
				}
				if (!(groupingLevel in st)) {
					st[groupingLevel] = { entries: [], level: groupingLevel }
				}
				st[groupingLevel].entries.push(x.dle)
				st[groupingLevel].level = actualLevel
			})
			const sorted = Object.entries(st)
				.sort(([, v], [, v2]) => {
					return v.level - v2.level
				})
				.map<GroupedCards>(([, v]) => {
					return {
						entries: v.entries,
						groupName:
							v.level === undefinedXp ? 'Level -' : v.level === 0 ? 'Level 0' : 'Level 1~5',
					}
				})
			groups = sorted
			break
		}
		default: {
			groups = [{ groupName: null, entries: entries }]
		}
	}
	// We have groups of entries now, but it maybe possible to group yet again and replace those
	// entries as more groups.
	return groups.map<GroupedCards>((x) => {
		return {
			groupName: x.groupName,
			entries: groupCardsOneGroup(x, groupings, sortings, index + 1, fdb),
		}
	})
}
