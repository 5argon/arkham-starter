<script lang="ts">
	import {
		EncounterSetFlag,
		EncounterSetSorting,
		type Campaign,
		type EncounterSet,
	} from '$lib/core/campaign'
	import { Difficulty } from '$lib/core/difficulty'
	import Button from '$lib/design/components/basic/Button.svelte'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import LimitedTab from '$lib/design/components/layout/LimitedTab.svelte'
	import {
		findCoreEncounters,
		findFrequencies,
		findUniqueEncounters,
		findUniqueScenarios,
		sortEncounters,
	} from './campaign-analyze'
	import EncounterDiagramsTab from './EncounterDiagramsTab.svelte'
	import EncounterIconFlex from './EncounterIconFlex.svelte'
	import EncounterMatrixTab from './EncounterMatrixTab.svelte'
	import EncounterScenariosTab from './EncounterScenariosTab.svelte'
	import EncounterTransitionsTab from './EncounterTransitionsTab.svelte'
	export let campaign: Campaign
	export let incomplete: boolean = false
	let scenarioTabIndex: number = 0
	let transitionTabIndex: number = 0
	let showName: boolean = false
	let showSetCount: boolean = true
	let shortScenarioName: boolean = false
	let advanced: boolean = false
	let difficulty: Difficulty = Difficulty.Standard
	let activeTab: number = 0
	let sorting: EncounterSetSorting = EncounterSetSorting.Alphabetical
	$: scenarios = findUniqueScenarios(campaign)
	$: encounterFrequencies = findFrequencies(scenarios)
	$: coreEncounters = sortEncounters(findCoreEncounters(campaign), sorting, encounterFrequencies)

	$: uniqueEncounters = findUniqueEncounters(campaign)
	$: commonCount =
		campaign.commonEncounterSets?.reduce<number>((prev, cur) => {
			return prev + cur.count
		}, 0) ?? 0
	$: campaignCount =
		commonCount +
		uniqueEncounters
			.filter((x) => x.flag === EncounterSetFlag.Scenario)
			.reduce<number>((prev, cur) => {
				return prev + cur.count
			}, 0)
	$: returnToCount = uniqueEncounters
		.filter((x) => x.flag === EncounterSetFlag.ReturnTo)
		.reduce<number>((prev, cur) => {
			return prev + cur.count
		}, 0)
	$: coreCount = coreEncounters.reduce<number>((prev, cur) => {
		return prev + cur.count
	}, 0)

	function onDifficultyChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		difficulty = parseInt(e.currentTarget.value)
	}

	function onSortingChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		sorting = parseInt(e.currentTarget.value)
	}
</script>

<a href="/campaign">Back to Campaign List</a>
{#if incomplete}
	<p>
		<strong>** INCOMPLETE **</strong> I only buy repackaged campaigns and have not played this campaign
		yet. The following information could be missing or wrong :
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
		<a href="https://github.com/5argon/arkham-starter" target="_blank" rel="noreferrer"
			>Github page</a
		> to find out how. Thank you!
	</p>
{/if}

{#if campaign.setupReferenceGraphic !== undefined}
	<ListDivider label="Download Setup Reference Cards" />
	<a target="_blank" rel="noreferrer" href={campaign.setupReferenceGraphic}
		>Click Here (Google Drive)</a
	>

	<p>
		Note : The setup reference cards contains information that <b>may spoil the scenario.</b>
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
	<Checkbox
		label={'Show Set Count'}
		checked={showSetCount}
		onCheckChanged={(c) => {
			showSetCount = c
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
			<option value={EncounterSetSorting.Alphabetical}>Alphabetical</option>
			<option value={EncounterSetSorting.Frequency}>Frequency</option>
		</select>
	</div>
	<Checkbox
		label={'Short Scenario Name'}
		checked={shortScenarioName}
		onCheckChanged={(c) => {
			shortScenarioName = c
		}}
	/>
{/if}

<ListDivider label="Stats" />

{#if campaignCount > 0}
	<div>Amount of campaign-specific encounter cards : {campaignCount} Cards</div>
{/if}
{#if coreCount > 0}
	<div>Amount of core encounter cards : {coreCount} Cards</div>
{/if}
{#if returnToCount > 0}
	<div>Amount of return-to encounter cards : {returnToCount} Cards</div>
{/if}

<ListDivider label="Core Encounter Sets" />
<EncounterIconFlex
	encounterSets={coreEncounters}
	{showName}
	{showSetCount}
	hideNumbers
	{sorting}
	frequencies={encounterFrequencies}
/>

{#if campaign.commonEncounterSets !== undefined}
	<ListDivider label="Common Encounter Sets" />
	<EncounterIconFlex
		encounterSets={campaign.commonEncounterSets}
		{showName}
		hideNumbers
		{sorting}
		frequencies={encounterFrequencies}
	/>
{/if}

<div class="tabs">
	<LimitedTab bind:active={activeTab}>
		<div slot="tab1">Matrix</div>
		<div slot="content1">
			<EncounterMatrixTab
				{shortScenarioName}
				{campaign}
				{showName}
				{sorting}
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
				{showSetCount}
				{sorting}
				dropdownIndex={scenarioTabIndex}
				onDropdownIndexChanged={(n) => {
					scenarioTabIndex = n
				}}
				{incomplete}
			/>
		</div>
		<div slot="tab3">Diagrams (Contains Spoiler)</div>
		<div slot="content3">
			<EncounterDiagramsTab
				{campaign}
				dropdownIndex={scenarioTabIndex}
				onDropdownIndexChanged={(n) => {
					scenarioTabIndex = n
				}}
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
