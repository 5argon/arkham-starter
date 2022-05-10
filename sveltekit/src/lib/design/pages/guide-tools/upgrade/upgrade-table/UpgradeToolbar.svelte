<script lang="ts">
	import type { PopupDatabase } from '$lib/core/popup-database'

	import Button from '$lib/design/components/basic/Button.svelte'
	import type { ToolbarEvents } from '$lib/guide-tools/upgrade/upgrade-table/table-events'
	export let toolbarEvents: ToolbarEvents
	export let pdb: PopupDatabase
</script>

<div>You can drag and drop to reposition a card individually.</div>
<div>
	<Button label="Add Card Row" onClick={toolbarEvents.onAddCardRow} />
	<Button label="Add Divider Row" onClick={toolbarEvents.onAddDividerRow} />
	<Button label="Reset" onClick={toolbarEvents.onClear} />
	<Button label="Export Markdown" onClick={() => toolbarEvents.onExportMarkdown(pdb)} />
</div>
