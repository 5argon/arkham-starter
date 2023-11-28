<script lang="ts">
	import {
		EncounterSetSorting,
		isEncounterSetWithModification,
		type Campaign,
		type EncounterSetItem,
		EncounterSetFlag,
		type CustomRemove,
	} from '$lib/core/campaign'
	import ListDivider, { ListDividerLevel } from '$lib/design/components/basic/ListDivider.svelte'
	import {
		findFrequencies,
		findUniqueScenarios,
		makeLongScenarioName,
		mergeEncounters,
	} from './campaign-analyze'
	import CustomSetupRender from './CustomSetupRender.svelte'
	import EncounterIconFlex from './EncounterIconFlex.svelte'
	import EncounterIconWithLabel from './EncounterIconWithLabel.svelte'
	import { gameComponentsToString, makeSetCountText } from './helper'
	export let campaign: Campaign
	export let sorting: EncounterSetSorting
	export let incomplete: boolean = false
	export let showName: boolean = false
	export let showSetCount: boolean = false
	export let dropdownIndex: number = 0
	export let onDropdownIndexChanged: (n: number) => void = (n) => {
		dropdownIndex = n
	}
	$: selectedScenarioIndex = dropdownIndex

	$: scenarios = findUniqueScenarios(campaign)
	$: frequencies = findFrequencies(scenarios)
	$: selectedScenario = scenarios[selectedScenarioIndex]
	$: selectedScenarioEncounters = mergeEncounters(selectedScenario)

	function computeCount(esis: EncounterSetItem[], customRemove: CustomRemove | undefined): number {
		const count = esis.reduce<number>((p, c) => {
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
		return count - (customRemove?.count ?? 0)
	}

	$: multipleSetups = selectedScenario.setups.length > 1

	function onChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		onDropdownIndexChanged(parseInt(e.currentTarget.value))
	}
</script>

<div class="dropdown">
	<span>Scenario</span>
	<select name="scenarios" value={selectedScenarioIndex} on:change={(e) => onChangeHandler(e)}>
		{#each scenarios as s, i}
			<option value={i}>{makeLongScenarioName(s)}</option>
		{/each}
	</select>
</div>

<h3 class="scenario-name">
	{scenarios[selectedScenarioIndex].name}
</h3>

<ListDivider label={'Encounter Sets'} />
<EncounterIconFlex
	encounterSets={selectedScenarioEncounters}
	{showName}
	{showSetCount}
	hideNumbers
	{sorting}
	{frequencies}
/>

{#if !incomplete}
	<ListDivider
		label={'Starting Encounter Deck' +
			(!multipleSetups
				? ` : ${computeCount(
						selectedScenario.setups[0].shuffles,
						selectedScenario.commonSetup?.customRemove,
				  )} Cards`
				: '')}
	/>
	{#each selectedScenario.setups as setup, i}
		{#if multipleSetups}
			<ListDivider
				label={(setup.name ? `${setup.name} Variant` : 'Variant ' + (i + 1)) +
					' : ' +
					`${computeCount(
						setup.shuffles,
						setup.customRemove ?? selectedScenario.commonSetup?.customRemove ?? undefined,
					)} Cards`}
				level={ListDividerLevel.Two}
			/>
		{/if}
		<EncounterIconFlex
			encounterSets={setup.shuffles}
			{showName}
			{showSetCount}
			{sorting}
			{frequencies}
		/>
		<CustomSetupRender {setup} {showName} {showSetCount} />
	{/each}
	{#if selectedScenario.commonSetup !== undefined}
		<CustomSetupRender setup={selectedScenario.commonSetup} {showName} {showSetCount} />
	{/if}
{/if}

<style>
	.dropdown {
		margin: 4px 0px;
	}

	.scenario-name {
		border: 1px solid black;
		border-radius: 4px;
		padding: 4px 16px;
		box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.167);
	}
</style>
