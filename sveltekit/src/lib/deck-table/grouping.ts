export enum Grouping {
	Set = 1,
	Class = 2,
	Type = 3,
}

export enum Sorting {
	Number = 1,
	Class = 2,
	Set = 3,
	Type = 4,
	Name = 5,
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
