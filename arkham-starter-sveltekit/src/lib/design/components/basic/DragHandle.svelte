<script lang="ts">
	import { allIcons } from '$lib/design/icons/all-icons'

	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	export let hoveringOnGrip: (hovering: boolean) => void

	function hovering(e: MouseEvent & { currentTarget: EventTarget }) {
		hoveringOnGrip(true)
	}

	function notHovering(e: MouseEvent & { currentTarget: EventTarget }) {
		hoveringOnGrip(false)
	}
</script>

<span on:mouseover={hovering} on:mouseout={notHovering} draggable="false"
	><FaIcon path={allIcons.grip} /></span
>

<style>
	span {
		display: flex;
		padding: 3px 4px;
		user-select: none;
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 3px 0px 0px 3px;
		/* Wins over the invisible drop zone regardless of stacking.
		For some reason 1 still lose? */
		z-index: 2;
	}

	span:hover {
		cursor: grab;
	}
</style>
