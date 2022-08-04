<script type="ts">
	import {
		EncounterSetFlag,
		isEncounterSetWithModification,
		type EncounterSet,
		type EncounterSetItem,
	} from '$lib/core/campaign'
	import EncounterIcon from './EncounterIcon.svelte'

	export let encounterSets: EncounterSetItem[]
	$: sortedEncounterSets = encounterSets.sort((a, b) => {
		function sortScore(e: EncounterSetItem): number {
			let flag: EncounterSetFlag | undefined
			if (isEncounterSetWithModification(e)) {
				flag = e.encounterSet.flag
			} else {
				flag = e.flag
			}
			let score: number
			switch (flag) {
				case EncounterSetFlag.Core: {
					score = 0
					break
				}
				case EncounterSetFlag.Scenario: {
					score = 2
					break
				}
				default: {
					score = 1
					break
				}
			}
			return score
		}
		return sortScore(b) - sortScore(a)
	})
	export let showName: boolean = false
	export let hideNumbers: boolean = false
	let encounterSetsExtracted: EncounterSet[] = []
	let showingNumbers: (number | null)[] = []
	$: {
		encounterSetsExtracted = []
		showingNumbers = []
		sortedEncounterSets.forEach((x) => {
			if (isEncounterSetWithModification(x)) {
				encounterSetsExtracted.push(x.encounterSet)
				const es = x.encounterSet
				const num =
					es.startingEncounterDeckCount !== undefined ? es.startingEncounterDeckCount : es.count
				const numMod = x.overwriteCount !== undefined ? x.overwriteCount : num - (x.subtractCount ?? 0)
				// Do not show number if it is exactly the set's count.
				if (numMod != es.count) {
					showingNumbers.push(numMod)
				} else {
					showingNumbers.push(null)
				}
			} else {
				encounterSetsExtracted.push(x)
				const num =
					x.startingEncounterDeckCount !== undefined ? x.startingEncounterDeckCount : x.count
				// Do not show number if it is exactly the set's count.
				if (num != x.count) {
					showingNumbers.push(num)
				} else {
					showingNumbers.push(null)
				}
			}
		})
	}
</script>

<div>
	{#each encounterSetsExtracted as ce, i}
		{#if hideNumbers || (!hideNumbers && showingNumbers[i] !== 0)}
			<EncounterIcon
				iconPath={ce.icon}
				iconName={ce.name}
				coreSet={ce.flag === EncounterSetFlag.Core}
				{showName}
				scenarioSet={ce.flag === EncounterSetFlag.Scenario}
				number={!hideNumbers ? showingNumbers[i] : null}
			/>
		{/if}
	{/each}
</div>
