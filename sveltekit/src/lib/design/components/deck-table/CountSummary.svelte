<script lang="ts">
	import { coreToRcore } from '$lib/ahdb/conversion'

	import type { FullDatabase } from '$lib/core/full-database'
	import type { DecklistEntry } from '$lib/deck-table/decklist-entry'
	import type { Grouping, Sorting } from '$lib/deck-table/grouping'
	import { groupCards } from '$lib/deck-table/grouping/group-cards'
	import CountSummaryRender from './CountSummaryRender.svelte'

	export let entries: DecklistEntry[]
	$: entriesForwarded = entries.map<DecklistEntry>((x) => {
		return {
			...x,
			cardId: coreToRcore(x.cardId),
		}
	})
	export let groupings: Grouping[]
	export let sortings: Sorting[]
	export let fullDatabase: FullDatabase
	export let centered :boolean = false
	$: gc = groupCards(entriesForwarded, groupings, sortings, fullDatabase)
</script>

<table class:centered>
	<thead>
		<tr>
			<th class="grouping">Grouping</th>
			<th class="count">Count</th>
			<th class="count">Unique Count</th>
		</tr>
	</thead>
	<tbody>
		{#each gc as c}
			<CountSummaryRender group={c} level={0} />
		{/each}
	</tbody>
</table>

<style>
	th {
		font-size: larger;
		border-bottom: 1px solid black;
	}

	.grouping {
		text-align: left;
	}

	.count {
		text-align: right;
		padding-left: 16px;
	}

	.centered{
		margin: 0 auto;
	}
</style>
