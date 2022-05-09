export interface TableEvents {
	onAddRow: () => void
	onAddDivider: () => void
	onClearAll: () => void
}

export interface TableRowActionEvents {
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
	onXpLockChanged: (i: number, n: boolean, calc: number) => void
	onXpCumulativeLockChanged: (i: number, n: boolean, calc: number) => void
	onDividerChanged: (i: number, n: boolean) => void
	onDividerTextChanged: (i: number, n: string) => void
	onLoseFocus: (i: number) => void
}

export interface RowActionEvents {
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
	onXpLockChanged: (n: boolean, calc: number) => void
	onXpCumulativeLockChanged: (n: boolean, calc: number) => void
	onDividerChanged: (n: boolean) => void
	onDividerTextChanged: (n: string) => void
	onLoseFocus: () => void
}

export function createEmptyRowActionEvents(): RowActionEvents {
	return {
		onDelete: () => {
			// do nothing
		},
		onMoveUp: () => {
			// do nothing
		},
		onMoveDown: () => {
			// do nothing
		},
		onMoveUpLeft: () => {
			// do nothing
		},
		onMoveDownLeft: () => {
			// do nothing
		},
		onMoveUpRight: () => {
			// do nothing
		},
		onMoveDownRight: () => {
			// do nothing
		},
	}
}

export function createEmptyRowEditEvents(): RowEditEvents {
	return {
		onMarkChanged: (n: string) => {
			// do nothing
		},
		onLeftChanged: (n: string) => {
			// do nothing
		},
		onRightChanged: (n: string) => {
			// do nothing
		},
		onXpChanged: (n: number) => {
			// do nothing
		},
		onCarryoverXpChanged: (n: number) => {
			// do nothing
		},
		onXpLockChanged: (n: boolean) => {
			// do nothing
		},
		onXpCumulativeLockChanged: (n: boolean) => {
			// do nothing
		},
		onDividerChanged: (n: boolean) => {
			// do nothing
		},
		onDividerTextChanged: (n: string) => {
			// do nothing
		},
		onLoseFocus: () => {
			// do nothing
		},
	}
}
