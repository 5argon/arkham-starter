<script lang="ts">
	import { LimitedTab } from '@5argon/arkham-ui'

	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'

	import type { ExploreLink } from './explore-input'
	import ExploreLinkTable from './ExploreLinkTable.svelte'

	export let links: ExploreLink[]
	export let popupDatabase: PopupDatabase
	export let fullDatabase: FullDatabase

	let sortedGeneral: ExploreLink[] = []
	let sortedCards: ExploreLink[] = []
	$: {
		const siteToScore = new Map<string, number>()
		links.forEach((x) => {
			siteToScore.set(x.site, 0)
		})
		// Give random scores for each creator except official one.
		siteToScore.forEach((_, site) => {
			if (site === 'Fantasy Flight Games') {
				siteToScore.set(site, -1)
			} else {
				siteToScore.set(site, Math.random())
			}
		})

		const sortedAll = links.sort((a, b) => {
			const scoreCompare = (siteToScore.get(a.site) ?? 0) - (siteToScore.get(b.site) ?? 0)
			if (scoreCompare !== 0) return scoreCompare
			if (a.date === undefined) return 1
			if (b.date === undefined) return -1
			if (a.date !== undefined && b.date !== undefined) {
				return new Date(b.date).getTime() - new Date(a.date).getTime()
			}
			return 0
		})
		sortedGeneral = sortedAll.filter((x) => x.cards === undefined)
		sortedCards = sortedAll.filter((x) => x.cards !== undefined)
	}
</script>

<p>
	Want some extra input for purchase decision, or just wanted to indulge in content creators talking
	or writing about cards inside this expansion? I have curated links from the internet as many as I could here.
</p>

<p>
	If you have created some contents about this expansion that you think could help others, you can
	help me add yours using GitHub. <a
		target="_blank"
		href="https://github.com/5argon/arkham-starter/tree/main/arkham-starter-sveltekit/src/lib/explore/external-links"
		>Learn how here.</a
	>
</p>

<LimitedTab>
	<div slot="tab1">General ({sortedGeneral.length})</div>
	<div slot="content1">
		<ExploreLinkTable links={sortedGeneral} {popupDatabase} {fullDatabase} />
	</div>
	<div slot="tab2">Specific Card ({sortedCards.length})</div>
	<div slot="content2">
		<ExploreLinkTable links={sortedCards} {popupDatabase} {fullDatabase} />
	</div>
</LimitedTab>
