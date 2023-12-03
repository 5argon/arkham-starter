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

<div class="inline-flex">
	<CardBlockButton label="Move Row Up" iconPath={allIcons.arrowUp} onClick={onClickUp} />
	<CardBlockButton label="Move Row Down" iconPath={allIcons.arrowDown} onClick={onClickDown} />
</div>

<style>
	.inline-flex {
		display: inline-flex;
		align-items: center;
	}
</style>
