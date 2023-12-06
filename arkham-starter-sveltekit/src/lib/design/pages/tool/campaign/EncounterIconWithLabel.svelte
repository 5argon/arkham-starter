<script lang="ts">
	import EncounterIcon from './EncounterIcon.svelte'

	export let iconPath: string
	export let iconName: string
	export let subText: string = ''
	export let coreSet: boolean = false
	export let scenarioSet: boolean = false
	export let returnToSet: boolean = false
	export let showName: boolean = false
	export let number: number | null = null
	export let disableHover: boolean = false
</script>

<div class="wrap">
	<div class="icon-wrap">
		<EncounterIcon
			{iconName}
			{iconPath}
			{subText}
			{coreSet}
			{returnToSet}
			{scenarioSet}
			enableHover={!disableHover && !showName}
		/>
	</div>
	{#if showName}<span class="show-name" class:name-with-number={number !== null}>{iconName}</span>
	{/if}
	{#if subText !== ''}<span class="sub-text">{subText}</span>{/if}
	{#if number !== null}<span class="number">(→{number})</span>{/if}
</div>

<style>
	.wrap {
		display: inline-flex;
		height: 28px;
		align-items: center;
		margin: 0px 4px;
	}

	.icon-wrap {
		display: inline;
	}

	.show-name {
		margin-left: 4px;
		margin-right: 4px;
	}

	.sub-text {
		color: grey;
		font-size: 0.8rem;
		margin-left: 2px;
	}
</style>
