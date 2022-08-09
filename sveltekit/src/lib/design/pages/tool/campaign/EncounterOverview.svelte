<script lang="ts">
	import { EncounterSetSorting, type Campaign } from '$lib/core/campaign'
	import { Difficulty } from '$lib/core/difficulty'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import LimitedTab from '$lib/design/components/layout/LimitedTab.svelte'
	import { findCoreEncounters, findUniqueScenarios } from './campaign-analyze'
	import EncounterIconFlex from './EncounterIconFlex.svelte'
	import EncounterMatrixTab from './EncounterMatrixTab.svelte'
	import EncounterScenariosTab from './EncounterScenariosTab.svelte'
	import EncounterTransitionsTab from './EncounterTransitionsTab.svelte'
	export let campaign: Campaign
	export let incomplete: boolean = false
	let scenarioTabIndex: number = 0
	let transitionTabIndex: number = 0
	let showName: boolean = false
	let advanced: boolean = false
	let difficulty: Difficulty = Difficulty.Standard
	let activeTab: number = 0
	let sorting: EncounterSetSorting = EncounterSetSorting.Default
	$: coreEncounters = findCoreEncounters(campaign)

	function onDifficultyChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		difficulty = parseInt(e.currentTarget.value)
	}

	function onSortingChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		sorting = parseInt(e.currentTarget.value)
	}
</script>

<a href="/tool/campaign">Back to Campaign List</a>

{#if incomplete}
	<p>
		<strong>** INCOMPLETE **</strong> I only buy repackaged campaigns and have not played this campaign
		yet. The following information are probably missing or wrong :
	</p>
	<ul>
		<li>Card count of each encounter set.</li>
		<li>Subset count that actually goes into the random encounter deck.</li>
		<li>The right transitions between scenarios.</li>
		<li>Everything related to scenario setup, like set aside encounter sets.</li>
	</ul>
	<p>
		If you have the campaign and would like to help out completing the missing information, head to
		the
		<a href="https://github.com/5argon/arkham-starter" target="_blank">Github page</a> to find out how.
		Thank you!
	</p>
{/if}

<ListDivider label="Settings" />

<div class="settings-item">
	<Checkbox
		label={'Show Name'}
		checked={showName}
		onCheckChanged={(c) => {
			showName = c
		}}
	/>
</div>
<div class="settings-item">
	<Checkbox
		label={'Advanced Features'}
		checked={advanced}
		onCheckChanged={(c) => {
			advanced = c
		}}
	/>
</div>
{#if advanced}
	<div class="settings-item">
		<span>Difficulty</span>
		<select name="difficulties" value={difficulty} on:change={(e) => onDifficultyChangeHandler(e)}>
			<option value={Difficulty.Easy}>Easy</option>
			<option value={Difficulty.Standard}>Standard</option>
			<option value={Difficulty.Hard}>Hard</option>
			<option value={Difficulty.Expert}>Expert</option>
		</select>
	</div>
	<div class="settings-item">
		<span>Encounter Set Sorting</span>
		<select name="sortings" value={sorting} on:change={(e) => onSortingChangeHandler(e)}>
			<option value={EncounterSetSorting.Default}>Default</option>
			<option value={EncounterSetSorting.Frequency}>Frequency</option>
			<option value={EncounterSetSorting.Alphabetical}>Alphabetical</option>
		</select>
	</div>
{/if}

<ListDivider label="Core Encounter Sets" />
<EncounterIconFlex encounterSets={coreEncounters} {showName} hideNumbers />

{#if campaign.commonEncounterSets !== undefined}
	<ListDivider label="Common Encounter Sets" />
	<EncounterIconFlex encounterSets={campaign.commonEncounterSets} {showName} hideNumbers />
{/if}

<div class="tabs">
	<LimitedTab bind:active={activeTab}>
		<div slot="tab1">Matrix</div>
		<div slot="content1">
			<EncounterMatrixTab
				{campaign}
				{showName}
				onGoToScenario={(s) => {
					activeTab = 1
					const index = findUniqueScenarios(campaign).findIndex((x) => x === s)
					scenarioTabIndex = index
				}}
			/>
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
				{incomplete}
			/>
		</div>
		<div slot="tab3">Transitions</div>
		<div slot="content3">
			<EncounterTransitionsTab
				{campaign}
				{advanced}
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

	.settings-item {
		margin: 2px 0px;
	}
</style>
