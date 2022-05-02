<script lang="ts">
	import type { Row as TRow, Column as TColumn } from '$lib/doc-tools/upgrade/interface';
	import Row from './row.svelte';
	import Toolbar from './toolbar.svelte';
	export let rows: TRow[];
	export let columns: TColumn[];
</script>

<table>
	<Toolbar />
	{#each rows as r}
		<Row row={r} cols={columns} />
	{/each}
</table>
