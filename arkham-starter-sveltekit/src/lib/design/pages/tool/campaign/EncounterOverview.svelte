<script lang="ts">
	import { EncounterSetFlag, EncounterSetSorting, type Campaign } from '$lib/core/campaign'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import { packToFile } from '$lib/design/components/expansion/pack-to-file'
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
	export let campaign: Campaign
	export let incomplete: boolean = false
	let scenarioTabIndex: number = 0
	let showName: boolean = false
	let showSetCount: boolean = true
	let shortScenarioName: boolean = false
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

	function onSortingChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		sorting = parseInt(e.currentTarget.value)
	}
	$: packBanner = campaign.investigatorExpansion ? packToFile(campaign.investigatorExpansion) : null
</script>

<a href="/campaign">Back to Campaign List</a>
<div class="top-flex">
	{#if packBanner !== null}
		<img src={'/image/expansion/campaign/' + packBanner + '.webp'} alt={campaign.name} />
	{/if}
	<h1>{campaign.name}</h1>
</div>
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

<ListDivider label="Settings" />

<div class="settings-item">
	<Checkbox
		label={'Show Set Count'}
		checked={showSetCount}
		onCheckChanged={(c) => {
			showSetCount = c
		}}
	/>
	<Checkbox
		label={'Show Name'}
		checked={showName}
		onCheckChanged={(c) => {
			showName = c
		}}
	/>
</div>

<ListDivider label="Required Core Encounter Sets" />
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
		<div slot="tab3">Setup Reference Cards (Contains Spoiler)</div>
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

	.top-flex {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top-flex img {
		max-width: 400px;
	}
</style>
