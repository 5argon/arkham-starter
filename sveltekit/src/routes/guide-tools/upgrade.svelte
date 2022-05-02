<script context="module" lang="ts" xmlns="http://www.w3.org/1999/html">
	export const prerender = true
</script>

<script lang="ts">
	import { columns } from '$lib/doc-tools/upgrade/upgrade-table/constants'
	import type { Row } from '$lib/doc-tools/upgrade/interface'
	import UpgradeTable from '$lib/doc-tools/upgrade/upgrade-table/table.svelte'

	let rows: Row[] = [
		{
			mark: '',
			left: 'Hello',
			right: 'World',
			xp: 1,
			divider: false,
			dividerText: '',
			carryoverXp: 1,
			xpUnlock: false,
			dividerXpCumulativeUnlock: false,
		},
		{
			mark: '',
			left: 'Hello1',
			right: 'World1',
			xp: 2,
			divider: true,
			dividerText: '',
			carryoverXp: 1,
			xpUnlock: false,
			dividerXpCumulativeUnlock: true,
		},
		{
			mark: '',
			left: 'Hello2',
			right: 'World2',
			xp: 3,
			divider: false,
			dividerText: '',
			carryoverXp: 1,
			xpUnlock: false,
			dividerXpCumulativeUnlock: false,
		},
		{
			mark: '',
			left: 'Hello3',
			right: 'World3',
			xp: 4,
			divider: false,
			dividerText: '',
			carryoverXp: 1,
			xpUnlock: true,
			dividerXpCumulativeUnlock: false,
		},
		{
			mark: '',
			left: 'Hello4',
			right: 'World4',
			xp: 5,
			divider: false,
			dividerText: '',
			carryoverXp: 1,
			xpUnlock: false,
			dividerXpCumulativeUnlock: false,
		},
	]
</script>

<svelte:head>
	<title>Upgrade</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section id="section-import">
	<h1>Import</h1>
	<textarea name="import-textarea" />
	<input type="button" value="Import" />
</section>
<section id="section-table">
	<h1>Table</h1>
	<UpgradeTable {rows} {columns} />
	<input type="button" value="Export" />
</section>
<section id="section-export">
	<h1>Export</h1>
	<textarea name="export-textarea" />
</section>
