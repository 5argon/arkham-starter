<script lang="ts">
	import { Grouping, Sorting } from '$lib/deck-table/grouping'
	import { allIcons } from '$lib/design/icons/all-icons'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import Button from '../basic/Button.svelte'

	export let sortings: Sorting[]
	export let dumbThing: number
	export let onSortingsChanged: (g: Sorting[]) => void
	const remove = 'REMOVE'

	function onChangeHandler(i: number, e: Event & { currentTarget: HTMLSelectElement }) {
		const value = e.currentTarget.value
		if (value === remove) {
			const copied = [...sortings]
			copied.splice(i, 1)
			onSortingsChanged(copied)
		} else {
			const en: Sorting = parseInt(value)
			const newG = [...sortings]
			newG[i] = en
			onSortingsChanged(newG)
		}
	}
</script>

<span class="flex-item label">then sort by</span>
{#each sortings as g, i (dumbThing.toString() + g.toString() + i.toString())}
	<span class="flex-item">
		<select name="pets" value={g} on:change={(e) => onChangeHandler(i, e)}>
			<option value={remove}>(Remove)</option>
			<option value={Sorting.Number}>Number</option>
			<option value={Sorting.Class}>Class</option>
			<option value={Sorting.Set}>Set</option>
			<option value={Sorting.Type}>Type</option>
			<option value={Sorting.Name}>Name</option>
			<option value={Sorting.Level}>Level</option>
		</select>
	</span>
	{#if i < sortings.length - 1}
		{'→'}
	{/if}
{/each}
<span class="flex-item">
	<Button
		label="Add"
		onClick={() => {
			onSortingsChanged([...sortings, Sorting.Number])
		}}
	>
		<FaIcon path={allIcons.plus} />
	</Button>
</span>

<style>
	.label {
		font-weight: bold;
	}
	.flex-item {
		margin: 0px 4px;
	}
</style>
