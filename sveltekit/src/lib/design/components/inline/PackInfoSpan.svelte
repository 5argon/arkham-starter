<script lang="ts" context="module">
	export interface PackInfoSpanItem {
		pack: CardPackIcon
		count?: number
	}
</script>

<script lang="ts">
	import { CardPackIcon } from '$lib/design/interface/card-pack'
	import PackIconWithHover from '../card/PackIconWithHover.svelte'
	export let items: PackInfoSpanItem[]
	$: filteredItems = items.filter(
		(i) => i.pack !== CardPackIcon.Unknown && i.pack !== CardPackIcon.RandomBasicWeakness,
	)
	$: packsSorted = filteredItems.sort((a, b) => {
		if (
			a.pack === CardPackIcon.NathanielCho ||
			a.pack === CardPackIcon.HarveyWalters ||
			a.pack === CardPackIcon.WinifredHabbamock ||
			a.pack === CardPackIcon.JacquelineFine ||
			a.pack === CardPackIcon.StellaClark
		) {
			// Starter pack always come last.
			return 1
		}
		return a.pack - b.pack
	})
</script>

<div class="packs">
	{#each packsSorted as p}
		<div class="one-pack">
			<PackIconWithHover pack={p.pack} count={p.count} />
		</div>
	{/each}
</div>

<style>
	.packs {
		display: flex;
		align-items: center;
		justify-items: center;
		width: 30px;
		border-radius: 2px;
	}
</style>
