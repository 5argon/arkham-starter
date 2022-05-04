export interface TableRowActionEvents {
	onAddAbove: (i: number) => void
	onAddBelow: (i: number) => void
	onDelete: (i: number) => void
	onMoveUp: (i: number) => void
	onMoveDown: (i: number) => void
	onMoveUpLeft: (i: number) => void
	onMoveDownLeft: (i: number) => void
	onMoveUpRight: (i: number) => void
	onMoveDownRight: (i: number) => void
}

export interface TableRowEditEvents {
	onMarkChanged: (i: number, n: string) => void
	onLeftChanged: (i: number, n: string) => void
	onRightChanged: (i: number, n: string) => void
	onXpChanged: (i: number, n: number) => void
	onCarryoverXpChanged: (i: number, n: number) => void
	onXpLockChanged: (i: number, n: boolean) => void
	onXpCumulativeLockChanged: (i: number, n: boolean) => void
	onDividerChanged: (i: number, n: boolean) => void
	onDividerTextChanged: (i: number, n: string) => void
	onLoseFocus: (i: number) => void
}

export interface RowActionEvents {
	onAddAbove: () => void
	onAddBelow: () => void
	onDelete: () => void
	onMoveUp: () => void
	onMoveDown: () => void
	onMoveUpLeft: () => void
	onMoveDownLeft: () => void
	onMoveUpRight: () => void
	onMoveDownRight: () => void
}

export interface RowEditEvents {
	onMarkChanged: (n: string) => void
	onLeftChanged: (n: string) => void
	onRightChanged: (n: string) => void
	onXpChanged: (n: number) => void
	onCarryoverXpChanged: (n: number) => void
	onXpLockChanged: (n: boolean) => void
	onXpCumulativeLockChanged: (n: boolean) => void
	onDividerChanged: (n: boolean) => void
	onDividerTextChanged: (n: string) => void
	onLoseFocus: () => void
}
