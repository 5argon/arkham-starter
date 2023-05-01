<script lang="ts">
	interface NewCust {
		checkedBoxes: number
		uncheckedBoxes: number
		text: string
	}

	import type { CustomizableMeta } from '$lib/ahdb/public-api/high-level'
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import CardSpan from '../card/CardSpan.svelte'

	export let taboo: boolean
	export let cardId: string
	export let amount: number | null
	export let customizableMetas: CustomizableMeta[] = []
	export let popupDatabase: PopupDatabase
	export let toggled: boolean
	export let onToggleChanged: undefined | ((t: boolean) => void) = undefined

	function handler(e: MouseEvent & { currentTarget: HTMLElement }) {
		onToggleChanged?.(!toggled)
	}
	let card: PopupDatabaseItem
	$: {
		card = popupDatabase.getByIdThrowNull(cardId)
	}
	let realCust: NewCust[] = []
	$: {
		const matchedCustomizables = customizableMetas.filter((x) => {
			return x.card === cardId && x.checked > 0
		})
		const newRealCust: NewCust[] = []
		matchedCustomizables.forEach((x) => {
			if (card.original.cus && card.original.cus.length > x.index) {
				const c = card.original.cus[x.index]
				newRealCust.push({ text: c.n, checkedBoxes: x.checked, uncheckedBoxes: c.xp - x.checked })
			}
		})
		realCust = newRealCust
	}
	let cardName: string
	$: {
		cardName = card.original.n
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class:toggle-div={onToggleChanged} class:toggle-div-on={toggled} on:click={handler}>
	<CardSpan
		{cardId}
		{amount}
		class1={card.class1}
		class2={card.class2 ?? null}
		class3={card.class3 ?? null}
		exceptional={taboo ? card.original.ext : card.original.ex}
		color={true}
		packIcon={card.packIcon}
		packNumber={card.original.ps}
		restriction={card.original.ir}
		showImageStrip
		text={cardName}
		subText={card.original.esn ? card.original.sn : null}
		weakness={card.original.wk}
		investigator={card.original.inv}
		xp={card.original.xp}
		xpTaboo={taboo ? card.original.xpat : null}
		customizable={card.original.cus !== undefined}
	/>
	{#if card.original.cus !== undefined}
		{#each realCust as rc}
			<div class="cust">
				<FaIcon path={allIcons.rightSingle} />
				<CardSpan
					{cardId}
					class1={card.class1}
					class2={card.class2 ?? null}
					class3={card.class3 ?? null}
					color={true}
					text={rc.text}
					checkedBoxes={rc.checkedBoxes}
					checkBoxes={rc.uncheckedBoxes}
				/>
			</div>
		{/each}
	{/if}
</div>

<style>
	.toggle-div {
		cursor: pointer;
		user-select: none;
	}

	.toggle-div-on {
		filter: grayscale() opacity(0.2);
	}

	.cust {
		display: flex;
	}
</style>
