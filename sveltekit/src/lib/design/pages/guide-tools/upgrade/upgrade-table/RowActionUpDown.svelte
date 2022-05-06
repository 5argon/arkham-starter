<script lang="ts">
	import CardBlockButton from '$lib/design/components/card/CardBlockButton.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	export let onClickUp: () => void = () => {
		// do nothing
	}
	export let onClickDown: () => void = () => {
		// do nothing
	}
</script>

<td>
	<CardBlockButton label="Move Row Up" iconPath={allIcons.arrowUp} onClick={onClickUp} />
	<CardBlockButton label="Move Row Down" iconPath={allIcons.arrowDown} onClick={onClickDown} />
</td>
