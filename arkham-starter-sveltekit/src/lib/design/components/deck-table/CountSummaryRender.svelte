<script context="module" lang="ts">
	function recursiveCounting(group: GroupedCards): { count: number; uniqueCount: number } {
		let count = 0
		let uniqueCount = 0
		const uniqueCards = new Set<string>()
		for (let i = 0; i < group.entries.length; i++) {
			const e = group.entries[i]
			if (isEntry(e)) {
				uniqueCards.add(e.cardId)
				count = count + e.amount
			} else {
				const recurseResult = recursiveCounting(e)
				count = count + recurseResult.count
				uniqueCount = uniqueCount + recurseResult.uniqueCount
			}
		}
		uniqueCount = uniqueCount + Array.from(uniqueCards).length
		return {
			count: count,
			uniqueCount: uniqueCount,
		}
	}
</script>

<script lang="ts">
	import { type GroupedCards,isEntry } from '$lib/deck-table/decklist-entry'
	export let group: GroupedCards
	export let level: number
	var count: number = 0
	var uniqueCount: number = 0
	$: {
		const counted = recursiveCounting(group)
		count = counted.count
		uniqueCount = counted.uniqueCount
	}
</script>

<tr>
	<th class="group-name" class:small={level >= 1} style={'padding-left:' + level * 12 + 'px;'}>{group.groupName}</th>
	<td class="count" class:small={level >= 1}>{count}</td>
	<td class="count" class:small={level >= 1}>{uniqueCount}</td>
</tr>
{#each group.entries as ent}
	{#if !isEntry(ent)}
		<svelte:self group={ent} level={level + 1} />
	{/if}
{/each}

<style>
	.small {
		font-size: smaller;
		color: grey;
	}

	th {
		border-bottom: 1px solid rgba(0, 0, 0, 0.151);
	}

	td {
		border-bottom: 1px solid rgba(0, 0, 0, 0.151);
	}

	.group-name {
		text-align: left;
	}

	.count {
		text-align: right;
	}
</style>
