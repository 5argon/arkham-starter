<script type="ts">
	import { EncounterSetFlag, type EncounterSet } from '$lib/core/campaign'
	import EncounterIcon from './EncounterIcon.svelte'

	export let encounterSets: EncounterSet[]
	export let showName: boolean = false
	export let firstIsScenarioSet: boolean = false
	export let hideStartingEncoutnerSetNumber: boolean = false
</script>

<div>
	{#each encounterSets as ce, i}
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
