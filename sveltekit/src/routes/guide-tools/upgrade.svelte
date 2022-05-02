<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import {
		type UpgradeTableData,
		type Row,
		type Column,
		Alignment,
		ColumnSpecial
	} from '$lib/doc-tools/upgrade/interface';
	import UpgradeTable from '$lib/doc-tools/upgrade/upgrade-table/table.svelte';
	let columns: Column[] = [
		{ title: '', alignment: Alignment.Left, prefix: '', suffix: '', special: ColumnSpecial.None },
		{
			title: '',
			alignment: Alignment.Left,
			prefix: '',
			suffix: '',
			special: ColumnSpecial.LeftSide
		},
		{
			title: '',
			alignment: Alignment.Center,
			prefix: '　→　',
			suffix: '',
			special: ColumnSpecial.Arrow
		},
		{
			title: '',
			alignment: Alignment.Left,
			prefix: '',
			suffix: '',
			special: ColumnSpecial.RightSide
		},
		{ title: '', alignment: Alignment.Right, prefix: '', suffix: 'XP', special: ColumnSpecial.Xp },
		{ title: '', alignment: Alignment.Right, prefix: '', suffix: 'XP', special: ColumnSpecial.Xp }
	];
	let rows: Row[] = [
		{ data: ['', 'Hello', '', 'World', '1', '2'] },
		{ data: ['', 'Hello1', '', 'World', '1', '2'] },
		{ data: ['', 'Hello2', '', 'World', '1', '2'] },
		{ data: ['', 'Hello3', '', 'World', '1', '2'] }
	];
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
	<UpgradeTable {rows} {columns}/>
	<input type="button" value="Export" />
</section>
<section id="section-export">
	<h1>Export</h1>
	<textarea name="export-textarea" />
</section>
