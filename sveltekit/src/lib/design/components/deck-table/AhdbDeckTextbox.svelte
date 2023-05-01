<script lang="ts">
	import {
		extractDeckFromUrl,
		getDeckCardIds,
		type CardAndAmount,
		type GetDeckCardIdReturns,
		type ExtractResult,
	} from '$lib/ahdb/public-api/high-level'
	import TextBox, { EditingLevel, NoticeLevel } from '../basic/TextBox.svelte'

	let loading: boolean
	let noticeText: string | null = null
	let noticeLevel: NoticeLevel = NoticeLevel.Normal
	export let customCurrentText: string = ''
	export let noImport: boolean = false

	export let onChangeImportText: (t: string) => void = () => {
		// do nothing
	}

	export let onExtractDeck: (ex: ExtractResult) => void = () => {
		// do nothing
	}
	export let onImportDeck: (gd: GetDeckCardIdReturns) => void = () => {
		// do nothing
	}

	async function submit(n: string) {
		onChangeImportText(n)
		if (n.trim() === '') {
			return
		}
		loading = true
		const extractResult = extractDeckFromUrl(n)
		onExtractDeck(extractResult)
		if (noImport) {
			loading = false
		} else {
			const cards = await getDeckCardIds(extractResult.deck, extractResult.published)
			loading = false
			if (cards === null) {
				noticeLevel = NoticeLevel.Error
				noticeText =
					'Deck not found. If importing an unpublished deck, check your user settings to make it public.'
				return
			}
			onImportDeck(cards)
			noticeLevel = NoticeLevel.Success
			noticeText = 'Import successful : ' + cards.deck
		}
	}
</script>

<TextBox
	enableNotice
	placeholderText={'Deck ID (prefix p: if published) or Deck URL.'}
	submitButtonText={'Import'}
	{noticeLevel}
	{noticeText}
	spinnerText={loading ? 'Importing a deck...' : null}
	currentText={customCurrentText}
	editingLevel={EditingLevel.Editable}
	label={'Import Deck'}
	onChange={onChangeImportText}
	onEndEdit={onChangeImportText}
	onSubmit={submit}
/>
