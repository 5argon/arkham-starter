<script lang="ts">
	import HoverFrame from '$lib/design/components/inline/HoverFrame.svelte'

	export let iconPath: string
	export let iconName: string
	export let coreSet: boolean = false
	export let scenarioSet: boolean = false
	export let returnToSet: boolean = false
	export let showName: boolean = false
	export let number: number | null = null

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

{#if hovering && !showName}
	<span class="popup">
		<HoverFrame>{popupText}</HoverFrame>
	</span>
{/if}
<div class="outer-flex">
	<div class="ensure-square" on:mouseenter={mouseEnterHandler} on:mouseleave={mouseLeaveHandler}>
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
	{#if showName}<span class="show-name" class:name-with-number={number !== null}>{iconName}</span
		>{/if}
	{#if number !== null}<span class="number">({number})</span>{/if}
</div>

<style>
	.outer-flex {
		display: inline-flex;
		align-items: center;
		justify-items: center;
	}

	.show-name {
		margin-right: 8px;
	}

	.name-with-number {
		margin-right: 4px;
	}

	.number {
		margin-right: 8px;
	}

	.ensure-square {
		width: 24px;
		height: 24px;
		display: inline-flex;
		align-items: center;
		justify-items: center;
		margin: 0px 4px;
	}

	.encounter-icon {
		max-width: 100%;
		max-height: 100%;
		margin: 0 auto;
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
	}
</style>
