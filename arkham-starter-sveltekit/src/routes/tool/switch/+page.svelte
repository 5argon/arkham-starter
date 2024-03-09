<script lang="ts">
	import { browser } from '$app/environment'
import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import CampaignSwitchingLayout from '$lib/design/pages/tool/switch/CampaignSwitchingLayout.svelte'
	import helpMd from '$lib/md/switch.md?raw'

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
	<title>arkham-starter.com | Tool | Campaign Switch</title>
</svelte:head>

<PageTitle subTitle="Tool" title={'Campaign Switch'} {helpMd} />

<CampaignSwitchingLayout protoString={importProto} />
