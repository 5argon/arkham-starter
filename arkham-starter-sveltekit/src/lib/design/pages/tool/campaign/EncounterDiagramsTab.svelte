<script lang="ts">
	import {
		type Campaign,
		type EncounterSetItem,
		isEncounterSetWithModification,
	} from '$lib/core/campaign'
	import Button from '$lib/design/components/basic/Button.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'

	import { findUniqueScenarios, makeLongScenarioName } from './campaign-analyze'
	export let campaign: Campaign
	export let dropdownIndex: number = 0
	export let onDropdownIndexChanged: (n: number) => void = (n) => {
		dropdownIndex = n
	}
	$: selectedScenarioIndex = dropdownIndex
	$: scenarios = findUniqueScenarios(campaign)
	$: selectedScenario = scenarios[selectedScenarioIndex]

	function onChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		onDropdownIndexChanged(parseInt(e.currentTarget.value))
	}
</script>

<div class="dropdown">
	<Button
		label="Previous Scenario"
		disabled={selectedScenarioIndex === 0}
		onClick={() => {
			onDropdownIndexChanged(selectedScenarioIndex - 1)
		}}><FaIcon path={allIcons.arrowLeftBordered} /></Button
	>
	<span>Scenario</span>
	<select name="scenarios" value={selectedScenarioIndex} on:change={(e) => onChangeHandler(e)}>
		{#each scenarios as s, i}
			<option value={i}>{makeLongScenarioName(s)}</option>
		{/each}
	</select>
	<Button
		label="Next Scenario"
		disabled={selectedScenarioIndex === scenarios.length - 1}
		onClick={() => {
			onDropdownIndexChanged(selectedScenarioIndex + 1)
		}}><FaIcon path={allIcons.arrowRightBordered} /></Button
	>
</div>

{#if selectedScenario.diagram !== undefined}
	<p>
		This diagram full of cryptic information is not designed to completely replace the setup
		instructions in the scenario book. It is meant to make sense to someone who knows the scenario
		well to remind them of possible setup mistakes.
	</p>

	<div class="flex-diagram">
		<img
			class="diagram"
			src={'/image/custom/diagram/' + selectedScenario.diagram + '_A.webp'}
			alt="Setup Diagram (Front)"
		/>
		<img
			class="diagram"
			src={'/image/custom/diagram/' + selectedScenario.diagram + '_B.webp'}
			alt="Setup Diagram (Back)"
		/>
	</div>

	{#if campaign.setupReferenceGraphic !== undefined}
		<p>
			It is also designed in a card format with bleed for you to print for offline use. To download
			a higher resolution version, <b
				><a href={campaign.setupReferenceGraphic} target="_blank"
					>click here to go to Google Drive where I hosted them</a
				></b
			>.
		</p>
	{/if}
{:else}
	<p>I have not made a diagram for this scenario yet.</p>
{/if}

<style>
	.dropdown {
		margin: 4px 0px;
	}

	.flex-diagram {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.diagram {
		max-width: 450px;
	}
</style>
