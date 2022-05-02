<script lang="ts">
	import RowActionUpDown from './row-action-up-down.svelte';
	export let divider: boolean;
</script>

<td>
	<input type="checkbox" checked={divider} />
	<input type="button" value="AU" />
	<input type="button" value="AD" />
	<input type="button" value="X" />
</td>
<RowActionUpDown />
