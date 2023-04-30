export enum Grouping {
	Set = 1,
	Class = 2,
	Type = 3,
	Level = 4,
	Level015 = 5,
	Slot = 6,
	EffectiveIcons = 7,
}

export enum Sorting {
	Number = 1,
	Class = 2,
	Set = 3,
	Type = 4,
	Name = 5,
	Level = 6,
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
			return ''
		case ExtraColumn.Icons:
			return ''
		case ExtraColumn.Set:
			return ''
		case ExtraColumn.Traits:
			return ''
		default:
			return ''
	}
}
