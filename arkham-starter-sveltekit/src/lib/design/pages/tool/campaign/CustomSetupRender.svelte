<script lang="ts">
	import {
		EncounterSetFlag,
		isEncounterSetWithModification,
		type ScenarioSetupSub,
	} from '$lib/core/campaign'
	import EncounterIconWithLabel from './EncounterIconWithLabel.svelte'
	import { gameComponentsToString } from './helper'

	export let setup: ScenarioSetupSub
	export let showName: boolean = false
	export let showSetCount: boolean = false
</script>

<ul class="custom-remove">
	{#if setup.customRemove !== undefined}
		<li>Take out {setup.customRemove?.count} cards. ({setup.customRemove.why})</li>
	{/if}
	{#if setup.additionalWeakness !== undefined || setup.gameComponentsPerDifficulty !== undefined}
		<li>Add on setup :</li>
	{/if}
	{#if setup.additionalWeakness !== undefined}
		<ul>
			<li>Basic Weakness : {setup.additionalWeakness.map((x) => x.trait).join(', ')}</li>
		</ul>
	{/if}
	{#if setup.gameComponentsPerDifficulty !== undefined}
		<table>
			<tr>
				<td class="min-diff">Easy</td><td /><td>
					{setup.gameComponentsPerDifficulty.easy !== undefined
						? gameComponentsToString(setup.gameComponentsPerDifficulty.easy)
						: '-'}</td
				>
				<td class="min-diff">Standard</td><td /><td>
					{setup.gameComponentsPerDifficulty.standard !== undefined
						? gameComponentsToString(setup.gameComponentsPerDifficulty.standard)
						: '-'}</td
				>
			</tr>
			<tr>
				<td class="min-diff">Hard</td><td /><td>
					{setup.gameComponentsPerDifficulty.hard !== undefined
						? gameComponentsToString(setup.gameComponentsPerDifficulty.hard)
						: '-'}</td
				>
				<td class="min-diff">Expert</td><td /><td>
					{setup.gameComponentsPerDifficulty.expert !== undefined
						? gameComponentsToString(setup.gameComponentsPerDifficulty.expert)
						: '-'}</td
				>
			</tr>
		</table>
	{/if}
	{#if setup.notes !== undefined}
		<li>Notes :</li>
		{#each setup.notes as n}
			<div class="note-pad">
				{#if n.encounterSet !== undefined}
					<EncounterIconWithLabel
						iconPath={n.encounterSet.icon}
						iconName={n.encounterSet.name}
						coreSet={n.encounterSet.flag === EncounterSetFlag.Core}
						returnToSet={n.encounterSet.flag === EncounterSetFlag.ReturnTo}
						scenarioSet={n.encounterSet.flag === EncounterSetFlag.Scenario}
						subText={n.what}
						{showName}
						disableHover
					/>
				{:else}
					<div class="sub-text">{n.what}</div>
				{/if}
			</div>
		{/each}
	{/if}
	{#if setup.specialGather !== undefined}
		<li>Additional cards :</li>
		{#each setup.specialGather as sg}
			{#if isEncounterSetWithModification(sg)}
				<EncounterIconWithLabel
					iconPath={sg.encounterSet.icon}
					iconName={sg.encounterSet.name}
					coreSet={sg.encounterSet.flag === EncounterSetFlag.Core}
					returnToSet={sg.encounterSet.flag === EncounterSetFlag.ReturnTo}
					scenarioSet={sg.encounterSet.flag === EncounterSetFlag.Scenario}
					subText={sg.what?.join(', ')}
					{showName}
					disableHover
				/>
			{:else}
				<EncounterIconWithLabel
					iconPath={sg.icon}
					iconName={sg.name}
					coreSet={sg.flag === EncounterSetFlag.Core}
					returnToSet={sg.flag === EncounterSetFlag.ReturnTo}
					scenarioSet={sg.flag === EncounterSetFlag.Scenario}
					{showName}
				/>
			{/if}
		{/each}
	{/if}
</ul>

<style>
	.min-diff {
		min-width: 60px;
		padding-left: 16px;
	}

	.custom-remove {
		color: grey;
		font-size: small;
	}

	.note-pad {
		padding: 8px 0px;
	}

	.sub-text {
		color: grey;
		font-size: 0.8rem;
	}

	ul {
		list-style: none;
		padding-inline-start: 0px;
	}
</style>
