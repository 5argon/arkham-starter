<script lang="ts">
	import { CardClass, cardClassToBackgroundClass } from '$lib/core/card-class'
	export let fixedLabelColor: boolean
	export let cardClass: CardClass
	export let player: number
	$: playerClass = 'player-' + (player + 1) + '-bg'
	$: classClass = cardClassToBackgroundClass(cardClass)
</script>

<div class="outer-flex">
	<div class={'inner-flex left ' + (fixedLabelColor ? playerClass : classClass)}>
		P{player + 1}
	</div>
	<div class="inner-flex right">
		<slot />
	</div>
</div>

<style>
	.outer-flex {
		display: flex;
        align-items: center;
		margin-bottom: 8px;
	}

	.left {
		padding: 4px;
		text-align: center;
		margin-right: 4px;
		width: 20px;
		border-radius: 4px;
	}

	.right {
		flex: 1;
	}
</style>
