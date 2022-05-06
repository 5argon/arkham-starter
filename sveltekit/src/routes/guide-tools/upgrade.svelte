<script context="module" lang="ts" xmlns="http://www.w3.org/1999/html">
	export const prerend$lib/guide-tools/upgrade/upgrade-table/constantst { columns } from '$lib/gui$lib/guide-tools/upgrade/interfaceonstants'
	import type { Row } from '$lib/guide-tools/upgrade/interface'
	import UpgradeTable from '$lib/guide$lib/guide-tools/upgrade/upgrade-table/data	import { createRow } from '$lib/guide$lib/guide-tools/upgrade/upgrade-table/table-eventsoolbarEvents } from '$lib/guide-tools/upgra$lib/guide-tools/upgrade/upgrade-table/row-eventsleRowEditEvents } from '$lib/guide-tools/upgrade/upgrade-table/row-events'
	import { fetchPopupDatabase } from '$lib/popup-database'

	const pdb = fetchPopupDatabase()

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

	const rowEditEvents: TableRowEditEvents = {
		onMarkChanged: (i, n) => {},
		onLeftChanged: (i, n) => {
			console.log("lc")
			rows[i].left = n
		},
		onRightChanged: (i, n) => {
			console.log("rc")
			rows[i].right = n
		},
		onXpChanged: (i, n) => {},
		onCarryoverXpChanged: (i, n) => {},
		onXpLockChanged: (i, n) => {
			rows[i].xpUnlock = n
		},
		onXpCumulativeLockChanged: (i, n) => {
			rows[i].dividerXpCumulativeUnlock = n
		},
		onDividerChanged: (i, n) => {
			rows[i].divider = n
		},
		onDividerTextChanged: (i, n) => {},
		onLoseFocus: (i) => {},
	}

	// 	{
	// 		mark: '',
	// 		left: 'Hello',
	// 		right: 'World',
	// 		xp: 1,
	// 		divider: false,
	// 		dividerText: '',
	// 		carryoverXp: 1,
	// 		xpUnlock: false,
	// 		dividerXpCumulativeUnlock: false,
	// 	},
	// 	{
	// 		mark: '',
	// 		left: 'Hello1',
	// 		right: 'World1',
	// 		xp: 2,
	// 		divider: true,
	// 		dividerText: 'This is a divider',
	// 		carryoverXp: 1,
	// 		xpUnlock: false,
	// 		dividerXpCumulativeUnlock: true,
	// 	},
	// 	{
	// 		mark: '',
	// 		left: 'Hello2',
	// 		right: 'World2',
	// 		xp: 3,
	// 		divider: false,
	// 		dividerText: '',
	// 		carryoverXp: 1,
	// 		xpUnlock: false,
	// 		dividerXpCumulativeUnlock: false,
	// 	},
	// 	{
	// 		mark: '',
	// 		left: 'Hello3',
	// 		right: 'World3',
	// 		xp: 4,
	// 		divider: false,
	// 		dividerText: '',
	// 		carryoverXp: 1,
	// 		xpUnlock: true,
	// 		dividerXpCumulativeUnlock: false,
	// 	},
	// 	{
	// 		mark: '',
	// 		left: 'Hello4',
	// 		right: 'World4',
	// 		xp: 5,
	// 		divider: false,
	// 		dividerText: '',
	// 		carryoverXp: 1,
	// 		xpUnlock: false,
	// 		dividerXpCumulativeUnlock: false,
	// 	},
	// ]
</script>

<svelte:head>
	<title>Upgrade</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section id="section-import">
	<h1>Import</h1>
	<textarea name="import-textarea-left" />
	<input type="button" value="Import Left" />
	<textarea name="import-textarea-right" />
	<input type="button" value="Import Right" />
</section>
<section id="section-table">
	<h1>Table</h1>
	<UpgradeTable db={pdb} {rows} {toolbarEvents} {columns} {rowEditEvents} gs={{ taboo: true }} />
	<input type="button" value="Export" />
</section>
<section id="section-export">
	<h1>Export</h1>
	<textarea name="export-textarea" />
</section>
