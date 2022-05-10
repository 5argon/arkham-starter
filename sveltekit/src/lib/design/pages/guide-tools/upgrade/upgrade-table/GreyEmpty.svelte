<script lang="ts">
	export let onDropSwap: (swapTo: string) => void = () => {
		// do nothing
	}
	let hovering: boolean

	function dragLeaveHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		hovering = false
	}

	function dragEnterHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		hovering = true
	}

	function dragStartHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (e.dataTransfer !== null) {
		}
	}

	function dragoverHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		hovering = true
		if (e.dataTransfer !== null) {
			e.dataTransfer.dropEffect = 'move'
		}
	}

	function dropHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		hovering = false
		if (e.dataTransfer !== null) {
		}
	}

	function dragendHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (e.dataTransfer !== null) {
			if (e.dataTransfer.dropEffect !== 'none') {
				// Do nothing, since swap at drop target will remove this one.
			}
		}
	}
</script>

<div class="grey-empty-outer">
	<div
		class="grey-empty"
		on:dragleave={dragLeaveHandler}
		on:dragenter={dragEnterHandler}
		on:dragstart={dragStartHandler}
		on:dragover|preventDefault={dragoverHandler}
		on:drop|preventDefault={dropHandler}
		on:dragend|preventDefault={dragendHandler}
		class:hovering
	/>
</div>

<style>
	.grey-empty-outer {
		height: 26.5px;
		display: flex;
		align-items: center;
	}

	.grey-empty {
		flex: 1;
		height: 12px;
		background-color: rgba(0, 0, 0, 0.01);
		border: 1px dashed rgba(0, 0, 0, 0.1);
	}

	.hovering {
		background-color: rgba(255, 234, 0, 0.385);
	}
</style>
