<script lang="ts">
	import Button from '../basic/Button.svelte'
	export let onExitViewMode: () => void
</script>

<span
	><b>[VIEW MODE]</b> The interface is currently simplified for viewing, since you arrived from a sharing URL.</span
>

<Button label="Enable Editing" onClick={onExitViewMode} center />
