<script lang="ts" context="module">
	interface Player {
		deckUrl: string
		deck: string
		error: boolean
		investigator: FullDatabaseItem | null
	}
	type PlayerOrNull = Player | null
</script>

<script lang="ts">
	import { fetchFullDatabase, FullDatabase, type FullDatabaseItem } from '$lib/core/full-database'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import { CampaignSwitchingProto } from '$lib/proto/generated/campaign_switching'
	import { base64ToBinary } from '$lib/tool/script/export/options'
	import PlayerDeckInput from '$lib/design/components/deck-table/PlayerDeckInput.svelte'
	import { CardClass } from '$lib/core/card-class'
	import Button from '$lib/design/components/basic/Button.svelte'
	import {
		extractDeckFromUrl,
		getDeckCardIds,
		type GetDeckCardIdReturns,
	} from '$lib/ahdb/public-api/high-level'
	import { checkOverlaps } from '$lib/tool/overlap/overlap-helpers'

	export let protoString: string | null = null
	let pulling = false

	let activeCampaignDecks: PlayerOrNull[] = new Array<PlayerOrNull>(4).fill(null)
	let inactiveCampaignDecks: PlayerOrNull[] = new Array<PlayerOrNull>(4).fill(null)

	let fixedLabelColor = false
	let fdbPromise = fetchFullDatabase()
	startingProtoProcessing()
	async function startingProtoProcessing() {
		if (protoString !== null) {
			try {
				const tap = CampaignSwitchingProto.fromBinary(base64ToBinary(protoString))
			} catch {}
		}
	}

	function onDeckChanged(d: PlayerOrNull, s: string, i: number, inactiveCampaign: boolean) {
		let neww: PlayerOrNull = null
		if (d !== null) {
			neww = { ...d, deckUrl: s }
		} else {
		}
		if (inactiveCampaign) {
			inactiveCampaignDecks[i] = neww
		} else {
			activeCampaignDecks[i] = neww
		}
	}

	function openInGather(inactiveCampaign: boolean) {}

	function swap() {}

	async function process(fdb: FullDatabase) {
		const activeSide = oneSide(activeCampaignDecks)
		const inactiveSide = oneSide(inactiveCampaignDecks)
		async function oneSide(decks: PlayerOrNull[]) {
			const extracted = decks.map((x) => {
				if (x !== null) {
					return extractDeckFromUrl(x?.deckUrl)
				} else {
					return null
				}
			})
			const awaitables = extracted.map<Promise<GetDeckCardIdReturns | null>>((x) => {
				if (x !== null) {
					return getDeckCardIds(x.deck, x.published)
				}
				return Promise.resolve(null)
			})
			const awaited = await Promise.all(awaitables)
			return awaited
		}
		const activeSideResult = await activeSide
		const inactiveSideResult = await inactiveSide
		checkOverlaps()
	}
</script>

{#await fdbPromise}
	Loading...
{:then fdb}
	<div class="flex-wrap">
		<div class="flex-item">
			<ListDivider label="Active Campaign" />
			{#each activeCampaignDecks as d, i}
				<PlayerDeckInput
					player={i}
					cardClass={d?.investigator?.class1 ?? CardClass.Neutral}
					{fixedLabelColor}
					deckInput={d?.deckUrl ?? ''}
					investigatorCode={d?.investigator?.original.code ?? undefined}
					actualDeckUrl={d?.deckUrl ?? undefined}
					pullError={d?.error ?? false}
					{pulling}
					pulledDeckName={d?.deck ?? null}
					onDeckUrlChanged={(s) => {
						onDeckChanged(d, s, i, false)
					}}
				/>
			{/each}
			<Button onClick={() => openInGather(false)} block label="Go to Deck Gather" center />
		</div>
		<div class="flex-item">
			<ListDivider label="Inactive Campaign" />
			{#each activeCampaignDecks as d, i}
				<PlayerDeckInput
					player={i}
					cardClass={d?.investigator?.class1 ?? CardClass.Neutral}
					{fixedLabelColor}
					deckInput={d?.deckUrl ?? ''}
					investigatorCode={d?.investigator?.original.code ?? undefined}
					actualDeckUrl={d?.deckUrl ?? undefined}
					pullError={d?.error ?? false}
					{pulling}
					pulledDeckName={d?.deck ?? null}
					onDeckUrlChanged={(s) => {
						onDeckChanged(d, s, i, false)
					}}
				/>
			{/each}
			<Button onClick={() => openInGather(false)} block label="Go to Deck Gather" center />
		</div>
	</div>
	<Button onClick={swap} block label="Swap" big center />
	<Button onClick={() => process(fdb)} block label="Process" big center />
	<ListDivider label="Transfer" />
	<ListDivider label="Remaining" />
{/await}

<style>
	.flex-wrap {
		display: flex;
	}

	.flex-item {
		flex: 1;
		padding: 0px 8px;
	}
</style>
