<script lang="ts">
	import {
		EncounterSetSorting,
		isEncounterSetWithModification,
		type Campaign,
	} from '$lib/core/campaign'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import { findFrequencies, findUniqueScenarios, mergeEncounters } from './campaign-analyze'
	import EncounterIconFlex from './EncounterIconFlex.svelte'
	export let campaign: Campaign
	export let sorting: EncounterSetSorting
	export let incomplete: boolean = false
	export let showName: boolean = false
	export let dropdownIndex: number = 0
	export let onDropdownIndexChanged: (n: number) => void = (n) => {
		dropdownIndex = n
	}
	$: selectedScenarioIndex = dropdownIndex

	$: scenarios = findUniqueScenarios(campaign)
	$: frequencies = findFrequencies(scenarios)
	$: selectedScenario = scenarios[selectedScenarioIndex]
	$: selectedScenarioEncounters = mergeEncounters(selectedScenario)

	$: count = selectedScenario.shuffles.reduce<number>((p, c) => {
		if (!isEncounterSetWithModification(c)) {
			return p + c.count
		} else {
			const overwriteCount = c.overwriteCount
			if (overwriteCount !== undefined) {
				return p + overwriteCount
			}
			return p + c.encounterSet.count
		}
	}, 0)

	function onChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		onDropdownIndexChanged(parseInt(e.currentTarget.value))
	}
</script>

<div class="dropdown">
	<span>Scenario</span>
	<select name="scenarios" value={selectedScenarioIndex} on:change={(e) => onChangeHandler(e)}>
		{#each scenarios as s, i}
			<option value={i}>{s.name}</option>
		{/each}
	</select>
</div>

<ListDivider label={'Encounter Sets'} />
<EncounterIconFlex
	encounterSets={selectedScenarioEncounters}
	{showName}
	hideNumbers
	{sorting}
	{frequencies}
/>

{#if !incomplete}
	<ListDivider label={'Starting Encounter Deck ( ' + count + ' cards )'} />
	<EncounterIconFlex encounterSets={selectedScenario.shuffles} {showName} {sorting} {frequencies} />

	{#if selectedScenario.setAsides !== undefined}
		<ListDivider label={'Set Aside'} />
		<EncounterIconFlex
			encounterSets={selectedScenario.setAsides}
			{showName}
			{sorting}
			{frequencies}
		/>
	{/if}
{/if}

<style>
	.dropdown {
		margin: 4px 0px;
	}
</style>
