<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { Column, Row } from '$lib/doc-tools/upgrade/interface';
	import EditableCell from './editable-cell.svelte';
	export let row: Row;
	export let cols: Column[];
</script>

<tr>
	<td>
		<input type="button" value="AU" />
		<input type="button" value="AD" />
		<input type="button" value="X" />
		<input type="button" value="U" />
		<input type="button" value="D" />
	</td>
	{#each cols as c, i}
		{#if i < row.data.length}
			<td>
				<EditableCell currentText={row.data[i]} prefixText={c.prefix} suffixText={c.suffix} />
			</td>
		{/if}
	{/each}
</tr>
