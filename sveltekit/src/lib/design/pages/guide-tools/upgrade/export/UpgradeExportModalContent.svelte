<script lang="ts">
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'

	import ListDivider, { ListDividerLevel } from '$lib/design/components/basic/ListDivider.svelte'

	import { upgradeExport, type UpgradeExportRow } from '$lib/guide-tools/script/export/export-tools'
	import type { ExportOptions } from '$lib/proto/generated/export_options'
	import type { UpgradeExportOptions } from '$lib/proto/generated/upgrade_export'

	export let singleMode: boolean
	export let exportRows: UpgradeExportRow[]
	export let upgradeExportOptions: UpgradeExportOptions
	export let exportOptions: ExportOptions
	export let importDeckUrl: string
	export let onChangeUpgradeExportOptions: (n: UpgradeExportOptions) => void
	export let onChangeExportOptions: (n: ExportOptions) => void

	$: markdown = upgradeExport({
		upgradeExportOptions: upgradeExportOptions,
		exportOptions: exportOptions,
		upgradeRows: exportRows,
		importDeckUrl: importDeckUrl,
	})
</script>

<ListDivider label="Export Options" level={ListDividerLevel.One} />
<div>WIP! Not many things to adjust for now.</div>
{#if singleMode}
	<span />
{:else}
	<Checkbox
		checked={upgradeExportOptions.splitDivider}
		label="Split Divider"
		onCheckChanged={(e) => {
			const n = { ...upgradeExportOptions }
			n.splitDivider = e
			onChangeUpgradeExportOptions(n)
		}}
	/>
{/if}
<ListDivider label="Markdown" level={ListDividerLevel.One} />
<textarea rows={10}>{markdown}</textarea>

<style>
	textarea {
		width: 100%;
	}
</style>
