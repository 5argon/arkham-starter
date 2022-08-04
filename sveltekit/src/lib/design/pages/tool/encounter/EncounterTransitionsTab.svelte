<script lang="ts">
	import type { Campaign, Scenario, ScenarioTransition } from '$lib/core/campaign'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import {
		filterPossibleTransitions,
		findForesightChoices,
		findUniqueScenarios,
		makeTransitionInfo,
		type TransitionInfo,
	} from './campaign-analyze'
	import EncounterIconFlex from './EncounterIconFlex.svelte'
	export let campaign: Campaign
	export let advanced: boolean
	export let dropdownIndexScenario: number = 0
	export let dropdownIndexTransition: number = 0
	export let onDropdownIndexScenarioChanged: (n: number) => void = (n) => {
		dropdownIndexScenario = n
	}
	export let onDropdownIndexTransitionChanged: (n: number) => void = (n) => {
		dropdownIndexTransition = n
	}
	export let showName: boolean = false
	export let foresightChecked: boolean = false
	let selectedForesightIndex: number = 0
	export let onChangeForesight: (c: boolean) => void = (c) => {
		foresightChecked = c
	}
	let scenarios: Scenario[]
	$: {
		scenarios = findUniqueScenarios(campaign)
	}

	let possibleTransitions: ScenarioTransition[]
	let selectedScenarioTransition: ScenarioTransition | null

	$: {
		const selectedScenario: Scenario = scenarios[dropdownIndexScenario]
		possibleTransitions = filterPossibleTransitions(campaign.scenarioTransitions, selectedScenario)
		if (dropdownIndexTransition >= possibleTransitions.length) {
			selectedScenarioTransition = null
		} else {
			selectedScenarioTransition = possibleTransitions[dropdownIndexTransition]
		}
	}

	let cannotForesight: boolean = false
	let foresightChoices: Scenario[] = []
	let oneChoice: boolean = false
	$: {
		foresightChoices =
			selectedScenarioTransition === null
				? []
				: findForesightChoices(campaign, selectedScenarioTransition)
		if (foresightChoices.length === 0) {
			cannotForesight = true
			oneChoice = false
		} else {
			cannotForesight = false
			if (foresightChoices.length === 1) {
				onlyForesightChoice = foresightChoices[0]
			} else {
				onlyForesightChoice = null
			}
			selectedForesightIndex = 0
		}
	}

	let foresighting: Scenario | null = null
	let onlyForesightChoice: Scenario | null = null
	$: {
		if (oneChoice) {
			onlyForesightChoice = foresightChoices[0]
		}
	}
	$: {
		if (!cannotForesight && foresightChecked) {
			foresighting = foresightChoices[selectedForesightIndex]
		} else {
			foresighting = null
		}
	}

	function onScenarioChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		onDropdownIndexScenarioChanged(parseInt(e.currentTarget.value))
	}

	function onTransitionChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		onDropdownIndexTransitionChanged(parseInt(e.currentTarget.value))
	}

	function makeTransitionString(from: Scenario | null, to: Scenario | null): string {
		const arrow = from !== null && to !== null
		return (from?.name ?? '') + (arrow ? ' → ' : '') + (to?.name ?? '')
	}
	let ti: TransitionInfo | null
	$: {
		if (selectedScenarioTransition !== null) {
			ti = makeTransitionInfo(
				selectedScenarioTransition.from,
				selectedScenarioTransition.to,
				foresighting,
			)
		} else {
			ti = null
		}
	}

	let foresightLabel: string
	$: {
		foresightLabel = 'Foresight'
		if (onlyForesightChoice !== null) {
			foresightLabel = foresightLabel + ' ( → ' + onlyForesightChoice.name + ')'
		}
	}
</script>

<div class="dropdown">
	<span>Scenario</span>
	<select
		name="scenario"
		value={dropdownIndexScenario}
		on:change={(e) => onScenarioChangeHandler(e)}
	>
		{#each scenarios as s, i}
			<option value={i}>{s.name}</option>
		{/each}
	</select>
</div>

{#if ti !== null}
	<div class="dropdown">
		<span>Transition</span>
		<select
			name="transitions"
			value={dropdownIndexTransition}
			on:change={(e) => onTransitionChangeHandler(e)}
		>
			{#each possibleTransitions as s, i}
				<option value={i}>{makeTransitionString(s.from, s.to)}</option>
			{/each}
		</select>

		{#if advanced}
			{#if !cannotForesight}
				<Checkbox
					label={foresightLabel}
					checked={foresightChecked}
					onCheckChanged={(c) => {
						onChangeForesight(c)
					}}
				/>
			{/if}
			{#if !onlyForesightChoice}
				<select
					name="transitions"
					value={selectedForesightIndex}
					on:change={(e) => {
						selectedForesightIndex = parseInt(e.currentTarget.value)
					}}
				>
					{#each foresightChoices as s, i}
						<option value={i}>{'→ ' + s.name}</option>
					{/each}
				</select>
			{/if}
		{/if}
	</div>

	<ListDivider label={'Keep'} />
	<EncounterIconFlex encounterSets={ti.keep} {showName} hideNumbers />
	<ListDivider label={'Add'} />
	<EncounterIconFlex encounterSets={ti.add} {showName} hideNumbers />
	<ListDivider label={'Remove'} />
	<EncounterIconFlex encounterSets={ti.remove} {showName} hideNumbers />
	{#if advanced}
		{#if foresighting !== null}
			<ListDivider label={'Remove to Foresight'} />
			<EncounterIconFlex encounterSets={ti.removeToForesight} {showName} hideNumbers />
			<ListDivider label={'Add to Foresight'} />
			<EncounterIconFlex encounterSets={ti.addToForesight} {showName} hideNumbers />
		{/if}
	{/if}
{/if}
{#if ti === null}
	No transition available from this scenario.
{/if}

<style>
	.dropdown {
		margin: 4px 0px;
	}
</style>
