<script lang="ts">
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'

	import ListDivider, { ListDividerLevel } from '$lib/design/components/basic/ListDivider.svelte'

	import { upgradeExport, type UpgradeExportRow } from '$lib/guide-tools/script/export/export-tools'

	import type { ExportOptions, UpgradeExportOptions } from '$lib/guide-tools/script/export/options'

	export let exportRows: UpgradeExportRow[]
	export let upgradeExportOptions: UpgradeExportOptions
	export let exportOptions: ExportOptions
	export let onChangeUpgradeExportOptions: (n: UpgradeExportOptions) => void
	export let onChangeExportOptions: (n: ExportOptions) => void

	$: markdown = upgradeExport(upgradeExportOptions, exportOptions, exportRows)
</script>

<ListDivider label="Export Options" level={ListDividerLevel.One} />
<div>WIP! You can't adjust anything for now.</div>
<Checkbox
	checked={upgradeExportOptions.splitDivider}
	label="Split Divider"
	onCheckChanged={(e) => {
		const n = { ...upgradeExportOptions }
		n.splitDivider = e
		onChangeUpgradeExportOptions(n)
	}}
/>
<ListDivider label="Markdown" level={ListDividerLevel.One} />
<textarea rows={10}>{markdown}</textarea>

<style>
	textarea {
		width: 100%;
	}
</style>
