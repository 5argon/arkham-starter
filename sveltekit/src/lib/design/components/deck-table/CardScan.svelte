<script lang="ts">
	import type { FullDatabase } from '$lib/core/full-database'
	import valid from '$lib/data/valid.json'
	export let cardId: string
	export let small: boolean
	export let fullDatabase: FullDatabase
	export let toggled: boolean | boolean[]
	export let amount: number
	export let onToggleChanged: undefined | ((copy: number, maxCopy: number, t: boolean) => void) =
		undefined
	export let unlink: boolean = false
	export let linkedOnly: boolean = false
	const sizeMultiplier = small ? 0.5 : 1
	$: card = fullDatabase.getCard(cardId)
	$: vertical = card.original.type_code !== 'investigator'
	$: width = (vertical ? 215 : 300) * sizeMultiplier
	$: height = (vertical ? 300 : 215) * sizeMultiplier

	$: srcPath = small ? 'full-small' : 'full'

	let thisCopyToggled: boolean
	$: {
		if (Array.isArray(toggled)) {
			thisCopyToggled = toggled[amount - 1]
		} else {
			thisCopyToggled = toggled
		}
	}

	const validArray: string[] = valid
	$: exist = validArray.find((element) => element === cardId + '.png')

	function backCodeExtract(s: string): string {
		var filename = s.match(/([\w\d_-]*)\.?[^\\\/]*$/i)
		return filename?.[1] ?? ''
	}

	function handler(e: MouseEvent & { currentTarget: HTMLElement }) {
		onToggleChanged?.(amount - 1, amount, !thisCopyToggled)
	}
</script>

{#if !exist}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span
		class="outer no-image"
		class:toggle-div={onToggleChanged}
		class:toggle-div-on={thisCopyToggled}
		class:normal-radius={!small}
		class:small-radius={small}
		on:click={handler}
		style={'width:' + width + 'px;' + 'height:' + height + 'px;'}
	>
		<span class="no-image-inner">
			{card.original.name}
		</span>
		<img
			class="card-back"
			{width}
			{height}
			src={'/image/game/card-back.png'}
			alt={'Player Card Back'}
		/>
	</span>
{:else}
	{#if !linkedOnly}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span
			class="outer"
			class:toggle-div={onToggleChanged}
			class:toggle-div-on={thisCopyToggled}
			on:click={handler}
			style={'width:' + width + 'px;' + 'height:' + height + 'px;'}
		>
			<img
				{width}
				{height}
				class:normal-radius={!small}
				class:small-radius={small}
				src={`/image/card/${srcPath}/` + cardId + '.png'}
				alt={card.original.name}
				loading="lazy"
				draggable="false"
			/>
		</span>
	{/if}
	{#if !unlink || linkedOnly}
		{#if card.original.double_sided && card.original.backimagesrc !== undefined && amount === 1}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				class="outer"
				class:toggle-div={onToggleChanged}
				class:toggle-div-on={thisCopyToggled}
				on:click={handler}
				style={'width:' + width + 'px;' + 'height:' + height + 'px;'}
			>
				<img
					{width}
					{height}
					class:normal-radius={!small}
					class:small-radius={small}
					class={'alt-card'}
					src={'/image/card/full/' + backCodeExtract(card.original.backimagesrc) + '.png'}
					alt={card.original.name}
					loading="lazy"
					draggable="false"
				/>
			</span>
		{/if}
		{#if card.original.linked_to_code !== undefined && amount === 1}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				class="outer"
				class:toggle-div={onToggleChanged}
				class:toggle-div-on={thisCopyToggled}
				on:click={handler}
				style={'width:' + width + 'px;' + 'height:' + height + 'px;'}
			>
				<img
					{width}
					{height}
					class:normal-radius={!small}
					class:small-radius={small}
					class={'alt-card'}
					src={'/image/card/full/' + card.original.linked_to_code + '.png'}
					alt={card.original.name}
					loading="lazy"
					draggable="false"
				/>
			</span>
		{/if}
	{/if}
{/if}

<style>
	span {
		display: inline-block;
	}

	img {
		/* Both required to tame Alt text when the image is missing... */
		display: inline-block;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.195);
		user-select: none;
	}

	.normal-radius {
		border-radius: 12px;
	}

	.small-radius {
		border-radius: 6px;
	}

	.toggle-div {
		cursor: pointer;
		user-select: none;
	}

	.toggle-div-on {
		filter: grayscale() opacity(0.3);
	}

	.no-image {
		display: inline-block;
		background-color: rgb(216, 216, 216);
		overflow: hidden;
	}

	.no-image-inner {
		padding: 4px 0px;
		display: block;
		font-size: x-small;
		text-align: center;
	}

	.outer {
		margin: 4px;
	}
</style>
