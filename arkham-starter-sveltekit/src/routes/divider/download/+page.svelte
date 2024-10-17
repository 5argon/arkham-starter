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
		{ code: 'pl', text: 'Polish' },
		{ code: 'cs', text: 'Czech' },
		{ code: 'th', text: 'Thai' },
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

<p>
	I'm moving the hosting of dividers to Google Drive. There you could batch download the whole
	folder easier with the right click menu. You can also switch from list view to thumbnail view.
</p>

<Button
	label="Go to Google Drive"
	big
	onClick={() => {
		window.open(
			'https://drive.google.com/drive/folders/1WdXXcRYv4CfTCN_XUb29eX-e84oXxazp?usp=share_link',
			'_blank',
		)
	}}
/>

<ListDivider label="Available Languages" />

<ul>
	{#each languages as l}
		<li>{l.text} (Folder: {l.code})</li>
	{/each}
</ul>

<ListDivider label="Premade PDF (English Only)" />

<img alt="PDF" src="/image/documentation/divider/pdf.webp" />

<p>
	Instead of picking individual graphics, these are PDF files with graphics already laid out and cut
	lines extended to the paper's edge. When print shop see this file, they will be happy as layout
	work is saved for them, and likely willing to cut them for you since the cut lines are there.
</p>

<p>
	The disadvantage is that I cannot maintain this for all languages, you might not want all of what
	I decided to pack in, and also paper size is locked to A4. This make it inefficient for print shop
	that can print larger size to fit more dividers.
</p>

<ul>
	<li>
		<a
			href="https://drive.google.com/file/d/1wN-ZsYtzIhRgoL4iMHm4BPDhHOXTR5l0/view?usp=share_link"
			target="_blank"
			><b>Massive All Campaign Dividers (Night of the Zealot to The Feast of Hemlock Vale)</b></a
		>. 25 pages, 197 dividers, 277.9 MB.
	</li>
</ul>

<style>
	img {
		max-width: 400px;
		margin: 0 auto;
	}
</style>
