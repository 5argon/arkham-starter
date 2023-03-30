<script context="module" lang="ts">
	import HorizontalRadio from '$lib/design/components/layout/HorizontalRadio.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import jsonDir from './divider-dir.json'

	interface Language {
		code: string
		text: string
	}

	interface DividerDir {
		folder: string
		items: string[]
	}
</script>

<script lang="ts">
	import Button from '$lib/design/components/basic/Button.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import { dividerData } from './divider-data'

	let selectedLanguageIndex = 0
	let selectedOuterIndex = 0
	let selectedInnerIndex = 0
	let inner = false
	let innerMost = false
	const languages: Language[] = [
		{ code: 'en', text: 'English' },
		{ code: 'de', text: 'German' },
		{ code: 'it', text: 'Italian' },
		{ code: 'ru', text: 'Russian' },
		{ code: 'es', text: 'Spanish' },
		{ code: 'fr', text: 'French' },
		{ code: 'pt', text: 'Portuguese' },
	]
	const dirs = jsonDir as DividerDir[]

	$: selectedLanguage = languages[selectedLanguageIndex]
	$: selectedOuter = dividerData[selectedOuterIndex]
	$: selectedInner = selectedOuter.items[selectedInnerIndex]
	let finalDisplays: string[] = []
	$: {
		if (selectedOuter.items.length > selectedInnerIndex) {
			const selectedInner = selectedOuter.items[selectedInnerIndex]
			const s = dirs.find((x) => x.folder === selectedInner.name + ' x' + selectedInner.count)
			if (s !== undefined) {
				finalDisplays = s.items.map((_, i) => {
					return getPreviewUrl(selectedLanguage.code, selectedInner.name, selectedInner.count, i)
				})
			}
		}
	}

	function getPreviewUrl(langCode: string, name: string, count: number, index: number): string {
		const nameAndCount = name + ' x' + count
		const dir = dirs.find((x) => x.folder === nameAndCount)
		if (dir !== undefined) {
			const url = [
				'/image',
				'divider',
				langCode,
				nameAndCount,
				langCode + '_' + name + '_' + dir.items[index],
			].join('/')
			return url
		}
		return ''
	}
</script>

<svelte:head>
	<title>arkham-starter.com | The 3mm Divider : Download</title>
</svelte:head>

<PageTitle title={'The 3mm Divider : Download'} />

<p>
	<a href="/divider">Back to the main divider page</a>
</p>

<ListDivider label="Select Language" />

<HorizontalRadio
	selectedIndex={selectedLanguageIndex}
	onSelectedIndexChanged={(i) => {
		selectedLanguageIndex = i
	}}
	items={languages.map((x) => ({ text: x.text }))}
/>

<ListDivider label="Select Divider" />

<div class="dd-frame">
	{#if !inner}
		<table>
			{#each dividerData as dd, outerIndex}
				<tr>
					<td>
						<Button
							label="Go Inside"
							onClick={() => {
								selectedOuterIndex = outerIndex
								inner = true
							}}
						/>
					</td>
					<td>
						<div class="dd-title">{dd.groupName}</div>
					</td>
					<td>
						<div class="dd-description">{dd.description}</div>
					</td>
				</tr>
			{/each}
		</table>
	{:else if !innerMost}
		<Button
			label="Go Back"
			onClick={() => {
				inner = false
			}}
		/>
		<h1>{selectedOuter.groupName}</h1>
		<p>{selectedOuter.description}</p>
		<table>
			<thead>
				<td />
				<td><span>Set Name</span></td>
				<td><span>Divider Count</span></td>
				<td><span>Preview</span></td>
			</thead>
			{#each selectedOuter.items as dd, innerIndex}
				<tr>
					<td>
						<Button
							label={'Download ' + selectedLanguage.text}
							onClick={() => {
								innerMost = true
								selectedInnerIndex = innerIndex
							}}
						/>
					</td>
					<td>
						{dd.name}
					</td>
					<td>
						{dd.count}
					</td>
					<td>
						<div class="preview-box">
							<img
								alt={'Preview'}
								class="preview"
								src={getPreviewUrl(selectedLanguage.code, dd.name, dd.count, 0)}
							/>
						</div>
					</td>
				</tr>
			{/each}
		</table>
	{:else}
		<div>
			<Button
				label="Go Back"
				onClick={() => {
					innerMost = false
				}}
			/>
		</div>
		<h1>{selectedOuter.groupName}</h1>
		<p>{selectedOuter.description}</p>
		<h2>{selectedInner.name}</h2>
		<div>
			Right click and Save Image As, or drag them out of browser to your computer. They are all full
			size image, just being displayed smaller in the browser.
		</div>

		<div class="flex-final-outer">
			{#each finalDisplays as fd}
				<img alt={'divider'} class="flex-final-inner final-display" src={fd} />
			{/each}
		</div>
	{/if}
</div>

<style>
	td {
		padding: 0px 8px;
	}

	.preview-box {
		width: 500px;
		height: 20px;
		overflow: hidden;
	}

	.preview {
		width: 500px;
	}

	.flex-final-outer {
		display: flex;
		flex-wrap: wrap;
	}

	.flex-final-inner {
		width: 400px;
		padding: 8px;
	}
</style>
