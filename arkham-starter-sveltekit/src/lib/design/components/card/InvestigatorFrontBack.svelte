<script lang="ts" context="module">
</script>

<script lang="ts">
	import { rcoreToCore } from '$lib/ahdb/conversion'
import { forwardDeckToRcore, type GetDeckCardIdReturns } from '$lib/ahdb/public-api/high-level'
	import type { FullDatabase } from '$lib/core/full-database'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import { CardPackIcon } from '$lib/design/interface/card-pack'

	import ParallelInfo from '../deck-banner/ParallelInfo.svelte'
	import CardScan from '../deck-table/CardScan.svelte'
	import CardSpan from './CardSpan.svelte'
	export let fullDatabase: FullDatabase
	export let popupDatabase: PopupDatabase
	export let deck: GetDeckCardIdReturns
	$: rcoreDeck = forwardDeckToRcore(deck)
	$: frontCode = rcoreDeck.decodedMeta.alternateFront ?? rcoreDeck.investigatorCode
	$: backCode = rcoreDeck.decodedMeta.alternateBack ?? rcoreDeck.investigatorCode

	$: frontCard = fullDatabase.getCard(frontCode)
	$: backCard = fullDatabase.getCard(backCode)
	$: different = frontCode !== backCode
</script>

<div class="vert">
	<div class="gator">
		<CardScan
			small
			amount={1}
			toggled={false}
			{popupDatabase}
			{fullDatabase}
			cardId={frontCode}
			unlink
		/>
		<CardScan
			small
			amount={1}
			toggled={false}
			{popupDatabase}
			{fullDatabase}
			cardId={backCode}
			linkedOnly
		/>
	</div>
	<ParallelInfo
		investigatorCode={frontCode}
		front={frontCard.packIcon === CardPackIcon.ParallelInvestigator}
		back={backCard.packIcon === CardPackIcon.ParallelInvestigator}
	/>
	<div class="parallel">
		<CardSpan
			investigator
			cardId={frontCard.original.code}
			showImageStrip
			class1={frontCard.class1}
			text={frontCard.original.name}
			subText={frontCard.original.subname}
			color
			packIcon={frontCard.packIcon}
			packNumber={frontCard.original.position}
		/>
		{#if different}
			<CardSpan
				investigator
				cardId={backCard.original.code}
				showImageStrip
				class1={backCard.class1}
				text={backCard.original.name}
				subText={backCard.original.subname}
				color
				packIcon={backCard.packIcon}
				packNumber={backCard.original.position}
			/>
		{/if}
	</div>
</div>

<style>
	.gator {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.vert {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.parallel {
		display: flex;
		flex-direction: column;
		padding: 2px 0px;
	}
</style>
