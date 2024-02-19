<script lang="ts">
	interface NewCust {
		checkedBoxes: number
		uncheckedBoxes: number
		text: string
		detail: string
	}

	import type { CustomizableMeta } from '$lib/ahdb/public-api/high-level'
	import { CommitIcon } from '$lib/core/commit-icon'
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
	import { processCustomizable } from '$lib/deck/customizable'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import CardSpan from '../card/CardSpan.svelte'
	import SkillIcon from '../inline/SkillIcon.svelte'

	export let taboo: boolean
	export let cardId: string
	export let amount: number | null
	export let customizableMetas: CustomizableMeta[] = []
	export let popupDatabase: PopupDatabase
	export let toggled: boolean
	export let onToggleChanged: undefined | ((copy: number, t: boolean) => void) = undefined

	function handler(e: MouseEvent & { currentTarget: HTMLElement }) {
		onToggleChanged?.(amount ?? 0, !toggled)
	}
	let card: PopupDatabaseItem
	$: {
		card = popupDatabase.getByIdThrowNull(cardId)
	}
	$: processedCust = processCustomizable(card.original.id, customizableMetas, popupDatabase)

	let cardName: string
	$: {
		cardName = card.original.n
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
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
		restriction={card.original.ir ?? false}
		showImageStrip
		text={cardName}
		subText={card.original.esn ? card.original.sn : null}
		weakness={card.original.wk}
		investigator={card.original.inv ?? false}
		xp={processedCust.xp > 0 ? processedCust.xp : card.original.xp}
		xpTaboo={taboo ? card.original.xpat : null}
		customizable={card.original.cus !== undefined}
		permanent={card.original.pe ?? false}
		bonded={card.original.bd ?? false}
		myriad={card.original.myr ?? false}
	/>
	{#if card.original.cus !== undefined}
		{#each processedCust.options as rc}
			<div class="cust">
				<FaIcon path={allIcons.rightSingle} />
				<CardSpan
					{cardId}
					color={true}
					text={rc.text}
					checkedBoxes={rc.checkedBoxes}
					checkBoxes={rc.uncheckedBoxes}
					forceSmall
				/>
				<span class="detail">
					{#if rc.detail === 'willpower'}
						<SkillIcon icon={CommitIcon.Willpower} />
					{:else if rc.detail === 'intellect'}
						<SkillIcon icon={CommitIcon.Intellect} />
					{:else if rc.detail === 'combat'}
						<SkillIcon icon={CommitIcon.Combat} />
					{:else if rc.detail === 'agility'}
						<SkillIcon icon={CommitIcon.Agility} />
					{:else}
						{rc.detail}
					{/if}
				</span>
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
		align-items: center;
	}

	.detail {
		margin-left: 4px;
		font-size: 0.8em;
		text-decoration: underline;
		color: grey;
	}
</style>
