<script lang="ts">
	import type { Row as TRow, AllColumns } from '$lib/doc-tools/upgrade/interface';
	import Row from './row.svelte';
	import Toolbar from './toolbar.svelte';
	export let rows: TRow[];
	export let columns: AllColumns;
</script>

<table>
	<Toolbar />
	{#each rows as r, i (r)}
		<Row row={r} cols={columns} divider={false} />
	{/each}
</table>
