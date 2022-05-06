<script lang="ts">
	import RowActionUpDown from './row-action-up-down.svelte'

	export let divider: boolean
	export let onToggle: (e: boolean) => void
	export let onInsertTop: () => void
	export let onInsertBottom: () => void
	export let onDelete: () => void

	function handler(e: Event & { currentTarget: HTMLInputElement }) {
		onToggle(e.currentTarget.checked)
	}
</script>

<td>
	<input type="checkbox" checked={divider} on:change={handler} />
	<input type="button" value="AU" on:click={onInsertTop} />
	<input type="button" value="AD" on:click={onInsertBottom} />
	<input type="button" value="X" on:click={onDelete} />
</td>
<RowActionUpDown />
