<script lang="ts">
	import type { Campaign } from '$lib/core/campaign'
	import { Difficulty } from '$lib/core/difficulty'
	import Button from '$lib/design/components/basic/Button.svelte'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import LimitedTab from '$lib/design/components/layout/LimitedTab.svelte'
	import { findCoreEncounters } from './campaign-analyze'
	import EncounterIconFlex from './EncounterIconFlex.svelte'
	import EncounterMatrixTab from './EncounterMatrixTab.svelte'
	import EncounterScenariosTab from './EncounterScenariosTab.svelte'
	import EncounterTransitionsTab from './EncounterTransitionsTab.svelte'
	export let campaign: Campaign
	let scenarioTabIndex: number = 0
	let transitionTabIndex: number = 0
	let showName: boolean = false
	let difficulty: Difficulty = Difficulty.Standard
	$: coreEncounters = findCoreEncounters(campaign)

	function onDifficultyChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		difficulty = parseInt(e.currentTarget.value)
	}
</script>

<a href="/tool/encounter">Back to Campaign List</a>

<ListDivider label="Settings" />

<div>
	<span>Difficulty</span>
	<select name="difficulties" value={difficulty} on:change={(e) => onDifficultyChangeHandler(e)}>
		<option value={Difficulty.Easy}>Easy</option>
		<option value={Difficulty.Standard}>Standard</option>
		<option value={Difficulty.Hard}>Hard</option>
		<option value={Difficulty.Expert}>Expert</option>
	</select>
</div>
<div>
	<Checkbox
		label={'Show Name'}
		checked={showName}
		onCheckChanged={(c) => {
			showName = c
		}}
	/>
</div>

<ListDivider label="Core Encounter Sets" />
<EncounterIconFlex encounterSets={coreEncounters} {showName} hideStartingEncoutnerSetNumber />

{#if campaign.commonEncounterSets !== undefined}
	<ListDivider label="Common Encounter Sets" />
	<EncounterIconFlex
		encounterSets={campaign.commonEncounterSets}
		{showName}
		hideStartingEncoutnerSetNumber
	/>
{/if}

<div class="tabs">
	<LimitedTab>
		<div slot="tab1">Matrix</div>
		<div slot="content1">
			<EncounterMatrixTab {campaign} />
		</div>
		<div slot="tab2">Scenarios</div>
		<div slot="content2">
			<EncounterScenariosTab
				{campaign}
				{showName}
				dropdownIndex={scenarioTabIndex}
				onDropdownIndexChanged={(n) => {
					scenarioTabIndex = n
				}}
			/>
		</div>
		<div slot="tab3">Transitions</div>
		<div slot="content3">
			<EncounterTransitionsTab
				{campaign}
				dropdownIndexScenario={scenarioTabIndex}
				dropdownIndexTransition={transitionTabIndex}
				onDropdownIndexScenarioChanged={(n) => {
					scenarioTabIndex = n
					// Is it right that this logic is not inside the component?
					transitionTabIndex = 0
				}}
				onDropdownIndexTransitionChanged={(n) => {
					transitionTabIndex = n
				}}
				{showName}
			/>
		</div>
	</LimitedTab>
</div>

<style>
	.tabs {
		margin-top: 12px;
	}
</style>
