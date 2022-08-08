<script lang="ts">
	import {
		isEncounterSetWithModification,
		type Campaign,
		type EncounterSet,
		type Scenario,
	} from '$lib/core/campaign'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import { findUniqueScenarios, mergeEncounters } from './campaign-analyze'
	import EncounterIconFlex from './EncounterIconFlex.svelte'
	export let campaign: Campaign
	export let incomplete: boolean = false
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
		if (!isEncounterSetWithModification(c)) {
			return (
				p + (c.startingEncounterDeckCount !== undefined ? c.startingEncounterDeckCount : c.count)
			)
		} else {
			const starting = c.encounterSet.startingEncounterDeckCount
			const subtract = c.subtractCount
			const overwriteCount = c.overwriteCount
			if (overwriteCount !== undefined) {
				return p + overwriteCount
			}
			return p + ((starting ? starting : c.encounterSet.count) - (subtract ?? 0))
		}
	}, 0)

	function onChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		onDropdownIndexChanged(parseInt(e.currentTarget.value))
	}
</script>

<div class="dropdown">
	<span>Scenario</span>
	<select name="scenarios" value={selectedScenarioIndex} on:change={(e) => onChangeHandler(e)}>
		{#each scenarios as s, i}
			<option value={i}>{s.name}</option>
		{/each}
	</select>
</div>

<ListDivider label={'Encounter Sets'} />
<EncounterIconFlex encounterSets={mergeEncounters(selectedScenario)} {showName} hideNumbers />

{#if !incomplete}
	<ListDivider label={'Starting Encounter Deck ( ' + count + ' cards )'} />
	<EncounterIconFlex encounterSets={selectedScenario.encounterSets} {showName} />

	{#if selectedScenario.encounterSetsSecondary !== undefined}
		<ListDivider label={'Set Aside'} />
		<EncounterIconFlex encounterSets={selectedScenario.encounterSetsSecondary} {showName} />
	{/if}
{/if}

<style>
	.dropdown {
		margin: 4px 0px;
	}
</style>
