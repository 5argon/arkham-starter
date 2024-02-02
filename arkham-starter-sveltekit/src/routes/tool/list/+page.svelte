<script lang="ts">
	import UpgradeLayout from '$lib/design/pages/tool/upgrade/layout/UpgradeLayout.svelte'
	import help from '$lib/md/list.md?raw'
</script>

<svelte:head>
	<title>arkham-starter.com | Tool | Colorful Card Lister</title>
</svelte:head>

<UpgradeLayout pageTitle="Colorful Card Lister" helpMd={help} singleMode={true} />
