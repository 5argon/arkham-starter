<script lang="ts">
	export let front: boolean = false
	export let back: boolean = false

	const parallel = 'Parallel'
	const regular = 'Regular'
	const frontText = 'Front'
	const backText = 'Back'

	$: firstText = front ? parallel : regular
	$: secondText = back ? parallel : regular
</script>

{#if front || back}
	<span class="frame">
		<span class="front" class:parallel={front}>
			{firstText}
			{frontText}
		</span>
		<span class:middle={front && back} />
		<span class="back" class:parallel={back}>
			{secondText}
			{backText}
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

    .middle{
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
