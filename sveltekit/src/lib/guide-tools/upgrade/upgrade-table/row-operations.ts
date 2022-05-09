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
	return rows
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
	console.log(target)
	if (right) {
		const a = rows[target].right
		rows[target].right = rows[index].right
		rows[index].right = a
	} else {
		const a = rows[target].left
		rows[target].left = rows[index].left
		rows[index].left = a
	}
	return rows
}

export function addRow(rows: Row[], add: string, right: boolean): Row[] {
	const newRow = createRow(false)
	if (right) {
		newRow.right = add
	} else {
		newRow.left = add
	}
	rows.push(newRow)
	return rows
}

export function createRow(divider: boolean): Row {
	return {
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
