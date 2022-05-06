<script lang="ts">
	import type { PopupDatabase } from '$lib/core/popup-database'
	import StagingAreaSingle from './StagingAreaSingle.svelte'
	export let popupDatabase: PopupDatabase
	export let stagingCards1: string[] = []
	export let stagingCards2: string[] = []
	export let stagingCards3: string[] = []
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

<StagingAreaSingle
	label={'Staging Area 1'}
	{popupDatabase}
	stagingCards={stagingCards1}
	onAddStagingCards={onAddStagingCards1}
	{onAddToLeftSide}
	{onAddToRightSide}
/>
<StagingAreaSingle
	label={'Staging Area 2'}
	{popupDatabase}
	stagingCards={stagingCards2}
	onAddStagingCards={onAddStagingCards2}
	{onAddToLeftSide}
	{onAddToRightSide}
/>
<StagingAreaSingle
	label={'Staging Area 3'}
	{popupDatabase}
	stagingCards={stagingCards3}
	onAddStagingCards={onAddStagingCards3}
	{onAddToLeftSide}
	{onAddToRightSide}
/>
