<script lang="ts">
	import { browser } from '$app/environment'
	import Button from '$lib/design/components/basic/Button.svelte'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import ListDivider, { ListDividerLevel } from '$lib/design/components/basic/ListDivider.svelte'
	import RadioGroup from '$lib/design/components/basic/RadioGroup.svelte'
	import TextBox from '$lib/design/components/basic/TextBox.svelte'
	import type { ExportOptions } from '$lib/proto/generated/export_options'
	import {
		type UpgradeExportOptions,
		UpgradeExportOptions_UpgradeExportStyle,
	} from '$lib/proto/generated/upgrade_export'
	import {
		makeUpgradePlannerUrl,
		type UpgradeExport,
		upgradeExportCenter,
		type UpgradeExportRow,
		upgradeExportToProtoString,
	} from '$lib/tool/script/export/export-tools-center'

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

	$: exportText = upgradeExportCenter(ue)
	$: dataCode = upgradeExportToProtoString(ue)
	$: link = makeUpgradePlannerUrl(dataCode)
	let exportStyleDescription: string
	$: {
		const currentExportStyle = upgradeExportOptions.upgradeExportStyle
		switch (currentExportStyle) {
			case UpgradeExportOptions_UpgradeExportStyle.MarkdownArkhamDb:
				exportStyleDescription =
					"For pasting in arkhamdb.com's Description area. It uses some HTML in addition to Markdown to share the same style sheet coloring as the site, therefore these would only be effective when viewing directly on the site itself."
				break
			case UpgradeExportOptions_UpgradeExportStyle.MarkdownArkhamCards:
				exportStyleDescription =
					"For pasting in arkhamdb.com's Description area that is intended to be synched into ArkhamCards app (decks you cloned to add to your campaign), which simplifies the export a bit. If you just use arkhamdb.com format, deck description viewer in ArkhamCards cannot understand site's style sheet along with many HTML objects, and two column table is difficult to view on vertical phone screen when using the app."
				break
			default:
				exportStyleDescription = ''
				break
		}
	}

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
<div>
	Export Format
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
	</select>
	<p>
		{exportStyleDescription}
	</p>
</div>
{#if singleMode && upgradeExportOptions.upgradeExportStyle === UpgradeExportOptions_UpgradeExportStyle.MarkdownArkhamDb}
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
	<Checkbox
		checked={exportOptions.cardOptions?.classIcons ?? false}
		label="Class Icon"
		onCheckChanged={(c) => {
			const n = { ...exportOptions }
			if (exportOptions.cardOptions !== undefined) {
				exportOptions.cardOptions.classIcons = c
			}
			return n
		}}
	/>
	<Checkbox
		checked={exportOptions.cardOptions?.expansion ?? false}
		label="Expansion Name"
		onCheckChanged={(c) => {
			const n = { ...exportOptions }
			if (exportOptions.cardOptions !== undefined) {
				exportOptions.cardOptions.expansion = c
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
{:else if upgradeExportOptions.upgradeExportStyle === UpgradeExportOptions_UpgradeExportStyle.MarkdownArkhamDb}
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
	<ListDivider label="Link" level={ListDividerLevel.One} />
	<p>
		Keep it to come back to this page later and continue editing, or to share your upgrade idea to
		others where exported text does not work. Also there is already a link added in arkhamdb.com
		export format. (If "Show Link" is not used, the link is hidden in the Markdown comment that only
		you can see.)
	</p>
	<Button label="Copy To Clipboard" onClick={() => copyToClipboard(link)} />
	<textarea rows={5}>{link}</textarea>

	<ListDivider label="Data Code" level={ListDividerLevel.One} />
	<p>
		It represent an entire data that you worked on on this page. It is part of the link that made it
		able to restore your session. Currently it has no use but it will in my finished site.
	</p>
	<Button label="Copy To Clipboard" onClick={() => copyToClipboard(dataCode)} />
	<textarea rows={5}>{dataCode}</textarea>
{/if}

<style>
	textarea {
		width: 100%;
	}
</style>
