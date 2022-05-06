<script lang="ts">
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import CardBlockButton from '$lib/design/components/card/CardBlockButton.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import RowActionUpDown from './RowActionUpDown.svelte'

	export let divider: boolean
	export let onToggle: (e: boolean) => void
	export let onInsertTop: () => void
	export let onInsertBottom: () => void
	export let onDelete: () => void
	export let onMoveRowUp: () => void
	export let onMoveRowDown: () => void
</script>

<td>
	<Checkbox
		label="Toggle divider row"
		checked={divider}
		iconImagePath={allIcons.collapse}
		onCheckChanged={onToggle}
	/>
	<CardBlockButton label="Insert a new row above" iconPath={allIcons.arrowUp} onClick={onInsertTop} />
	<CardBlockButton
		label="Insert a new row below"
		iconPath={allIcons.arrowDown}
		onClick={onInsertBottom}
	/>
	<CardBlockButton label="Delete row" iconPath={allIcons.delete} onClick={onDelete} />
</td>
<RowActionUpDown onClickUp={onMoveRowUp} onClickDown={onMoveRowDown} />
