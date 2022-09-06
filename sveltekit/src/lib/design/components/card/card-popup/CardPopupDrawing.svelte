<script lang="ts">
	import type { PopupDatabase } from '$lib/core/popup-database'
	import HoverFrame from '../../inline/HoverFrame.svelte'
	import CardSpan from '../CardSpan.svelte'
	// Cards returned from the fuzzy search.
	export let cardIds: string[]
	// Turns all the card IDs into rendering.
	export let popupDatabase: PopupDatabase

	let scroll: HTMLElement | undefined

	export let selectedIndex: number | null
	export let title: string | undefined = undefined
	export let bottomText: string = ''
	const cardRowHeight = 25
	const cardScrollHeight = 110

	// Automatic scroll to focus on the selection
	// every time the selection changes.
	$: {
		if (scroll !== undefined && selectedIndex !== null) {
			const itemHeight = 25
			scroll.scrollTop = selectedIndex * itemHeight - cardScrollHeight / 2.0 + cardRowHeight / 2.0
		}
	}

	$: cards = cardIds.map((x) => popupDatabase.getById(x))
</script>

<div class="frame">
	<HoverFrame>
		{#if title !== undefined}
			<div class="title">{title}</div>
		{/if}
		<div class="card-row-scroll" style={'height:' + cardScrollHeight + 'px'} bind:this={scroll}>
			{#each cards as c, i}
				{#if c !== null}
					<div class="card-row-height" style={'height:' + cardRowHeight + 'px'}>
						<div class="card-row" class:selected={selectedIndex === i}>
							<CardSpan
								cardId={c.original.id}
								text={c.original.n}
								subText={c.original.sn}
								class1={c.class1}
								class2={c.class2}
								class3={c.class3}
								xp={c.original.xp}
								packNumber={c.original.ps}
								packIcon={c.packIcon}
								weakness={c.original.wk}
								exceptional={c.original.ex}
								restriction={c.original.ir}
								color
							/>
						</div>
					</div>
				{/if}
			{/each}
		</div>
		{#if bottomText !== ''}
			<div class="bottom-text">{bottomText}</div>
		{:else}
			<div class="bottom-padding" />
		{/if}
	</HoverFrame>
</div>

<style>
	.title {
		font-weight: bold;
		padding: 4px 3px;
	}

	.frame {
		width: 300px;
	}

	.card-row-scroll {
		overflow-y: scroll;
		padding-right: 18px;
		scroll-behavior: smooth;
	}

	.bottom-padding {
		height: 4px;
	}

	.card-row-height {
		display: flex;
	}

	.card-row {
		padding: 2px 4px;
		display: flex;
		flex: 1;
		border: 1px solid rgba(255, 255, 255, 0);
	}

	.card-row:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.selected {
		border: 1px solid red;
		background-color: rgba(255, 0, 0, 0.1);
	}

	.bottom-text {
		text-align: right;
		color: grey;
		font-size: xx-small;
		padding: 8px 0px;
	}
</style>
