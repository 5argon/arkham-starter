<script lang="ts">
	import type { PopupDatabase } from '$lib/core/popup-database'
	import Button from '$lib/design/components/basic/Button.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import StagingAreaSingle from './StagingAreaSingle.svelte'

	export let collapse: boolean = false
	export let popupDatabase: PopupDatabase
	export let stagingCards1: string[] = []
	export let stagingCards2: string[] = []
	export let stagingCards3: string[] = []
	export let onCollapseChanged: (collapse: boolean) => void = () => {
		// do nothing
	}
	export let onAddStagingCards1: (cardId: string) => void = () => {
		// do nothing
	}
	export let onAddStagingCards2: (cardId: string) => void = () => {
		// do nothing
	}
	export let onAddStagingCards3: (cardId: string) => void = () => {
		// do nothing
	}
	export let onAddToLeftSide: (cardId: string) => void = () => {
		// do nothing
	}
	export let onAddToRightSide: (cardId: string) => void = () => {
		// do nothing
	}
</script>

<div class="expand-collapse-button">
	<Button
		big
		center
		label={collapse ? 'Expand' : 'Collapse'}
		block={true}
		onClick={() => onCollapseChanged(!collapse)}
	/>
</div>
<StagingAreaSingle
	{collapse}
	label={'Staging Area 1'}
	{popupDatabase}
	stagingCards={stagingCards1}
	onAddStagingCards={onAddStagingCards1}
	{onAddToLeftSide}
	{onAddToRightSide}
/>
<StagingAreaSingle
	{collapse}
	label={'Staging Area 2'}
	{popupDatabase}
	stagingCards={stagingCards2}
	onAddStagingCards={onAddStagingCards2}
	{onAddToLeftSide}
	{onAddToRightSide}
/>
<StagingAreaSingle
	{collapse}
	label={'Staging Area 3'}
	{popupDatabase}
	stagingCards={stagingCards3}
	onAddStagingCards={onAddStagingCards3}
	{onAddToLeftSide}
	{onAddToRightSide}
/>

<style>
	.expand-collapse-button {
		margin-bottom: 18px;
	}
</style>