<script lang="ts">
	import type { CardPack } from '$lib/core/card-pack'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import { decodeSideExtras, type DeckEntry } from '$lib/deck/deck'
	import { countPacksHigher } from '$lib/deck/deck-count'
	import Button from '$lib/design/components/basic/Button.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import PackInfoSpan from '$lib/design/components/inline/PackInfoSpan.svelte'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'

	export let popupDatabase: PopupDatabase
	export let deckEntries: DeckEntry[]
	export let onBack: () => void

	$: counterResult = combinator(deckEntries)

	interface CombinationCount {
		packs: CardPack[]
		count: number
	}

	class PackCounter {
		private counts: CombinationCount[]

		constructor() {
			this.counts = []
		}

		public countCombinations(enums: CardPack[]): void {
			const sortedEnums = enums.sort()
			const found = this.counts.find((x) => {
				if (x.packs.length !== sortedEnums.length) {
					return false
				}
				for (let y = 0; y < sortedEnums.length; y++) {
					const sn = sortedEnums[y]
					if (sn !== x.packs[y]) {
						return false
					}
				}
				return true
			})
			if (found) {
				found.count = found.count + 1
			} else {
				this.counts.push({ count: 1, packs: sortedEnums })
			}
		}

		public getCombinationCounts(): CombinationCount[] {
			const combinationCounts: CombinationCount[] = []

			function sortByEnumCountAndValue(a: CombinationCount, b: CombinationCount): number {
				if (a.packs.length === b.packs.length) {
					const enumSumA = a.packs.reduce((sum, enumValue) => sum + enumValue, 0)
					const enumSumB = b.packs.reduce((sum, enumValue) => sum + enumValue, 0)
					return enumSumA - enumSumB
				}
				return a.packs.length - b.packs.length
			}
			const sortedCombinations = this.counts.sort(sortByEnumCountAndValue)
			return sortedCombinations
		}
	}

	function combinator(de: DeckEntry[]) {
		const counter = new PackCounter()
		const counts = de.map((x) => {
			const pc = countPacksHigher(x.deck, decodeSideExtras(x.raw.sideExtras), (c) => {
				return popupDatabase.getByIdThrowNull(c).packIcon
			})
			return pc
		})
		counts.forEach((x) => {
			const packs = Object.keys(x).map<CardPack>((x) => parseInt(x))
			counter.countCombinations(packs)
		})
		return counter
	}
</script>

<ListDivider label="Expansion Combinations" />
<div>
	<Button labelAfterSlot label={'Back'} onClick={onBack}
		><FaIcon path={allIcons.arrowLeftBordered} /></Button
	>
</div>

<p>This is all starter decks in this site grouped by combination of expansions used.</p>
<table>
	<thead>
		<td />
		<td> Expansions </td>
		<td> Starter Decks Available </td>
	</thead>
	{#each counterResult.getCombinationCounts() as cr}
		<tr>
			<td>
				<Button label="Select" onClick={() => {}} />
			</td>
			<td>
				<PackInfoSpan
					items={cr.packs.map((x) => {
						return {
							pack: x,
						}
					})}
				/>
			</td>
			<td>
				{cr.count}
			</td>
		</tr>
	{/each}
</table>
