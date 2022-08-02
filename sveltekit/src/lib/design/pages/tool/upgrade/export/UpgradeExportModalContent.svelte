<script lang="ts">
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'

	import ListDivider, { ListDividerLevel } from '$lib/design/components/basic/ListDivider.svelte'
	import RadioGroup from '$lib/design/components/basic/RadioGroup.svelte'

	import {
		makeUpgradePlannerUrl,
		upgradeExport,
		upgradeExportToProtoString,
		type UpgradeExport,
		type UpgradeExportRow,
	} from '$lib/tool/script/export/export-tools'
	import type { ExportOptions } from '$lib/proto/generated/export_options'
	import {
		UpgradeExportOptions_UpgradeExportStyle,
		type UpgradeExportOptions,
	} from '$lib/proto/generated/upgrade_export'
	import TextBox from '$lib/design/components/basic/TextBox.svelte'
	import { browser } from '$app/env'
	import Button from '$lib/design/components/basic/Button.svelte'

	export let singleMode: boolean
	export let exportRows: UpgradeExportRow[]
	export let upgradeExportOptions: UpgradeExportOptions
	export let exportOptions: ExportOptions
	export let importDeckUrl: string
	export let onChangeUpgradeExportOptions: (n: UpgradeExportOptions) => void
	export let onChangeExportOptions: (n: ExportOptions) => void

	let ue: UpgradeExport
	$: ue = {
		upgradeExportOptions: upgradeExportOptions,
		exportOptions: exportOptions,
		upgradeRows: exportRows,
		importDeckUrl: importDeckUrl,
	}

	$: exportText = upgradeExport(ue)
	$: dataCode = upgradeExportToProtoString(ue)
	$: link = makeUpgradePlannerUrl(dataCode)

	function copyToClipboard(s: string) {
		if (browser) {
			navigator.clipboard.writeText(s)
		}
	}

	function onUpgradeExportStyleChangedHandler(e: Event & { currentTarget: HTMLSelectElement }) {
		const n = { ...upgradeExportOptions }
		n.upgradeExportStyle = parseInt(e.currentTarget.value)
		onChangeUpgradeExportOptions(n)
	}
</script>

<ListDivider label="Text" level={ListDividerLevel.One} />
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
	<div>
		Style
		<select
			value={upgradeExportOptions.upgradeExportStyle ===
			UpgradeExportOptions_UpgradeExportStyle.Unknown
				? UpgradeExportOptions_UpgradeExportStyle.MarkdownArkhamDb
				: upgradeExportOptions.upgradeExportStyle}
			on:change={(e) => onUpgradeExportStyleChangedHandler(e)}
		>
			<option value={UpgradeExportOptions_UpgradeExportStyle.MarkdownArkhamDb}
				>Markdown (arkhamdb.com)</option
			>
			<option value={UpgradeExportOptions_UpgradeExportStyle.MarkdownArkhamCards}
				>Markdown (ArkhamCards)</option
			>
			<option value={UpgradeExportOptions_UpgradeExportStyle.Markdown}>Markdown</option>
			<option value={UpgradeExportOptions_UpgradeExportStyle.Forum}>Forum</option>
		</select>
	</div>
	<div>
		<Checkbox
			checked={upgradeExportOptions.splitDivider}
			label="Split Divider"
			onCheckChanged={(e) => {
				const n = { ...upgradeExportOptions }
				n.splitDivider = e
				onChangeUpgradeExportOptions(n)
			}}
		/>
	</div>
	<Checkbox
		checked={upgradeExportOptions.showLink}
		label="Show Link"
		onCheckChanged={(e) => {
			const n = { ...upgradeExportOptions }
			n.showLink = e
			onChangeUpgradeExportOptions(n)
		}}
	/>
	{#if upgradeExportOptions.showLink}
		<TextBox
			label={'Link Text'}
			currentText={upgradeExportOptions.showLinkText}
			onEndEdit={(e) => {
				const n = { ...upgradeExportOptions }
				n.showLinkText = e
				onChangeUpgradeExportOptions(n)
			}}
		/>
	{/if}
{/if}

<div>
	<Button label="Copy To Clipboard" onClick={() => copyToClipboard(exportText)} />
	<textarea rows={10}>{exportText}</textarea>
</div>

{#if !singleMode}
	<ListDivider label="Data Code" level={ListDividerLevel.One} />
	<Button label="Copy To Clipboard" onClick={() => copyToClipboard(dataCode)} />
	<textarea rows={5}>{dataCode}</textarea>

	<ListDivider label="Link" level={ListDividerLevel.One} />
	<Button label="Copy To Clipboard" onClick={() => copyToClipboard(link)} />
	<textarea rows={5}>{link}</textarea>
{/if}

<style>
	textarea {
		width: 100%;
	}
</style>
