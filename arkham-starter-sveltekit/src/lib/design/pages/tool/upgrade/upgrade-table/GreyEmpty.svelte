<script lang="ts">
	export let disableHoverEffects: boolean = false
	export let onDropSwap: (fromIndex: number, fromRight: boolean, swapTo: string) => void = () => {
		// do nothing
	}
	let hovering: boolean

	function dragLeaveHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (disableHoverEffects) {
			return
		}
		hovering = false
	}

	function dragEnterHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (disableHoverEffects) {
			return
		}
		hovering = true
	}

	function dragStartHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {}

	function dragoverHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (disableHoverEffects) {
			return
		}
		e.preventDefault()
		if (e.dataTransfer !== null) {
			if (e.dataTransfer.types.length === 1 && e.dataTransfer.types[0] === 'text/plain') {
				hovering = true
				e.dataTransfer.dropEffect = 'move'
			} else {
				e.dataTransfer.dropEffect = 'none'
			}
		}
	}

	function dropHandler(e: DragEvent & { currentTarget: HTMLDivElement }) {
		if (disableHoverEffects) {
			return
		}
		hovering = false
		if (e.dataTransfer !== null) {
			const receive = e.dataTransfer.getData('text/plain').split(',')
			if (receive.length === 3) {
				onDropSwap(parseInt(receive[0], 10), receive[1] === 'right', receive[2])
			}
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
		on:dragover={dragoverHandler}
		on:drop|preventDefault={dropHandler}
		on:dragend|preventDefault={dragendHandler}
		class:hovering
	/>
</div>

<style>
	.grey-empty-outer {
		height: 28px;
		display: flex;
		align-items: center;
	}

	.grey-empty {
		flex: 1;
		height: 14px;
		background-color: rgba(0, 0, 0, 0.01);
		border: 1px dashed rgba(0, 0, 0, 0.1);
	}

	.hovering {
		background-color: rgba(255, 234, 0, 0.385);
	}
</style>
