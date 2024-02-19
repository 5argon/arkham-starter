<script lang="ts">
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import CardSpan from '../card/CardSpan.svelte'

	export let card: PopupDatabaseItem
	export let onRemove: () => void
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span
		on:click={() => {
			onRemove()
		}}><FaIcon path={allIcons.delete} /></span
	>
	<CardSpan
		cardId={card.original.id}
		class1={card.class1}
		class2={card.class2 ?? null}
		class3={card.class3 ?? null}
		exceptional={card.original.ext}
		color={true}
		packIcon={card.packIcon}
		packNumber={card.original.ps}
		restriction={card.original.ir ?? false}
		showImageStrip
		text={card.original.n}
		subText={card.original.esn ? card.original.sn : null}
		weakness={card.original.wk ?? false}
		investigator={card.original.inv ?? false}
		bonded={card.original.bd ?? false}
		myriad={card.original.myr ?? false}
		xp={card.original.xp}
		xpTaboo={card.original.xpat}
		customizable={card.original.cus !== undefined}
	/>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		padding: 2px 0px;
	}

	span {
		padding: 0px 4px;
		user-select: none;
		cursor: pointer;
	}
</style>
