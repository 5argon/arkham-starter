<script lang="ts">
	import { rowDragPrefix } from './UpgradeRow.svelte'
	export let showDropTarget = false
	let hovering = false
	export let onDropSwap: (fromIndex: number) => void = () => {
		// do nothing
	}

	function dragLeaveHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (e.dataTransfer !== null) {
			hovering = false
		}
	}

	function dragEnterHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (e.dataTransfer !== null) {
			hovering = true
		}
	}

	function dragoverHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (e.dataTransfer !== null) {
			if (e.dataTransfer.types.length === 1 && e.dataTransfer.types[0] === 'text/plain') {
				// Apparently this allows dragging over the characters... lol
				hovering = true
				e.dataTransfer.dropEffect = 'move'
			} else {
				e.dataTransfer.dropEffect = 'none'
			}
		}
	}

	function dropHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (e.dataTransfer !== null) {
			hovering = false
			const receive = e.dataTransfer.getData('text/plain').split(',')
			if (receive.length === 2 && receive[0] === rowDragPrefix) {
				onDropSwap(parseInt(receive[1], 10))
			}
		}
	}
</script>

<div
	class="outer"
	class:bring-to-front={showDropTarget}
	on:dragleave|preventDefault={dragLeaveHandler}
	on:dragenter|preventDefault={dragEnterHandler}
	on:dragover|preventDefault={dragoverHandler}
	on:drop|preventDefault={dropHandler}
>
	<div
		class="inner"
		class:show-drop-target={showDropTarget}
		class:hovering={showDropTarget && hovering}
	/>
</div>

<style>
	.outer {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 20px;
		margin: -10px 0px;
		z-index: -10;
	}

	.bring-to-front {
		/* Temporarily let the drop zone wins over the next list items. */
		z-index: 1;
	}

	.inner {
		flex: 1;
		height: 2px;
		z-index: -1;
	}

	.show-drop-target {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.hovering {
		background-color: rgba(255, 115, 0, 0.8);
	}
</style>
