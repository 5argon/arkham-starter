import type { Row } from '../interface'
import type { RowEditEvents, TableRowActionEvents, TableRowEditEvents } from './row-events'
import type { ToolbarEvents } from './table-events'

export interface UpgradeTableData {
	rows: Row[]
	toolbarEvents: ToolbarEvents
	rowActionEvents?: TableRowActionEvents
	rowEditEvents?: TableRowEditEvents
}

export function createRow(): Row {
	return {
		carryoverXp: 0,
		divider: false,
		dividerText: '',
		dividerXpCumulativeUnlock: false,
		left: '',
		mark: '',
		right: '',
		xp: 0,
		xpUnlock: false,
	}
}

export function createTableData(): UpgradeTableData {
	let rows: Row[] = []
	const toolbarEvents: ToolbarEvents = {
		onAddBottom: () => {
			rows = [...rows, createRow()]
		},
		onAddTop: () => {
			rows = [createRow(), ...rows]
		},
		onClear: () => {
			rows = []
		},
	}

	return {
		rows: rows,
		toolbarEvents: toolbarEvents,
	}
}
