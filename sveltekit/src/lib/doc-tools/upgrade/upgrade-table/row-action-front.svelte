<script lang="ts">
	import RowActionUpDown from './row-action-up-down.svelte'

	export let divider: boolean
	export let onInsertTop: () => void
	export let onInsertBottom: () => void
	export let onDelete: () => void
</script>

<td>
	<input type="checkbox" checked={divider} />
	<input type="button" value="AU" on:click={onInsertTop} />
	<input type="button" value="AD" on:click={onInsertBottom}/>
	<input type="button" value="X" on:click={onDelete} />
</td>
<RowActionUpDown />
