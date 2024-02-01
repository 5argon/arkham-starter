<script lang="ts">
	import type { AhdbCard } from '$lib/ahdb/card'
	import ListDivider, { ListDividerLevel } from '$lib/design/components/basic/ListDivider.svelte'
	export let json: AhdbCard
	export let index: number
	export let onChange: (json: AhdbCard, index: number) => void
</script>

<div class="box">
	<ListDivider level={ListDividerLevel.Two} label="Input" />

	<select
		name="pets"
		value={json.faction_code}
		on:change={(e) => {
			const copy = { ...json }
			copy.faction_code = e.currentTarget.value
			copy.faction_name = e.currentTarget.options[e.currentTarget.selectedIndex].text
			onChange(copy, index)
		}}
	>
		<option value={'guardian'}>Guardian</option>
		<option value={'seeker'}>Seeker</option>
		<option value={'rogue'}>Rogue</option>
		<option value={'mystic'}>Mystic</option>
		<option value={'survivor'}>Survivor</option>
		<option value={'neutral'}>Neutral</option>
	</select>
</div>

<style>
	.box {
		border: 1px solid #000;
		margin: 16px 0px;
		padding: 8px;
	}
</style>
