<script lang="ts">
	import DeckViewer from '$lib/design/components/deck-viewer/DeckViewer.svelte'
	import type { PageData } from './$types'
	export let data: PageData
</script>

<DeckViewer fullDatabase={data.fdb} popupDatabase={data.pdb} published={true} />
