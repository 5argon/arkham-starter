<script lang="ts">
	import type { DecklistEntry } from '$lib/core/decklist-entry'
	import type { Grouping, Sorting } from '$lib/deck-table/grouping'
	export let entries: DecklistEntry[]
	export let groupings: Grouping[]
	export let sortings: Sorting[]
</script>