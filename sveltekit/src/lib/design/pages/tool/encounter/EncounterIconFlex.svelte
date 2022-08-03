<script type="ts">
	import {
		EncounterSetFlag,
		isEncounterSetWithModification,
		type EncounterSet,
		type EncounterSetItem,
	} from '$lib/core/campaign'
	import EncounterIcon from './EncounterIcon.svelte'

	export let encounterSets: EncounterSetItem[]
	export let showName: boolean = false
	export let firstIsScenarioSet: boolean = false
	export let hideStartingEncoutnerSetNumber: boolean = false
	let encounterSetsExtracted: EncounterSet[] = []
	$: {
		encounterSetsExtracted = []
		encounterSets.forEach((x) => {
			if (isEncounterSetWithModification(x)) {
				encounterSetsExtracted.push(x.encounterSet)
			} else {
				encounterSetsExtracted.push(x)
			}
		})
	}
</script>

<div>
	{#each encounterSetsExtracted as ce, i}
		<EncounterIcon
			iconPath={ce.icon}
			iconName={ce.name}
			coreSet={ce.flag === EncounterSetFlag.Core}
			{showName}
			scenarioSet={firstIsScenarioSet ? i === 0 : false}
			number={!hideStartingEncoutnerSetNumber && ce.startingEncounterDeckCount !== undefined
				? ce.startingEncounterDeckCount
				: null}
		/>
	{/each}
</div>
