<script lang="ts">
	import type { Party } from '$lib/tool/overlap/overlap-helpers'
	import CardTableGrouped from '$lib/design/components/deck-table/CardTableGrouped.svelte'
	import PartyDeckEntry from '../../../components/card/PartyDeckEntry.svelte'
	import type { FullDatabase } from '$lib/core/full-database'
	import { ExtraColumn, Grouping, Sorting } from '$lib/deck-table/grouping'
	import Button from '$lib/design/components/basic/Button.svelte'
	import PackInfoSpan, {
		type PackInfoSpanItem,
	} from '$lib/design/components/inline/PackInfoSpan.svelte'
	import { addPackCount, countPacks, type PackCount } from '$lib/deck/deck-count'
	import { goToGather } from '$lib/deck/go-to-gather'
	import type { GetDeckCardIdReturns } from '$lib/ahdb/public-api/high-level'

	export let party: Party
	export let fullDatabase: FullDatabase
	export let groupings: Grouping[]
	export let sortings: Sorting[]
	export let onCopyMarkdown: (d: GetDeckCardIdReturns[]) => void
	let packCount: PackCount

	$: {
		let collect: PackCount = {}
		party.decks.forEach((x) => {
			const a = countPacks(x.cards1, (c) => fullDatabase.getCard(c).packIcon)
			const b = countPacks(x.cards2, (c) => fullDatabase.getCard(c).packIcon)
			const c = countPacks(x.cards3, (c) => fullDatabase.getCard(c).packIcon)
			collect = addPackCount(addPackCount(addPackCount(a, b), c), collect)
		})
		packCount = collect
	}

	let packInfoSpanItems: PackInfoSpanItem[]
	$: {
		packInfoSpanItems = Object.entries(packCount).map<PackInfoSpanItem>(([packString, count]) => {
			return {
				pack: parseInt(packString),
				count: count,
			}
		})
	}
</script>

<tr>
	<td class="outer-td">
		<table>
			{#each party.decks as d}
				<tr>
					<td class="author"> {d.userId === null ? 'Unpublished' : 'User: ' + d.userId}</td>
					<td>
						<PartyDeckEntry
							deckLink={d.link}
							deckName={d.deck}
							investigatorClass={fullDatabase.getCard(d.investigatorCode).class1}
							investigatorCode={d.investigatorCode}
						/>
					</td>
				</tr>
			{/each}
			<tr>
				<td />
				<td>
					<Button
						block
						label="Gather Cards"
						onClick={() => {
							goToGather(party.decks)
						}}
					/>
					<Button
						block
						label="Copy Markdown to Clipboard"
						onClick={() => {
							onCopyMarkdown(party.decks)
						}}
					/>
				</td>
			</tr>
		</table>
	</td>
	<td class="outer-td">
		<CardTableGrouped
			toggleMap={{}}
			entries={party.overlaps}
			{groupings}
			{sortings}
			{fullDatabase}
			taboo={true}
			columns={[ExtraColumn.Label]}
		/>
	</td>
	<td class="outer-td">
		<PackInfoSpan items={packInfoSpanItems} />
	</td>
</tr>

<style>
	table {
		width: 100%;
	}

	.outer-td {
		border-bottom: 1px solid rgba(0, 0, 0, 0.151);
		padding: 12px 0px;
	}

	.author {
		width: 55px;
		font-size: xx-small;
	}
</style>
