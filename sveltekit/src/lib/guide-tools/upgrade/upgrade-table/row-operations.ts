import type { Row } from '$lib/guide-tools/upgrade/interface'

export function rowMoveDown(rows: Row[], index: number): Row[] {
	return rowMove(rows, index, 1)
}

export function rowMoveUp(rows: Row[], index: number): Row[] {
	return rowMove(rows, index, -1)
}

function rowMove(rows: Row[], index: number, moveBy: number): Row[] {
	index = Math.max(0, Math.min(rows.length - 1, index))
	const removed = rows.splice(index, 1)
	const target = Math.max(0, index + moveBy)
	rows.splice(target, 0, removed[0])
	const final = [...rows]
	return final
}

export function oneSideMoveDown(rows: Row[], index: number, right: boolean): Row[] {
	return oneSideMove(rows, index, right, 1)
}

export function oneSideMoveUp(rows: Row[], index: number, right: boolean): Row[] {
	return oneSideMove(rows, index, right, -1)
}

/**
 * Unlike row move, this goes over the divider to the next 2 sided row.
 */
function oneSideMove(rows: Row[], index: number, right: boolean, moveBy: number): Row[] {
	index = Math.max(0, Math.min(rows.length - 1, index))
	let target: number = index
	let i = index + moveBy
	while (i > 0 && i < rows.length) {
		const r = rows[i]
		if (!r.divider) {
			target = i
			break
		}
		i += moveBy
	}
	target = Math.max(0, target)
	if (right) {
		const a = rows[target].right
		rows[target].right = rows[index].right
		rows[index].right = a
	} else {
		const a = rows[target].left
		rows[target].left = rows[index].left
		rows[index].left = a
	}
	const final = [...rows]
	return final
}

function addRow(rows: Row[], add: string, right: boolean): Row[] {
	const newRow = createRow(false)
	if (right) {
		newRow.right = add
	} else {
		newRow.left = add
	}
	return [...rows, newRow]
}

export function addCardToList(rows: Row[], card: string, right: boolean): Row[] {
	if (rows.length > 0) {
		const foundIndex = rows.findIndex(
			(x) => x.divider === false && ((right && x.right === null) || (!right && x.left === null)),
		)

		if (foundIndex !== -1) {
			const found = rows[foundIndex]
			const target = found
			if (right) {
				rows[foundIndex] = { ...target, right: card }
				return [...rows]
			} else {
				rows[foundIndex] = { ...target, left: card }
				return [...rows]
			}
		}
	}
	return addRow(rows, card, right)
}

export function createRow(divider: boolean): Row {
	return {
		rowId: Math.random(),
		carryoverXp: 0,
		divider: divider,
		dividerText: '',
		dividerXpCumulativeUnlock: false,
		left: null,
		mark: '',
		right: null,
		xp: 0,
		xpUnlock: false,
	}
}
