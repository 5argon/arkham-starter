<script lang="ts">
	import { browser } from '$app/environment'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import PartyAssemblerLayout from '$lib/design/pages/tool/assembler/PartyAssemblerLayout.svelte'
	import helpMd from '$lib/md/assembler.md?raw'

	import type { PageData } from './$types'

	export let data: PageData

	let importProto: string | null = null
	$: {
		// Client side URL parameter reading to trigger reactive changes.
		// This way we can still pre-render this page.
		if (browser) {
			importProto = new URL(window.location.href).searchParams.get('i')
		}
	}
</script>

<svelte:head>
	<title>arkham-starter.com | Tool | Team Assembler</title>
</svelte:head>

<PageTitle subTitle="Tool" title={'Team Assembler'} {helpMd} />

<PartyAssemblerLayout fdb={data.fdb} pdb={data.pdb} protoString={importProto} />
