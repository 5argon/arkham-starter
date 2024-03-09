<script lang="ts">
	import type { Grouping, Sorting } from '$lib/deck-table/grouping'

	import FramedTextSpan from '../inline/FramedTextSpan.svelte'
	import GrouperSorterGroupings from './GrouperSorterGroupings.svelte'
	import GrouperSorterSortings from './GrouperSorterSortings.svelte'

	export let text: string = ''
	export let groupings: Grouping[]
	export let sortings: Sorting[]
	export let onGroupingsChanged: (g: Grouping[]) => void
	export let onSortingsChanged: (s: Sorting[]) => void

	let dumbThing: number = Math.random()
	let collectionCode = ''
	function inputChangedHandler(e: Event & { currentTarget: HTMLInputElement }) {
		collectionCode = e.currentTarget.value
	}
	function inputKeyboardHandler(e: KeyboardEvent & { currentTarget: HTMLInputElement }) {
		if (e.key === 'Enter') {
			collectionCode = e.currentTarget.value
		}
	}

	// function collectionCodeApply(code: string): void{
	// 	const split = code.split("-")
	// 	if(split.length>0){
	// 		const groupingCode = split[1]
	// 	}
	// }
</script>

<!-- <TextBox
	label="Collection Organization Code"
	currentText={collectionCode}
	submitButtonText="Apply"
	editingLevel={EditingLevel.Editable}
	enableNotice={true}
	{noticeLevel}
	noticeText={notice}
	onSubmit={(s) => {
		collectionCode = s
	}}
	placeholderText={'Use UI below to get the code, remember it for the next time.'}
/> -->

<div class="long-span">
		<FramedTextSpan {text} />
	<!-- <span>
		<input
			class="collection-code-box"
			type="text"
			placeholder="Preset"
			value={collectionCode}
			on:change={inputChangedHandler}
			on:keyup={inputKeyboardHandler}
		/>
	</span> -->
	<GrouperSorterGroupings
		{groupings}
		{dumbThing}
		onGroupingsChanged={(g) => {
			dumbThing = Math.random()
			onGroupingsChanged(g)
		}}
	/>
	<GrouperSorterSortings
		{sortings}
		{dumbThing}
		onSortingsChanged={(s) => {
			dumbThing = Math.random()
			onSortingsChanged(s)
		}}
	/>
</div>

<style>
	.long-span {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		margin: 8px 0px;
	}
</style>
