<script lang="ts">
	import { EncounterSetFlag, type Campaign, type Scenario } from '$lib/core/campaign'
	import { findUniqueEncounters, findUniqueScenarios } from './campaign-analyze'
	import EncounterIcon from './EncounterIcon.svelte'
	import EncounterIconTableHeader from './EncounterIconTableHeader.svelte'
	import { createMatrixRows } from './matrix-row'
	export let campaign: Campaign
	export let showName: boolean = false
	export let onGoToScenario: (s: Scenario) => void = () => {
		// do nothing
	}
	$: scenarios = findUniqueScenarios(campaign)
	$: encounters = findUniqueEncounters(campaign)
	$: encountersReused = encounters.filter((x) => x.flag === undefined)
	$: encountersCore = encounters.filter((x) => x.flag === EncounterSetFlag.Core)
	$: encountersReturnTo = encounters.filter((x) => x.flag === EncounterSetFlag.ReturnTo)
	$: rows = createMatrixRows(scenarios, encountersReused, encountersReturnTo, encountersCore)
</script>

<div class="table-wrap">
	<table class:table-name-padding={showName}>
		<thead>
			<tr>
				<th class="sticky">Scenario</th>
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
			{#each rows as r}
				<tr>
					<td class="sticky scenario-name">{r.scenario.name}</td>
					<td>
						{#each r.specificSets as s}
							<EncounterIcon iconName={s.name} iconPath={s.icon} scenarioSet />
						{/each}
					</td>
					{#each r.orderedEncounterSets as o}
						{#if o !== null}
							<td
								><EncounterIcon
									iconName={o.name}
									iconPath={o.icon}
									coreSet={o.flag === EncounterSetFlag.Core}
									returnToSet={o.flag === EncounterSetFlag.ReturnTo}
								/></td
							>
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
		z-index: 9999;
		position: sticky;
		left: 0;
		background-color: rgba(255, 255, 255, 0.95);
	}

	.table-name-padding {
		padding-top: 90px;
	}

	.scenario-name {
		font-size: xx-small;
		height: 20px;
		white-space: nowrap;
		padding: 0px 8px;
	}

	tbody tr td {
		vertical-align: middle;
	}

	tbody tr:nth-child(odd) {
		background-color: rgba(147, 147, 147, 0.05);
	}

	tbody tr:nth-child(even) {
		background-color: rgba(147, 147, 147, 0.1);
	}
</style>
