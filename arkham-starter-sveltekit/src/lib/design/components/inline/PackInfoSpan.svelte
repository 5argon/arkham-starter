<script lang="ts" context="module">
	export interface PackInfoSpanItem {
		pack: CardPackIcon
		count?: number
	}
</script>

<script lang="ts">
	import { CardPack } from '$lib/design/interface/card-pack'

	import PackIconWithHover from '../card/PackIconWithHover.svelte'
	export let items: PackInfoSpanItem[]
	$: filteredItems = items.filter(
		(i) => i.pack !== CardPack.Unknown && i.pack !== CardPack.RandomBasicWeakness,
	)
	$: packsSorted = filteredItems.sort((a, b) => {
		if (
			a.pack === CardPack.NathanielCho ||
			a.pack === CardPack.HarveyWalters ||
			a.pack === CardPack.WinifredHabbamock ||
			a.pack === CardPack.JacquelineFine ||
			a.pack === CardPack.StellaClark
		) {
			// Starter pack always come last.
			return 1
		}
		return a.pack - b.pack
	})
</script>

<div class="packs">
	{#each packsSorted as p (p.pack)}
		<div class="one-pack">
			<PackIconWithHover pack={p.pack} count={p.count ?? null} />
		</div>
	{/each}
</div>

<style>
	.packs {
		display: flex;
		align-items: center;
		justify-items: center;
		border-radius: 2px;
	}
</style>
