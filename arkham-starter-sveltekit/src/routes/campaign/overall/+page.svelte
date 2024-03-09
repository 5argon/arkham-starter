<script lang="ts" context="module">
	interface OverallRow {
		campaign: Campaign
		columns: (EncounterSet | null)[]
	}
</script>

<script lang="ts">
	import { allCampaigns } from '$lib/campaign/all-campaign'
	import {
		type Campaign,
		type EncounterSet,
		EncounterSetFlag,
		EncounterSetSorting,
	} from '$lib/core/campaign'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import {
		findCoreEncounters,
		mergeEncountersPure,
		sortEncounters,
	} from '$lib/design/pages/tool/campaign/campaign-analyze'
	import EncounterIcon from '$lib/design/pages/tool/campaign/EncounterIcon.svelte'
	import EncounterIconTableHeader from '$lib/design/pages/tool/campaign/EncounterIconTableHeader.svelte'
	import { makeSetCountText } from '$lib/design/pages/tool/campaign/helper'

	const showName = true
	const ac = allCampaigns
	let rows: OverallRow[] = []
	let allCores: EncounterSet[] = []
	$: {
		allCores = sortEncounters(
			mergeEncountersPure(ac.flatMap<EncounterSet>((x) => findCoreEncounters(x))),
			EncounterSetSorting.Alphabetical,
			{},
		)
		rows = ac.map((x) => {
			const coreEncounters = findCoreEncounters(x)
			const columns = allCores.map<EncounterSet | null>((y) => {
				if (coreEncounters.includes(y)) {
					return y
				}
				return null
			})
			const r: OverallRow = {
				campaign: x,
				columns: columns,
			}
			return r
		})
	}
</script>

<t>
	This is a page that summarizes encounter sets usage for all campaigns of Arkham Horror: The Card
	Game.
</t>

<a href="/campaign">Back to Campaign List</a>

<ListDivider label="Core Encounter Set Usage" />

<div class="table-wrap">
	<table class:table-name-padding={showName}>
		<thead>
			<tr>
				<th class="sticky" />
				{#each allCores as e}
					<th><EncounterIconTableHeader encounterSet={e} {showName} /></th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as r}
				<tr>
					<td class="sticky scenario-name" on:click={() => {}}> {r.campaign.name}</td>
					{#each r.columns as o}
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
