<script lang="ts">
	import type { PopupDatabase } from '$lib/core/popup-database'

	import Button from '$lib/design/components/basic/Button.svelte'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import type { GlobalSettings } from '$lib/proto/generated/global_settings'
	import type { ToolbarEvents } from '$lib/tool/upgrade/upgrade-table/table-events'
	export let toolbarEvents: ToolbarEvents
	export let pdb: PopupDatabase
	export let gs: GlobalSettings
</script>

<div>You can drag and drop to reposition a card individually.</div>
<div>
	<Button label="Add Card Row" onClick={toolbarEvents.onAddCardRow} />
	<Button label="Add Divider Row" onClick={toolbarEvents.onAddDividerRow} />
	<Button label="Reset" onClick={toolbarEvents.onClear} />
	<Button label="Export" onClick={() => toolbarEvents.onExportMarkdown(pdb)} />
	<Checkbox
		checked={gs.taboo}
		label={'Use Latest Taboo'}
		onCheckChanged={(c) => toolbarEvents.onTabooToggle(c)}
	/>
</div>
