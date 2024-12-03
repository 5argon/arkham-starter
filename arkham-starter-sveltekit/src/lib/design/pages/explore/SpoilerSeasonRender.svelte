<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { ExploreInput } from '$lib/explore/explore-input'
	import SpoilerSeasonRenderItem from './SpoilerSeasonRenderItem.svelte'

	export let exploreInput: ExploreInput
	export let fdb: FullDatabase
	export let pdb: PopupDatabase
	const links = exploreInput.links?.filter((link) => link.spoilerCard === true)
	const sortedAll = links?.sort((a, b) => {
		if (a.date === undefined) return 1
		if (b.date === undefined) return -1
		if (a.date !== undefined && b.date !== undefined) {
			return new Date(b.date).getTime() - new Date(a.date).getTime()
		}
		return 0
	})
</script>

{#if sortedAll !== undefined}
	{#each sortedAll as link}
		<SpoilerSeasonRenderItem {pdb} {fdb} {link} />
	{/each}
{/if}
