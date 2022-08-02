<script lang="ts">
	import type { Campaign, Scenario, ScenarioTransition } from '$lib/core/campaign'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import { makeTransitionInfo } from './campaign-analyze'
	import EncounterIconFlex from './EncounterIconFlex.svelte'
	export let campaign: Campaign
	export let dropdownIndex: number = 0
	export let showName: boolean = false
	export let onDropdownIndexChanged: (n: number) => void = (n) => {
		dropdownIndex = n
	}
	$: selectedScenarioIndex = dropdownIndex

	const scenarios: ScenarioTransition[] = campaign.scenarioTransitions
	$: selectedScenario = scenarios[selectedScenarioIndex]

	function onChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		onDropdownIndexChanged(parseInt(e.currentTarget.value))
	}

	function makeTransitionString(from: Scenario | null, to: Scenario | null): string {
		const arrow = from !== null && to !== null
		return (from?.name ?? '') + (arrow ? ' → ' : '') + (to?.name ?? '')
	}
	$: ti = makeTransitionInfo(selectedScenario.from, selectedScenario.to)
</script>

<span>Transition</span>
<select name="transitions" value={selectedScenarioIndex} on:change={(e) => onChangeHandler(e)}>
	{#each scenarios as s, i}
		<option value={i}>{makeTransitionString(s.from, s.to)}</option>
	{/each}
</select>

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
