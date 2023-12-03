<script lang="ts">
	import type { PopupDatabase, PopupDatabaseItem } from '$lib/core/popup-database'
	import HoverFrame from '../../inline/HoverFrame.svelte'
	import CardSpan from '../CardSpan.svelte'
	export let cards: PopupDatabaseItem[]
	export let popupDatabase: PopupDatabase

	let scroll: HTMLElement | undefined

	export let selectedIndex: number | null
	export let title: string | undefined = undefined
	export let bottomText: string = ''
	export let onClick: (index: number, card: PopupDatabaseItem) => void = () => {}
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
</script>

<div class="outer-frame">
	<div class="frame">
		<HoverFrame>
			{#if title !== undefined}
				<div class="title">{title}</div>
			{/if}
			<div class="card-row-scroll" style={'height:' + cardScrollHeight + 'px'} bind:this={scroll}>
				{#each cards as c, i}
					{#if c !== null}
						<div class="card-row-height" style={'height:' + cardRowHeight + 'px'}>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								class="card-row"
								class:selected={selectedIndex === i}
								on:mousedown={() => {
									onClick(i, c)
								}}
							>
								<CardSpan
									showImageStrip
									cardId={c.original.id}
									text={c.original.n}
									subText={c.original.esn ? c.original.sn : null}
									class1={c.class1}
									class2={c.class2 ?? null}
									class3={c.class3 ?? null}
									xp={c.original.xp}
									packNumber={c.original.ps}
									packIcon={c.packIcon}
									weakness={c.original.wk}
									exceptional={c.original.ex}
									restriction={c.original.ir}
									investigator={c.original.inv}
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
</div>

<style>
	.title {
		font-weight: bold;
		padding: 4px 3px;
	}

	.outer-frame {
		position: relative;
	}

	.frame {
		width: 380px;
		position: absolute;
		margin-top: -150px;
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
