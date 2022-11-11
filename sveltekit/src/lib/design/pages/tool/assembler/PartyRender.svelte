<script lang="ts">
	import type { Party } from '$lib/tool/overlap/overlap-helpers'
	import CardTableGrouped from '$lib/design/components/deck-table/CardTableGrouped.svelte'
	import PartyDeckEntry from './PartyDeckEntry.svelte'
	import type { FullDatabase } from '$lib/core/full-database'
	import { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
	import Button from '$lib/design/components/basic/Button.svelte'
	import PackInfoSpan from '$lib/design/components/inline/PackInfoSpan.svelte'
	import { CardPackIcon } from '$lib/design/interface/card-pack'

	export let party: Party
	export let fullDatabase: FullDatabase
	export let groupings: Grouping[]
	export let sortings: Sorting[]
</script>

<tr>
	<td class="outer-td">
		<table>
			{#each party.decks as d}
				<tr>
					<td class="author"> {d.userId === null ? 'Unpublished' : 'User: ' + d.userId}</td>
					<td>
						<PartyDeckEntry deck={d} {fullDatabase} />
					</td>
				</tr>
			{/each}
			<tr>
				<td />
				<td>
					<Button block label="Gather Cards" onClick={() => {}} />
				</td>
			</tr>
		</table>
	</td>
	<td class="outer-td">
		<CardTableGrouped
			toggleMap={{}}
			entries={party.overlaps}
			{groupings}
			{sortings}
			{fullDatabase}
			taboo={true}
			columns={[ExtraColumn.Label]}
		/>
	</td>
	<td class="outer-td">
		<PackInfoSpan
			items={[
				{ pack: CardPackIcon.RevisedCoreSet, count: 2 },
				{ pack: CardPackIcon.TheDunwichLegacy, count: 13 },
			]}
		/>
	</td>
</tr>

<style>
	table {
		width: 100%;
	}

	.outer-td {
		border-bottom: 1px solid rgba(0, 0, 0, 0.151);
		padding: 12px 0px;
	}

	.author {
		width: 50px;
		font-size: xx-small;
	}
</style>
