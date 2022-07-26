<script lang="ts">
	import { Grouping } from '$lib/deck-table/grouping'
	import { allIcons } from '$lib/design/icons/all-icons'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import Button from '../basic/Button.svelte'

	export let groupings: Grouping[]
	export let dumbThing: number
	export let onGroupingsChanged: (g: Grouping[]) => void
	const remove = 'REMOVE'

	function onChangeHandler(i: number, e: Event & { currentTarget: HTMLSelectElement }) {
		const value = e.currentTarget.value
		if (value === remove) {
			const copied = [...groupings]
			copied.splice(i, 1)
			onGroupingsChanged(copied)
		} else {
			const en: Grouping = parseInt(value)
			const newG = [...groupings]
			newG[i] = en
			onGroupingsChanged(newG)
		}
	}
</script>

<span class="flex-item label">Group by</span>
{#each groupings as g, i (dumbThing.toString() + g.toString() + i.toString())}
	<span class="flex-item">
		<select name="pets" value={g} on:change={(e) => onChangeHandler(i, e)}>
			<option value={remove}>(Remove)</option>
			<option value={Grouping.Set}>Set</option>
			<option value={Grouping.Class}>Class</option>
			<option value={Grouping.Type}>Type</option>
			<option value={Grouping.Slot}>Slot</option>
			<option value={Grouping.Level}>Level</option>
			<option value={Grouping.Level015}>Level (0, 1~5)</option>
		</select>
	</span>
	{#if i < groupings.length - 1}
		{'→'}
	{/if}
{/each}
<span class="flex-item">
	<Button
		label="Add"
		onClick={() => {
			onGroupingsChanged([...groupings, Grouping.Set])
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
