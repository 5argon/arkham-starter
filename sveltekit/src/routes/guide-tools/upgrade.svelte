<script context="module" lang="ts">
	export async function load({ url }) {
		const importProto = url.searchParams.get('i')
		return {
			props: {
				importProto,
			},
		}
	}
</script>

<script lang="ts">
	import UpgradeLayout from '$lib/design/pages/guide-tools/upgrade/layout/UpgradeLayout.svelte'
	import help from '$lib/md/upgrade.md?raw'
	export let importProto: string
</script>

<UpgradeLayout pageTitle="Upgrade Planner" helpMd={help} singleMode={false} {importProto} />
