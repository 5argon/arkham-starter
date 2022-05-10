<script lang="ts">
	import Button from '$lib/design/components/basic/Button.svelte'
	import type { ToolbarEvents } from '$lib/guide-tools/upgrade/upgrade-table/table-events'
	export let toolbarEvents: ToolbarEvents
</script>

<div>
	You can drag and drop to reposition the cards.
</div>
<div>
	<Button label="Add Card Row" onClick={toolbarEvents.onAddCardRow} />
	<Button label="Add Divider Row" onClick={toolbarEvents.onAddDividerRow} />
	<Button label="Reset" onClick={toolbarEvents.onClear} />
	<Button label="Export Markdown" onClick={toolbarEvents.onExportMarkdown} />
</div>
