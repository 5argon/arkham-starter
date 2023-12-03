<script lang="ts">
	import { coreToRcore } from '$lib/ahdb/conversion'

	export let investigatorCode: string
	export let front: boolean = false
	export let back: boolean = false
	export let compact: boolean = false

	let parallelLink: string | null = null
	$: {
		switch (coreToRcore(investigatorCode)) {
			case '01501': {
				parallelLink = 'https://www.fantasyflightgames.com/en/news/2021/6/18/by-the-book/'
				break
			}
			case '01502': {
				parallelLink = 'https://www.fantasyflightgames.com/en/news/2020/5/5/beyond-our-dimension/'
				break
			}
			case '01503': {
				parallelLink = 'https://www.fantasyflightgames.com/en/news/2020/8/13/all-or-nothing/'
				break
			}
			case '01504': {
				parallelLink = 'https://www.fantasyflightgames.com/en/news/2020/12/3/bad-blood/'
				break
			}
			case '01505': {
				parallelLink = 'https://www.fantasyflightgames.com/en/news/2021/12/30/red-tide-rising-1/'
				break
			}
		}
	}

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
			{#if parallelLink !== null && front}
				<a href={parallelLink} target="_blank">
					{firstText}
					{#if !compact}{frontText}{/if}
				</a>
			{:else}
				{firstText}
				{#if !compact}{frontText}{/if}
			{/if}
		</span>
		<span class:middle={front && back} />
		<span class="back" class:parallel={back}>
			{#if parallelLink !== null && back}
				<a href={parallelLink} target="_blank">
					{secondText}
					{#if !compact}{backText}{/if}
				</a>
			{:else}
				{secondText}
				{#if !compact}{backText}{/if}
			{/if}
		</span>
	</span>
{/if}

<style>
	span {
		font-size: x-small;
	}

	.frame {
		display: flex;
		user-select: none;
	}

	.middle {
		width: 1px;
	}

	.front {
		border: 1px solid rgb(59, 59, 59);
		border-radius: 4px 0px 0px 4px;
		padding: 0px 4px;
	}

	a {
		text-decoration: none;
	}

	a:hover {
		color: inherit;
		text-decoration: underline;
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
