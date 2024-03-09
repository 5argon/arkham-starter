<script lang="ts">
	import {
		type Campaign,
		EncounterSetFlag,
		EncounterSetSorting,
		type Scenario,
	} from '$lib/core/campaign'

	import {
		findFrequencies,
		findUniqueEncounters,
		findUniqueScenarios,
		sortEncounters,
	} from './campaign-analyze'
	import EncounterIcon from './EncounterIcon.svelte'
	import EncounterIconTableHeader from './EncounterIconTableHeader.svelte'
	import { makeSetCountText } from './helper'
	import { createMatrixRows } from './matrix-row'
	export let campaign: Campaign
	export let sorting: EncounterSetSorting = EncounterSetSorting.Alphabetical
	export let showName: boolean = false
	export let shortScenarioName: boolean = false
	export let onGoToScenario: (s: Scenario) => void = () => {
		// do nothing
	}
	$: scenarios = findUniqueScenarios(campaign)
	$: uniqueEncounters = findUniqueEncounters(campaign)
	$: frequencies = findFrequencies(scenarios)
	$: encounters = sortEncounters(uniqueEncounters, sorting, frequencies)
	$: encountersReused = encounters.filter((x) => x.flag === undefined)
	$: encountersCore = encounters.filter((x) => x.flag === EncounterSetFlag.Core)
	$: encountersReturnTo = encounters.filter((x) => x.flag === EncounterSetFlag.ReturnTo)
	$: rows = createMatrixRows(scenarios, encountersReused, encountersReturnTo, encountersCore)
</script>

<div class="table-wrap">
	<table class:table-name-padding={showName}>
		<thead>
			<tr>
				<th class="sticky" />
				<th />
				{#each encountersReused as e}
					<th><EncounterIconTableHeader encounterSet={e} {showName} /></th>
				{/each}
				{#each encountersReturnTo as e}
					<th><EncounterIconTableHeader encounterSet={e} {showName} /></th>
				{/each}
				{#each encountersCore as e}
					<th><EncounterIconTableHeader encounterSet={e} {showName} /></th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as r, i}
				<tr>
					<td
						class="sticky scenario-name"
						on:click={() => {
							onGoToScenario(r.scenario)
						}}
					>
						{shortScenarioName ? r.scenario.shortName ?? i + 1 : r.scenario.name}</td
					>
					<td class="specific-sets" class:no-specific-sets={r.specificSets.length == 0}>
						{#each r.specificSets as s}
							<div class="block-wrap">
								<EncounterIcon
									iconName={s.name}
									subText={makeSetCountText(s)}
									iconPath={s.icon}
									scenarioSet
									enableHover
								/>
							</div>
						{/each}
					</td>
					{#each r.orderedEncounterSets as o}
						{#if o !== null}
							<td>
								<div class="block-wrap">
									<EncounterIcon
										iconName={o.name}
										iconPath={o.icon}
										subText={makeSetCountText(o)}
										coreSet={o.flag === EncounterSetFlag.Core}
										returnToSet={o.flag === EncounterSetFlag.ReturnTo}
										enableHover
									/>
								</div>
							</td>
						{:else}
							<td />
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	table {
		display: block;
		overflow: auto;
		padding-top: 25px;
	}

	.sticky {
		z-index: 1;
		position: sticky;
		left: 0;
		background-color: rgba(255, 255, 255, 0.95);
	}

	.table-name-padding {
		padding-top: 110px;
	}

	.scenario-name {
		font-size: xx-small;
		height: 20px;
		white-space: nowrap;
		padding: 0px 8px;
		cursor: pointer;
	}

	.scenario-name:hover {
		text-decoration: underline;
	}

	tbody tr td {
		width: 28px;
		height: 28px;
		vertical-align: middle;
	}

	.specific-sets {
		width: unset;
	}

	.no-specific-sets {
		width: unset;
		height: unset;
	}

	.block-wrap {
		display: inline-flex;
		width: 28px;
		height: 28px;
		justify-content: center;
		align-items: center;
	}

	tbody tr:nth-child(odd) {
		background-color: rgba(147, 147, 147, 0.05);
	}

	tbody tr:nth-child(even) {
		background-color: rgba(147, 147, 147, 0.1);
	}
</style>
