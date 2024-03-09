<script lang="ts">
	import DeckViewerBuiltIn from '$lib/design/components/deck-viewer/DeckViewerBuiltIn.svelte'

	import type { PageData } from './$types'
	export let data: PageData
</script>

<DeckViewerBuiltIn
	fullDatabase={data.fdb}
	popupDatabase={data.pdb}
	deck={data.deck}
	ahst={data.ahst}
/>
