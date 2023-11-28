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

	function computeCount(esis: EncounterSetItem[], customRemove?: CustomRemove): number {
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
						selectedScenario.setups[0].customRemove,
				  )} Cards`
				: '')}
	/>
	{#each selectedScenario.setups as setup, i}
		{#if multipleSetups}
			<ListDivider
				label={(setup.name ? `${setup.name} Variant` : 'Variant ' + (i + 1)) +
					' : ' +
					`${computeCount(setup.shuffles, setup.customRemove)} Cards`}
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
		<ul class="custom-remove">
			{#if setup.customRemove !== undefined}
				<li>Then take out {setup.customRemove?.count} cards. ({setup.customRemove.why})</li>
			{/if}
			{#if setup.additionalWeakness !== undefined || setup.gameComponentsPerDifficulty !== undefined}
				<li>Add on setup :</li>
			{/if}
			{#if setup.additionalWeakness !== undefined}
				<ul>
					<li>Basic Weakness : {setup.additionalWeakness.map((x) => x.trait).join(', ')}</li>
				</ul>
			{/if}
			{#if setup.gameComponentsPerDifficulty !== undefined}
				{#if setup.gameComponentsPerDifficulty.easy !== undefined}
					<ul>
						<li>Easy : {gameComponentsToString(setup.gameComponentsPerDifficulty.easy)}</li>
					</ul>
				{/if}
				{#if setup.gameComponentsPerDifficulty.standard !== undefined}
					<ul>
						<li>Standard : {gameComponentsToString(setup.gameComponentsPerDifficulty.standard)}</li>
					</ul>
				{/if}
				{#if setup.gameComponentsPerDifficulty.hard !== undefined}
					<ul>
						<li>Hard : {gameComponentsToString(setup.gameComponentsPerDifficulty.hard)}</li>
					</ul>
				{/if}
				{#if setup.gameComponentsPerDifficulty.expert !== undefined}
					<ul>
						<li>Expert : {gameComponentsToString(setup.gameComponentsPerDifficulty.expert)}</li>
					</ul>
				{/if}
			{/if}
			{#if setup.specialGather !== undefined}
				<li>Possible additional gathers :</li>
				{#each setup.specialGather as sg}
					{#if isEncounterSetWithModification(sg)}
						<EncounterIconWithLabel
							iconPath={sg.encounterSet.icon}
							iconName={sg.encounterSet.name}
							coreSet={sg.encounterSet.flag === EncounterSetFlag.Core}
							returnToSet={sg.encounterSet.flag === EncounterSetFlag.ReturnTo}
							scenarioSet={sg.encounterSet.flag === EncounterSetFlag.Scenario}
							subText={showSetCount ? sg.what?.join(', ') : ''}
							{showName}
						/>
					{:else}
						<EncounterIconWithLabel
							iconPath={sg.icon}
							iconName={sg.name}
							coreSet={sg.flag === EncounterSetFlag.Core}
							returnToSet={sg.flag === EncounterSetFlag.ReturnTo}
							scenarioSet={sg.flag === EncounterSetFlag.Scenario}
							{showName}
						/>
					{/if}
				{/each}
			{/if}
		</ul>
	{/each}

	<!-- {#if selectedScenario.setAsides !== undefined}
		<ListDivider label={'Set Aside'} />
		<EncounterIconFlex
			encounterSets={selectedScenario.setAsides}
			{showName}
			{sorting}
			{frequencies}
		/>
	{/if} -->
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

	.custom-remove {
		color: grey;
		font-size: small;
	}
</style>
