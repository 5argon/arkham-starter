<script lang="ts">
	export let front: boolean = false
	export let back: boolean = false
	export let compact: boolean = false

	const parallel = 'Parallel'
	const parallelShort = 'Par.'
	const regular = 'Regular'
	const regularShort = 'Reg.'
	const frontText = 'Front'
	const backText = 'Back'

	$: firstText = compact ? (front ? parallelShort : regularShort) : front ? parallel : regular
	$: secondText = compact ? (back ? parallelShort : regularShort) : back ? parallel : regular
</script>

{#if front || back}
	<span class="frame">
		<span class="front" class:parallel={front}>
			{firstText}
			{#if !compact}{frontText}{/if}
		</span>
		<span class:middle={front && back} />
		<span class="back" class:parallel={back}>
			{secondText}
			{#if !compact}{backText}{/if}
		</span>
	</span>
{/if}

<style>
	span {
		font-size: x-small;
	}

	.frame {
		display: flex;
	}

	.middle {
		width: 1px;
	}

	.front {
		border: 1px solid rgb(59, 59, 59);
		border-radius: 4px 0px 0px 4px;
		padding: 0px 4px;
	}

	.back {
		border: 1px solid rgb(59, 59, 59);
		border-radius: 0px 4px 4px 0px;
		padding: 0px 4px;
	}

	.parallel {
		background-color: rgb(59, 59, 59);
		color: white;
	}
</style>
