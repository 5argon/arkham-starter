<script lang="ts">
	import { type EncounterSet,EncounterSetFlag } from '$lib/core/campaign'

	import EncounterIcon from './EncounterIcon.svelte'
	import { makeSetCountText } from './helper'

	export let encounterSet: EncounterSet
	export let showName: boolean
</script>

<div class="wrap">
	{#if showName}
		<div class="name">{encounterSet.name}</div>
	{/if}
	<div class="fade">
		<EncounterIcon
			iconPath={encounterSet.icon}
			iconName={encounterSet.name}
			subText={makeSetCountText(encounterSet)}
			coreSet={encounterSet.flag === EncounterSetFlag.Core}
			scenarioSet={encounterSet.flag === EncounterSetFlag.Scenario}
			returnToSet={encounterSet.flag === EncounterSetFlag.ReturnTo}
			enableHover
		/>
	</div>
</div>

<style>
	.wrap {
		position: relative;
	}

	.name {
		position: absolute;
		white-space: nowrap;
		font-size: xx-small;
		transform: translateX(15px) translateY(-15px) rotate(310deg);
		transform-origin: center left;
	}
</style>
