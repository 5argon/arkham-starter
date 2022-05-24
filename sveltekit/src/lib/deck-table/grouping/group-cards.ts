import type { FullDatabase, FullDatabaseItem } from '$lib/core/full-database'
import { isEntry, type DecklistEntry, type GroupedCards } from '../decklist-entry'
import { Grouping } from '../grouping'

export function groupCards(
	entries: DecklistEntry[],
	groupings: Grouping[],
	fdb: FullDatabase,
): GroupedCards[] {
	const gc: GroupedCards = {
		groupName: null,
		entries: entries,
	}
	function vis(v: DecklistEntry | GroupedCards): v is GroupedCards {
		return !isEntry(v)
	}
	return groupCardsOneGroup(gc, groupings, 0, fdb).filter<GroupedCards>(vis)
}

interface WithCard {
	card: FullDatabaseItem
	dle: DecklistEntry
}

function groupCardsOneGroup(
	gc: GroupedCards,
	groupings: Grouping[],
	index: number,
	fdb: FullDatabase,
): (DecklistEntry | GroupedCards)[] {
	if (index >= groupings.length) {
		return gc.entries
	}
	const grouping = groupings[index]
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
	let groups: GroupedCards[]
	switch (grouping) {
		case Grouping.Set: {
			// Get all unique sets
			const st: { [k: number]: { entries: DecklistEntry[]; packName: string } } = {}
			cs.forEach((x) => {
				const sn: number = x.card.packIcon
				if (!(sn in st)) {
					st[sn] = { entries: [], packName: '' }
				}
				st[sn].entries.push(x.dle)
				st[sn].packName = x.card.packNameTransformed ?? x.card.original.pack_name
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
		default: {
			groups = [{ groupName: null, entries: entries }]
		}
	}
	// We have groups of entries now, but it maybe possible to group yet again and replace those
	// entries as more groups.
	return groups.map<GroupedCards>((x) => {
		return {
			groupName: x.groupName,
			entries: groupCardsOneGroup(x, groupings, index + 1, fdb),
		}
	})
}
