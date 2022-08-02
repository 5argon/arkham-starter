<script lang="ts">
	import type { Campaign, Scenario } from '$lib/core/campaign'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import { findUniqueScenarios } from './campaign-analyze'
	import EncounterIconFlex from './EncounterIconFlex.svelte'
	export let campaign: Campaign
	export let showName: boolean = false
	export let dropdownIndex: number = 0
	export let onDropdownIndexChanged: (n: number) => void = (n) => {
		dropdownIndex = n
	}
	$: selectedScenarioIndex = dropdownIndex

	let scenarios: Scenario[]
	$: {
		scenarios = findUniqueScenarios(campaign)
	}
	$: selectedScenario = scenarios[selectedScenarioIndex]

	$: count = selectedScenario.encounterSets.reduce<number>((p, c) => {
		return p + (c.startingEncounterDeckCount ? c.startingEncounterDeckCount : c.count)
	}, 0)

	function onChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		onDropdownIndexChanged(parseInt(e.currentTarget.value))
	}
</script>

<span>Scenario</span>
<select name="scenarios" value={selectedScenarioIndex} on:change={(e) => onChangeHandler(e)}>
	{#each scenarios as s, i}
		<option value={i}>{s.name}</option>
	{/each}
</select>

<ListDivider label={'Starting Encounter Deck (' + count + ' Cards)'} />
<EncounterIconFlex encounterSets={selectedScenario.encounterSets} {showName} firstIsScenarioSet />

{#if selectedScenario.encounterSetsSecondary !== undefined}
	<ListDivider label={'Set aside'} />
	<EncounterIconFlex encounterSets={selectedScenario.encounterSetsSecondary} {showName} />
{/if}
