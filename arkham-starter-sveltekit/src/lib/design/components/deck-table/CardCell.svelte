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
	let custXp: number
	let realCust: NewCust[] = []
	$: {
		const matchedCustomizables = customizableMetas
			.filter((x) => {
				return x.card === cardId
			})
			.sort((a, b) => a.index - b.index)
		const newRealCust: NewCust[] = []

		matchedCustomizables.forEach((x) => {
			if (card.original.cus && card.original.cus.length > x.index) {
				const c = card.original.cus[x.index]
				const zeroMax = c.xp === 0
				if (zeroMax || x.checked > 0) {
					newRealCust.push({
						text: processText(c.n),
						checkedBoxes: x.checked,
						uncheckedBoxes: c.xp - x.checked,
						detail: processDetail(x.detail),
					})
				}
			}
		})

		const totalChecked = matchedCustomizables.reduce((a, b) => a + b.checked, 0)
		custXp = Math.ceil(totalChecked / 2)
		realCust = newRealCust
	}

	function processText(d: string): string {
		const tryGetCard = popupDatabase.getById(d)
		const regex = /\[\[(.*?)\]\]/g
		const result = d.replace(regex, '$1').replace('_____', '')
		return result
	}

	function processDetail(d: string): string {
		const tryGetCard = popupDatabase.getById(d)
		if (tryGetCard !== null) {
			return tryGetCard.original.n
		} else if (d.includes('^')) {
			const split = d.split('^')
			return split
				.map<string>((x) => {
					const tryGetCard = popupDatabase.getById(x)
					if (tryGetCard !== null) {
						return tryGetCard.original.n
					}
					return x
				})
				.join(', ')
		}
		return d
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
		xp={custXp > 0 ? custXp : card.original.xp}
		xpTaboo={taboo ? card.original.xpat : null}
		customizable={card.original.cus !== undefined}
		permanent={card.original.pe ?? false}
		bonded={card.original.bd ?? false}
	/>
	{#if card.original.cus !== undefined}
		{#each realCust as rc}
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
