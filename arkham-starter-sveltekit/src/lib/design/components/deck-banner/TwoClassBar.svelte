<script lang="ts">
	import { CardClass, cardClassToBackgroundClass } from '$lib/core/card-class'
	import ClassIcon from '../inline/ClassIcon.svelte'

	export let class1: CardClass
	export let class2: CardClass
	export let class1Amount: number
	export let class2Amount: number
	export let neutralAmount: number

	let backgroundColorClass1: string
	let backgroundColorClass2: string
	let backgroundColorClassNeutral: string
	$: {
		backgroundColorClass1 = cardClassToBackgroundClass(class1)
		backgroundColorClass2 = cardClassToBackgroundClass(class2)
		backgroundColorClassNeutral = cardClassToBackgroundClass(CardClass.Neutral)
	}
</script>

<span class="flex">
	<span>
		<ClassIcon cardClass={class1} />
		<span>{class1Amount}</span>
	</span>
	<span class="bar">
		<span
			class={'bar-inner bar-left ' + backgroundColorClass1}
			style={'flex-grow: ' + class1Amount}
		/>
		<span
			class={'bar-inner ' + backgroundColorClassNeutral}
			style={'flex-grow: ' + neutralAmount}
		/>
		<span
			class={'bar-inner bar-right ' + backgroundColorClass2}
			style={'flex-grow: ' + class2Amount}
		/>
	</span>
	<span>
		<ClassIcon cardClass={class2} />
		<span>{class2Amount}</span>
	</span>
</span>

<style>
	.flex {
		display: flex;
		align-items: center;
	}

	.bar {
		flex: auto;
		display: flex;
		align-items: center;
		padding: 0px 8px;
	}

	.bar-inner {
		height: 10px;
	}

	.bar-left {
		border-radius: 4px 0px 0px 4px;
	}

	.bar-right {
		border-radius: 0px 4px 4px 0px;
	}
</style>
