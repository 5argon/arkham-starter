import { expect, test } from 'vitest'
import type { Row } from '../interface'
import { createRow as cr } from './data'
import { oneSideMoveDown, oneSideMoveUp, rowMoveDown, rowMoveUp } from './row-operations'

function createRow(divider: boolean, seed: number): Row {
	const r = cr(divider)
	r.mark = seed.toString()
	r.left = 'L' + seed
	r.right = 'R' + seed
	return r
}
function createTestRows(): Row[] {
	const r0 = createRow(true, 0)
	const r1 = createRow(false, 1)
	const r2 = createRow(true, 2)
	const r3 = createRow(false, 3)
	const r4 = createRow(false, 4)
	const r5 = createRow(true, 5)
	const r6 = createRow(false, 6)
	const r7 = createRow(true, 7)
	return [r0, r1, r2, r3, r4, r5, r6, r7]
}

test('row down', () => {
	const rows = createTestRows()
	const newRows = rowMoveDown(rows, 3)
	expect(newRows.length).toBe(8)
	expect(newRows[3].mark).toBe('4')
	expect(newRows[4].mark).toBe('3')
})

test('row up', () => {
	const rows = createTestRows()
	const newRows = rowMoveUp(rows, 4)
	expect(newRows.length).toBe(8)
	expect(newRows[3].mark).toBe('4')
	expect(newRows[4].mark).toBe('3')
})

test('row down across divider', () => {
	const rows = createTestRows()
	const newRows = rowMoveDown(rows, 4)
	expect(newRows.length).toBe(8)
	expect(newRows[4].mark).toBe('5')
	expect(newRows[5].mark).toBe('4')
	expect(newRows[6].mark).toBe('6')
})

test('row up across divider', () => {
	const rows = createTestRows()
	const newRows = rowMoveUp(rows, 3)
	expect(newRows.length).toBe(8)
	expect(newRows[1].mark).toBe('1')
	expect(newRows[2].mark).toBe('3')
	expect(newRows[3].mark).toBe('2')
})

test('row down to edge divider', () => {
	const rows = createTestRows()
	const newRows = rowMoveDown(rows, 6)
	expect(newRows.length).toBe(8)
	expect(newRows[5].mark).toBe('5')
	expect(newRows[6].mark).toBe('7')
	expect(newRows[7].mark).toBe('6')
})

test('row up to edge divider', () => {
	const rows = createTestRows()
	const newRows = rowMoveUp(rows, 1)
	expect(newRows.length).toBe(8)
	expect(newRows[0].mark).toBe('1')
	expect(newRows[1].mark).toBe('0')
	expect(newRows[2].mark).toBe('2')
})

test('edge move up', () => {
	const rows = createTestRows()
	const newRows = rowMoveUp(rows, 0)
	expect(newRows.length).toBe(8)
	expect(newRows[0].mark).toBe('0')
	expect(newRows[1].mark).toBe('1')
	expect(newRows[2].mark).toBe('2')
})

test('edge move down', () => {
	const rows = createTestRows()
	const newRows = rowMoveDown(rows, 7)
	expect(newRows.length).toBe(8)
	expect(newRows[5].mark).toBe('5')
	expect(newRows[6].mark).toBe('6')
	expect(newRows[7].mark).toBe('7')
})

test('divider move down', () => {
	const rows = createTestRows()
	const newRows = rowMoveDown(rows, 2)
	expect(newRows.length).toBe(8)
	expect(newRows[2].mark).toBe('3')
	expect(newRows[3].mark).toBe('2')
})

test('divider move up', () => {
	const rows = createTestRows()
	const newRows = rowMoveUp(rows, 2)
	expect(newRows.length).toBe(8)
	expect(newRows[1].mark).toBe('2')
	expect(newRows[2].mark).toBe('1')
})

test('side row down', () => {
	const rows = createTestRows()
	const newRows = oneSideMoveDown(rows, 3, false)
	expect(newRows.length).toBe(8)
	expect(newRows[3].mark).toBe('3')
	expect(newRows[4].mark).toBe('4')
	expect(newRows[3].left).toBe('L4')
	expect(newRows[4].left).toBe('L3')
})

test('side row up', () => {
	const rows = createTestRows()
	const newRows = oneSideMoveUp(rows, 4, false)
	expect(newRows.length).toBe(8)
	expect(newRows[3].mark).toBe('3')
	expect(newRows[4].mark).toBe('4')
	expect(newRows[3].left).toBe('L4')
	expect(newRows[4].left).toBe('L3')
})

test('side row down across divider', () => {
	const rows = createTestRows()
	const newRows = oneSideMoveDown(rows, 4, false)
	expect(newRows.length).toBe(8)
	expect(newRows[4].mark).toBe('4')
	expect(newRows[5].mark).toBe('5')
	expect(newRows[6].mark).toBe('6')
	expect(newRows[4].left).toBe('L6')
	expect(newRows[5].left).toBe('L5')
	expect(newRows[6].left).toBe('L4')
})

test('side row up across divider', () => {
	const rows = createTestRows()
	const newRows = oneSideMoveUp(rows, 3, false)
	expect(newRows.length).toBe(8)
	expect(newRows[1].mark).toBe('1')
	expect(newRows[2].mark).toBe('2')
	expect(newRows[3].mark).toBe('3')
	expect(newRows[1].left).toBe('L3')
	expect(newRows[2].left).toBe('L2')
	expect(newRows[3].left).toBe('L1')
})

test('side row down to edge divider', () => {
	// Moving single side can't do anything with divider at the edge.
	const rows = createTestRows()
	const newRows = oneSideMoveDown(rows, 6, false)
	expect(newRows.length).toBe(8)
	expect(newRows[5].mark).toBe('5')
	expect(newRows[6].mark).toBe('6')
	expect(newRows[7].mark).toBe('7')
	expect(newRows[5].left).toBe('L5')
	expect(newRows[6].left).toBe('L6')
	expect(newRows[7].left).toBe('L7')
})

test('side row up to edge divider', () => {
	// Moving single side can't do anything with divider at the edge.
	const rows = createTestRows()
	const newRows = oneSideMoveUp(rows, 1, false)
	expect(newRows.length).toBe(8)
	expect(newRows[0].mark).toBe('0')
	expect(newRows[1].mark).toBe('1')
	expect(newRows[2].mark).toBe('2')
	expect(newRows[0].left).toBe('L0')
	expect(newRows[1].left).toBe('L1')
	expect(newRows[2].left).toBe('L2')
})

test('side edge move up', () => {
	const rows = createTestRows()
	const newRows = oneSideMoveUp(rows, 0, false)
	expect(newRows.length).toBe(8)
	expect(newRows[0].mark).toBe('0')
	expect(newRows[1].mark).toBe('1')
	expect(newRows[2].mark).toBe('2')
	expect(newRows[0].left).toBe('L0')
	expect(newRows[1].left).toBe('L1')
	expect(newRows[2].left).toBe('L2')
})

test('side edge move down', () => {
	const rows = createTestRows()
	const newRows = oneSideMoveDown(rows, 7, false)
	expect(newRows.length).toBe(8)
	expect(newRows[5].mark).toBe('5')
	expect(newRows[6].mark).toBe('6')
	expect(newRows[7].mark).toBe('7')
	expect(newRows[5].left).toBe('L5')
	expect(newRows[6].left).toBe('L6')
	expect(newRows[7].left).toBe('L7')
})
