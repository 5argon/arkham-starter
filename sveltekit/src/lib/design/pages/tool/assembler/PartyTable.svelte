<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import type { Grouping, Sorting } from '$lib/deck-table/grouping'
	import type { Party } from '$lib/tool/overlap/overlap-helpers'
	import PartyRender from './PartyRender.svelte'

	export let parties: Party[]
	export let fullDatabase: FullDatabase
	export let groupings: Grouping[]
	export let sortings: Sorting[]
</script>

<table>
	<thead>
		<td class="comp">Team Composition</td>
		<td width={430}>Overlaps</td>
		<td width={200}>Expansions</td>
	</thead>
	<tbody>
		{#each parties as p}
			<PartyRender party={p} {fullDatabase} {groupings} {sortings} />
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
