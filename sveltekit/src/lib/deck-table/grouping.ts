export enum Grouping {
	Set,
	Class,
	Type,
	Slot,
}

export enum Sorting {
	Name,
	Number,
	Type,
	Class,
}

export enum ExtraColumn {
	Label,
	Icons,
	Cost,
	Set,
	Traits,
}

export function extraColumnToHeader(c: ExtraColumn): string {
	switch (c) {
		case ExtraColumn.Label:
			return ''
		case ExtraColumn.Cost:
			return 'Cost'
		case ExtraColumn.Icons:
			return 'Icons'
		case ExtraColumn.Set:
			return 'Set'
		case ExtraColumn.Traits:
			return 'Traits'
		default:
			return ''
	}
}
