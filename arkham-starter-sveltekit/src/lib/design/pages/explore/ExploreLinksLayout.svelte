<script lang="ts">
	import { iconToNameConversion } from '$lib/ahdb/conversion'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import { packToFile } from '$lib/design/components/expansion/pack-to-file'
	import type { ExploreInput } from '$lib/explore/explore-input'

	import ExploreLinks from '$lib/explore/ExploreLinks.svelte'
	import NavigationButton from '$lib/design/components/basic/NavigationButton.svelte'

	export let fdb: FullDatabase
	export let pdb: PopupDatabase
	export let pageTitle: string
	export let exploreInput: ExploreInput

	$: packBanner = packToFile(exploreInput.packs[0])
	$: packName = iconToNameConversion(exploreInput.packs[0])
	$: nonSpoilerLinks = exploreInput?.links?.filter((link) => !link.spoilerCard)
</script>

<NavigationButton href="/explore" label="Back to Explore Home" />

{#if packBanner !== null}
	<img
		class="pack-banner"
		src={'/image/expansion/investigator/' + packBanner + '.webp'}
		alt="pack banner"
	/>
{/if}

<h1>{packName}</h1>
<h2>Community Content Links</h2>

{#if nonSpoilerLinks !== undefined}
	<!-- That href is supposed to be self, but somehow it goes back? -->
	<NavigationButton center label={'Back to Explore ' + packName} href="." />
{/if}

{#if nonSpoilerLinks !== undefined}
	<ExploreLinks links={nonSpoilerLinks} popupDatabase={pdb} fullDatabase={fdb} />
{/if}

<style>
	.pack-banner {
		width: 400px;
		max-width: 100%;
		margin: 0 auto;
	}

	h1 {
		margin: 0 auto;
		text-align: center;
		margin-top: 8px;
	}

	h2 {
		margin: 0 auto;
		text-align: center;
		margin-bottom: 8px;
	}
</style>
