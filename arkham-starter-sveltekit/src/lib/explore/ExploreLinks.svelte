<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import LimitedTab from '$lib/design/components/layout/LimitedTab.svelte'
	import ExploreLinkTable from './ExploreLinkTable.svelte'
	import type { ExploreLink } from './explore-input'

	export let links: ExploreLink[]
	export let popupDatabase: PopupDatabase
	export let fullDatabase: FullDatabase

	let sortedGeneral: ExploreLink[] = []
	let sortedCards: ExploreLink[] = []
	$: {
		const sortedAll = links.sort((a, b) => {
			// Official stuff wins
			const ffg = 'Fantasy Flight Games'
			if (a.site === ffg) {
				return -1
			}
			if (b.site === ffg) {
				return 1
			}
			const localeCompare = a.site.localeCompare(b.site)
			if (localeCompare !== 0) return localeCompare
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
	I've collected some links for you to indulge in content creators talking or writing about cards
	inside this expansion!
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
