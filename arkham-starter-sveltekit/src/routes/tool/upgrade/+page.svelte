<script lang="ts">
	import { browser } from '$app/environment'
import UpgradeLayout from '$lib/design/pages/tool/upgrade/layout/UpgradeLayout.svelte'
	import help from '$lib/md/upgrade.md?raw'

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
	<title>arkham-starter.com | Guide Tools | Upgrade Planner</title>
</svelte:head>

<UpgradeLayout pageTitle="Upgrade Planner" helpMd={help} singleMode={false} {importProto} />
