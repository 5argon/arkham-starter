<script lang="ts">
	import {
		EncounterSetFlag,
		isEncounterSetWithModification,
		type ScenarioSetupSub,
	} from '$lib/core/campaign'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import {
		TextIcon,
		textIconFontClass,
		textIconToFontCharacter,
	} from '$lib/design/interface/text-icon'
	import EncounterIconWithLabel from './EncounterIconWithLabel.svelte'
	import GameComponentDisplay from './GameComponentDisplay.svelte'
	import { gameComponentsToString, gameComponentToString, gameComponentToTextIcon } from './helper'

	export let setup: ScenarioSetupSub
	export let showName: boolean = false
	export let showSetCount: boolean = false
	export let notCommon: boolean = false
</script>

<ul class="custom">
	{#if setup.additionalWeakness !== undefined || setup.gameComponents !== undefined || setup.gameComponentsPerDifficulty !== undefined}
		<li>Add on setup :</li>
	{/if}
	{#if setup.additionalWeakness !== undefined}
		<li class="level-two">
			<span class="topic"
				><span class="icon-shift"><FaIcon path={allIcons.weakness} /></span>Basic Weakness</span
			>
			<span>{setup.additionalWeakness.map((x) => x.trait).join(', ')}</span>
		</li>
	{/if}
	{#if setup.gameComponents !== undefined}
		<table>
			<tr>
				<td class="min-diff">All Difficulties : </td><td /><td>
					{#each setup.gameComponents as gc}
						<GameComponentDisplay gameComponent={gc} />
					{/each}
				</td>
			</tr>
		</table>
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
		{#if !notCommon}<li>Notes :</li>{/if}
		{#each setup.notes as n}
			<div class={notCommon ? 'note-pad-variant' : 'note-pad'}>
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
					{#if n.topic !== undefined}<span class="topic">{n.topic}</span>{/if}
					<span class="sub-text">{n.what}</span>
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

	.custom {
		color: grey;
		font-size: small;
	}

	.note-pad {
		padding: 8px 0px;
	}

	.note-pad-variant {
		padding-left: 16px;
	}

	.sub-text {
		color: grey;
		font-size: 0.8rem;
	}

	.icon-shift {
		padding-top: 2px;
		filter: contrast(0.2);
	}

	.topic {
		display: inline-flex;
		align-items: center;
		border: 1px solid rgba(0, 0, 0, 0.143);
		border-radius: 4px 0px 0px 4px;
		padding: 0px 6px;
		font-size: 0.8rem;
	}

	ul {
		list-style: none;
		padding-inline-start: 0px;
	}

	li {
		margin: 4px 0px;
	}

	.level-two {
		padding-left: 16px;
		margin-top: 0px;
	}
</style>
