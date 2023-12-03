<script lang="ts">
	import { Grouping, Sorting } from '$lib/deck-table/grouping'

	import Story from '$lib/design/story/story.svelte'
	import GrouperSorter from './GrouperSorter.svelte'

	let groupings: Grouping[] = [Grouping.Class, Grouping.Type]
	let sortings: Sorting[] = [Sorting.Number, Sorting.Name]
</script>

<Story name="Test">
	<GrouperSorter
		{groupings}
		{sortings}
		onGroupingsChanged={(g) => {
			groupings = g
		}}
		onSortingsChanged={(s) => {
			sortings = s
		}}
	/>
</Story>
