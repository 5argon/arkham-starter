<script lang="ts">
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'

	import ListDivider, { ListDividerLevel } from '$lib/design/components/basic/ListDivider.svelte'
	import RadioGroup from '$lib/design/components/basic/RadioGroup.svelte'

	import { upgradeExport, type UpgradeExportRow } from '$lib/tool/script/export/export-tools'
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
{#if singleMode}
	<Checkbox
		checked={exportOptions.cardOptions?.bold ?? false}
		label="Bold"
		onCheckChanged={(c) => {
			const n = { ...exportOptions }
			if (exportOptions.cardOptions !== undefined) {
				exportOptions.cardOptions.bold = c
			}
			return n
		}}
	/>
	<RadioGroup
		onValueChanged={(v) => {
			const nu = { ...upgradeExportOptions }
			if (nu.simpleListOptions !== undefined) {
				nu.simpleListOptions.blockStyle = parseInt(v)
			}
			onChangeUpgradeExportOptions(nu)
		}}
		current={upgradeExportOptions.simpleListOptions?.blockStyle.toString() ?? ''}
		label="Style"
		radioId="style"
		choices={[
			{ label: 'List', value: '1' },
			{ label: 'List with horizontal lines', value: '2' },
			{ label: 'Bullet points', value: '3' },
			{ label: 'Table (with left-aligned empty column)', value: '4' },
			{ label: 'Table (with center-aligned empty column)', value: '5' },
		]}
	/>
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
