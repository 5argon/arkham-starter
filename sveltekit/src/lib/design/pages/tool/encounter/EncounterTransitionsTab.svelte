<script lang="ts">
	import type { Campaign, Scenario, ScenarioTransition } from '$lib/core/campaign'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import PackIconHover from '$lib/design/components/card/PackIconHover.svelte'
	import { once } from 'svelte/internal'
	import { findForesightChoices, makeTransitionInfo } from './campaign-analyze'
	import EncounterIconFlex from './EncounterIconFlex.svelte'
	export let campaign: Campaign
	export let dropdownIndex: number = 0
	export let showName: boolean = false
	export let foresightChecked: boolean = false
	export let selectedForesightIndex: number = 0
	export let onChangeForesightIndex: (n: number) => void = (n) => {
		selectedForesightIndex = n
	}
	export let onChangeForesight: (c: boolean) => void = (c) => {
		foresightChecked = c
	}
	export let onDropdownIndexChanged: (n: number) => void = (n) => {
		dropdownIndex = n
	}
	$: selectedScenarioIndex = dropdownIndex

	const scenarioTransitions: ScenarioTransition[] = campaign.scenarioTransitions
	$: selectedScenarioTransition = scenarioTransitions[selectedScenarioIndex]

	let cannotForesight: boolean = false
	let foresightChoices: Scenario[] = []
	let oneChoice: boolean = false
	$: {
		foresightChoices = findForesightChoices(campaign, selectedScenarioTransition)
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
			onChangeForesightIndex(0)
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

	function onChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		onDropdownIndexChanged(parseInt(e.currentTarget.value))
	}

	function makeTransitionString(from: Scenario | null, to: Scenario | null): string {
		const arrow = from !== null && to !== null
		return (from?.name ?? '') + (arrow ? ' → ' : '') + (to?.name ?? '')
	}
	$: ti = makeTransitionInfo(
		selectedScenarioTransition.from,
		selectedScenarioTransition.to,
		foresighting,
	)
</script>

<div>
	<span>Transition</span>
	<select name="transitions" value={selectedScenarioIndex} on:change={(e) => onChangeHandler(e)}>
		{#each scenarioTransitions as s, i}
			<option value={i}>{makeTransitionString(s.from, s.to)}</option>
		{/each}
	</select>

	{#if !cannotForesight}
		<Checkbox
			label={'Foresight'}
			checked={foresightChecked}
			onCheckChanged={(c) => {
				onChangeForesight(c)
			}}
		/>
		{#if onlyForesightChoice !== null}
			<span>
				( → {onlyForesightChoice.name})
			</span>
		{/if}
	{/if}
</div>

<ListDivider label={'Keep'} />
<EncounterIconFlex encounterSets={ti.keep} {showName} hideStartingEncoutnerSetNumber />
<ListDivider label={'Add'} />
<EncounterIconFlex
	encounterSets={ti.add}
	{showName}
	firstIsScenarioSet
	hideStartingEncoutnerSetNumber
/>
<ListDivider label={'Remove'} />
<EncounterIconFlex
	encounterSets={ti.remove}
	{showName}
	firstIsScenarioSet
	hideStartingEncoutnerSetNumber
/>
{#if foresighting !== null}
	<ListDivider label={'Remove to Foresight'} />
	<EncounterIconFlex
		encounterSets={ti.removeToForesight}
		{showName}
		hideStartingEncoutnerSetNumber
	/>
	<ListDivider label={'Add to Foresight'} />
	<EncounterIconFlex
		encounterSets={ti.addToForesight}
		{showName}
		firstIsScenarioSet
		hideStartingEncoutnerSetNumber
	/>
{/if}
