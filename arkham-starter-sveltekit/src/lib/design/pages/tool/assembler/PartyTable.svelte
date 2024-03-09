<script lang="ts">
	import type { GetDeckCardIdReturns } from '$lib/ahdb/public-api/high-level'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { Grouping, Sorting } from '$lib/deck-table/grouping'
	import type { Party } from '$lib/tool/overlap/overlap-helpers'

	import PartyRender from './PartyRender.svelte'

	export let parties: Party[]
	export let fullDatabase: FullDatabase
	export let popupDatabase: PopupDatabase
	export let groupings: Grouping[]
	export let sortings: Sorting[]
	export let onCopyMarkdown: (d: GetDeckCardIdReturns[]) => void
</script>

<table>
	<thead>
		<td class="comp">Team Composition</td>
		<td width={430}>Overlaps</td>
		<td width={200}>Required Expansions</td>
	</thead>
	<tbody>
		{#each parties as p}
			<PartyRender
				party={p}
				{popupDatabase}
				{fullDatabase}
				{groupings}
				{sortings}
				{onCopyMarkdown}
			/>
		{/each}
	</tbody>
</table>

<style>
	thead {
		font-size: larger;
		border-bottom: 1px solid black;
	}

	.comp {
		min-width: 200px;
	}
</style>
