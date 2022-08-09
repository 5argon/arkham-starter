<script lang="ts">
	import HoverFrame from '$lib/design/components/inline/HoverFrame.svelte'

	export let iconPath: string
	export let iconName: string
	export let coreSet: boolean = false
	export let scenarioSet: boolean = false
	export let returnToSet: boolean = false
	export let enableHover: boolean = false

	let hovering = false
	function mouseEnterHandler(e: MouseEvent & { currentTarget: EventTarget }) {
		hovering = true
	}
	function mouseLeaveHandler(e: MouseEvent & { currentTarget: EventTarget }) {
		hovering = false
	}

	function makeIconPath(icon: string) {
		const path = '/image/icon/encounter/' + icon + '.png'
		return encodeURI(path)
	}
	$: popupText = iconName
</script>

<span class="wrap" on:mouseenter={mouseEnterHandler} on:mouseleave={mouseLeaveHandler}>
	{#if hovering && enableHover}
		<span class="popup">
			<HoverFrame>{popupText}</HoverFrame>
		</span>
	{/if}
	<div class="outer-flex">
		<img
			class="encounter-icon"
			class:encounter-icon-black={!coreSet && !returnToSet}
			class:encounter-icon-core={coreSet}
			class:encounter-icon-scenario-set={scenarioSet}
			class:encounter-icon-return-to={returnToSet}
			src={makeIconPath(iconPath)}
			alt={iconName}
		/>
	</div>
</span>

<style>
	.wrap {
		display: inline-block;
		width: 24px;
		height: 24px;
	}

	.outer-flex {
		display: inline-flex;
		align-items: center;
		justify-items: center;
		width: 24px;
		height: 24px;
	}

	.encounter-icon {
		max-width: 100%;
		max-height: 100%;
		margin: auto auto;
	}

	.encounter-icon-black {
		filter: brightness(0);
	}

	.encounter-icon-core {
		filter: brightness(20%) sepia(100%) hue-rotate(300deg) saturate(6);
	}

	.encounter-icon-scenario-set {
		filter: brightness(20%) sepia(100%) hue-rotate(200deg) saturate(6);
	}

	.encounter-icon-return-to {
		filter: brightness(20%) sepia(100%) hue-rotate(100deg) saturate(6);
	}

	.popup {
		position: absolute;
		margin-top: -25px;
		z-index: 1;
		white-space: nowrap;
	}
</style>
