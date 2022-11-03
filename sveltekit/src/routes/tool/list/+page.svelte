<script lang="ts">
	import UpgradeLayout from '$lib/design/pages/tool/upgrade/layout/UpgradeLayout.svelte'
	import help from '$lib/md/list.md?raw'
</script>

<svelte:head>
	<title>arkham-starter.com | Tool | Card List</title>
</svelte:head>

<UpgradeLayout pageTitle="Card List" helpMd={help} singleMode={true} />