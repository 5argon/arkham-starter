<script lang="ts">
	import { fly } from 'svelte/transition'

	import type { CardAndAmount } from '$lib/ahdb/public-api/high-level'
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
	import ListDivider, { ListDividerLevel } from '$lib/design/components/basic/ListDivider.svelte'
	import TextBox, { EditingLevel, NoticeLevel } from '$lib/design/components/basic/TextBox.svelte'
	import UnknownCardBlock from '$lib/design/components/card/UnknownCardBlock.svelte'
	import type { GlobalSettings } from '$lib/proto/generated/global_settings'

	import CardBlockLeftRight from './CardBlockLeftRight.svelte'

	export let singleMode: boolean = false
	export let globalSettings: GlobalSettings
	export let label: string
	export let popupDatabase: PopupDatabase
	export let stagingCards: CardAndAmount[] = []

	let addCardTextboxText: string = ''

	let cards: (PopupDatabaseItem | null)[]
	$: {
		cards = stagingCards.map((x) => popupDatabase.getById(x.cardId))
	}
	export let onAddStagingCards: (cardId: CardAndAmount) => void = () => {
		// do nothing
	}
	export let onAddToLeftSide: (cardId: string) => void = () => {
		// do nothing
	}
	export let onAddToRightSide: (cardId: string) => void = () => {
		// do nothing
	}

	let cardNoticeString: string | null = null
	let noticeLevel: NoticeLevel = NoticeLevel.Normal
	function addCardInputHandling(s: string) {
		s = s.trim()
		if (s.length === 0) {
			return
		}
		const card = popupDatabase.getById(s)
		if (card !== null) {
			cardNoticeString = 'Found and added a card : ' + card.original.n
			noticeLevel = NoticeLevel.Success
			onAddStagingCards({ cardId: card.original.id, amount: 1 })
			addCardTextboxText = ''
		} else {
			cardNoticeString = 'Card with ID ' + s + ' not found.'
			noticeLevel = NoticeLevel.Error
		}
	}
</script>

<div class="stack-padding">
	{#if stagingCards.length > 0}
		<ListDivider {label} level={ListDividerLevel.One} />
	{/if}
	{#each cards as c, i (c?.original.id ?? 0)}
		{#if c !== null}
			<div in:fly={{ y: -20, duration: 300 }}>
				<CardBlockLeftRight
					{singleMode}
					cardId={c.original.id}
					amount={stagingCards[i].amount}
					showImageStrip={true}
					collapse={true}
					text={c.original.n}
					subText={c.original.esn ? c.original.sn : null}
					class1={c.class1}
					class2={c.class2 ?? null}
					class3={c.class3 ?? null}
					exceptional={globalSettings.taboo ? c.original.ext : c.original.ex}
					restriction={c.original.ir ?? false}
					weakness={c.original.wk ?? false}
					customizable={c.original.cus !== undefined}
					permanent={c.original.pe ?? false}
					bonded={c.original.bd ?? false}
					xp={c.original.xp}
					xpTaboo={globalSettings.taboo ? c.original.xpat : null}
					onClickLeft={() => {
						if (c !== null) {
							onAddToLeftSide(c.original.id)
						}
					}}
					onClickRight={() => {
						if (c !== null) {
							onAddToRightSide(c.original.id)
						}
					}}
				/>
			</div>
		{:else}
			<UnknownCardBlock cardId={stagingCards[i].cardId} />
		{/if}
	{/each}
</div>

<style>
	.stack-padding {
		margin-bottom: 16px;
	}
	.add-card {
		margin-bottom: 8px;
	}
</style>
