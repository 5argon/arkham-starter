<script lang="ts">
	import type { EncounterSet, EncounterSetItem } from '$lib/core/campaign'
	import {
		EncounterSetFlag,
		EncounterSetSorting,
		getEncounterInsideItem,
		isEncounterSetWithModification,
	} from '$lib/core/campaign'

	import { type EncounterSetFrequencies,sortEncountersScore } from './campaign-analyze'
	import EncounterIconWithLabel from './EncounterIconWithLabel.svelte'
	import { makeSetCountText } from './helper'

	export let encounterSets: EncounterSetItem[]
	export let sorting: EncounterSetSorting
	export let frequencies: EncounterSetFrequencies

	$: sortedEncounterSets = encounterSets.sort((a, b) => {
		function sortScore(e: EncounterSetItem): number {
			let flag: EncounterSetFlag | undefined = getEncounterInsideItem(e).flag
			let score: number
			switch (flag) {
				case EncounterSetFlag.Core: {
					score = 0
					break
				}
				case EncounterSetFlag.ReturnTo: {
					score = 1
					break
				}
				default: {
					score = 2
					break
				}
				case EncounterSetFlag.Scenario: {
					score = 3
					break
				}
			}
			return score
		}
		const sortScoreA = sortScore(a)
		const sortScoreB = sortScore(b)
		if (sortScoreA !== sortScoreB) {
			return sortScore(b) - sortScore(a)
		}

		let encounterA: EncounterSet = getEncounterInsideItem(a)
		let encounterB: EncounterSet = getEncounterInsideItem(b)
		return sortEncountersScore(encounterA, encounterB, sorting, frequencies)
	})
	export let showName: boolean = false
	export let showSetCount: boolean = false
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
				const num = es.count
				const numMod = x.overwriteCount !== undefined ? x.overwriteCount : num
				// Do not show number if it is exactly the set's count.
				if (numMod != es.count) {
					showingNumbers.push(numMod)
				} else {
					showingNumbers.push(null)
				}
			} else {
				encounterSetsExtracted.push(x)
				const num = x.count
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
			<EncounterIconWithLabel
				iconPath={ce.icon}
				iconName={ce.name}
				subText={showSetCount ? makeSetCountText(ce) : ''}
				coreSet={ce.flag === EncounterSetFlag.Core}
				returnToSet={ce.flag === EncounterSetFlag.ReturnTo}
				{showName}
				scenarioSet={ce.flag === EncounterSetFlag.Scenario}
				number={!hideNumbers ? showingNumbers[i] : null}
			/>
		{/if}
	{/each}
</div>
