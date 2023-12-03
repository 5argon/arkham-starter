<script lang="ts">
	import {
		isEncounterSetWithModification,
		type Campaign,
		type EncounterSetItem,
		type CustomRemove,
	} from '$lib/core/campaign'
	import { findUniqueScenarios, makeLongScenarioName } from './campaign-analyze'
	export let campaign: Campaign
	export let dropdownIndex: number = 0
	export let onDropdownIndexChanged: (n: number) => void = (n) => {
		dropdownIndex = n
	}
	$: selectedScenarioIndex = dropdownIndex
	$: scenarios = findUniqueScenarios(campaign)
	$: selectedScenario = scenarios[selectedScenarioIndex]

	function computeCount(esis: EncounterSetItem[], customRemove: CustomRemove | undefined): number {
		const count = esis.reduce<number>((p, c) => {
			if (!isEncounterSetWithModification(c)) {
				return p + c.count
			} else {
				const overwriteCount = c.overwriteCount
				if (overwriteCount !== undefined) {
					return p + overwriteCount
				}
				return p + c.encounterSet.count
			}
		}, 0)
		return count - (customRemove?.count ?? 0)
	}

	function onChangeHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		onDropdownIndexChanged(parseInt(e.currentTarget.value))
	}
</script>

<div class="dropdown">
	<span>Scenario</span>
	<select name="scenarios" value={selectedScenarioIndex} on:change={(e) => onChangeHandler(e)}>
		{#each scenarios as s, i}
			<option value={i}>{makeLongScenarioName(s)}</option>
		{/each}
	</select>
</div>

{#if selectedScenario.diagram !== undefined}
	<p>
		This diagram full of cryptic information is not designed to completely replace the setup
		instructions in the scenario book. It is meant to make sense to someone who knows the scenario
		well to remind them of possible setup mistakes.
	</p>

	<img
		class="diagram"
		src={'/image/custom/diagram/' + selectedScenario.diagram}
		alt="Setup Diagram"
	/>

	{#if campaign.setupReferenceGraphic !== undefined}
		<p>
			It is also designed in a card format with bleed for you to print for offline use. To download
			a higher resolution version with content of "Scenarios" tab on the other side of the
			same card, <b
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

	.diagram {
		width: 100%;
		max-width: 400px;
		display: block;
		margin: 0 auto;
	}
</style>
