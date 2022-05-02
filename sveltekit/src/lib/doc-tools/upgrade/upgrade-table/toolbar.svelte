<script lang="ts">
	import type { ToolbarEvents } from './table-events'
	export let toolbarEvents: ToolbarEvents
</script>

<input type="button" value="AU" on:click={toolbarEvents.onAddTop} />
<input type="button" value="AD" on:click={toolbarEvents.onAddBottom} />
<input type="button" value="Clear" on:click={toolbarEvents.onClear} />
