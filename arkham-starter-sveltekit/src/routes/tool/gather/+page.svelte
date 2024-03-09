<script lang="ts">
	import { browser } from '$app/environment'
import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import DeckGatherLayout from '$lib/design/pages/tool/gather/DeckGatherLayout.svelte'
	import helpMd from '$lib/md/gather.md?raw'

	import type { PageData } from './$types'

	export let data: PageData

	let p1: string | null = null
	let p2: string | null = null
	let p3: string | null = null
	let p4: string | null = null
	let p5: string | null = null
	let p6: string | null = null
	let p7: string | null = null
	let p8: string | null = null
	$: {
		if (browser) {
			p1 = new URL(window.location.href).searchParams.get('p1')
			p2 = new URL(window.location.href).searchParams.get('p2')
			p3 = new URL(window.location.href).searchParams.get('p3')
			p4 = new URL(window.location.href).searchParams.get('p4')
			p5 = new URL(window.location.href).searchParams.get('p5')
			p6 = new URL(window.location.href).searchParams.get('p6')
			p7 = new URL(window.location.href).searchParams.get('p7')
			p8 = new URL(window.location.href).searchParams.get('p8')
		}
	}
	function extract(s: string | null): string {
		if (s === null) {
			return ''
		}
		const published = s.startsWith('p-')
		return (published ? 'p:' : '') + s.replace('p-', '')
	}
</script>

<svelte:head>
	<title>arkham-starter.com | Tool | Deck Gather</title>
</svelte:head>

<PageTitle subTitle="Tool" title={'Deck Gather'} {helpMd} />

<DeckGatherLayout
	startingP1={extract(p1)}
	startingP2={extract(p2)}
	startingP3={extract(p3)}
	startingP4={extract(p4)}
	startingP5={extract(p5)}
	startingP6={extract(p6)}
	startingP7={extract(p7)}
	startingP8={extract(p8)}
	fdb={data.fdb}
	pdb={data.pdb}
/>
