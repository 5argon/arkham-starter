<script lang="ts">
	import { CommitIcon } from '$lib/core/commit-icon'
	import type { PopupDatabase } from '$lib/core/popup-database'
	import type { DecklistLabel } from '$lib/deck-table/decklist-entry'
	import { ExtraColumn } from '$lib/deck-table/grouping'
	import CostCircle from '../inline/CostCircle.svelte'
	import SkillIcon from '../inline/SkillIcon.svelte'

	export let cardId: string
	export let popupDatabase: PopupDatabase
	export let labels: DecklistLabel[] | undefined
	export let column: ExtraColumn

	let agility = 0
	let combat = 0
	let intellect = 0
	let wild = 0
	let willpower = 0

	let cost: number | null = null

	$: card = popupDatabase.getByIdThrowNull(cardId)
	$: {
		agility = card.original.sag ?? 0
		combat = card.original.scm ?? 0
		intellect = card.original.sit ?? 0
		willpower = card.original.swi ?? 0
		wild = card.original.swl ?? 0

		cost = card.original.cs ?? null
	}
</script>

<span class="skill-flex">
	{#if column === ExtraColumn.Label && labels !== undefined}
		{#each labels as label}
			<span
				class={'label' + (label.color.indexOf('#') === -1 ? ' ' + label.color : '')}
				style={label.color.indexOf('#') === 0 ? 'background-color:' + label.color : null}
				>{label.text}</span
			>
		{/each}
	{/if}

	{#if column === ExtraColumn.Icons}
		{#each { length: willpower } as _, i}
			<SkillIcon icon={CommitIcon.Willpower} />
		{/each}
		{#each { length: intellect } as _, i}
			<SkillIcon icon={CommitIcon.Intellect} />
		{/each}
		{#each { length: combat } as _, i}
			<SkillIcon icon={CommitIcon.Combat} />
		{/each}
		{#each { length: agility } as _, i}
			<SkillIcon icon={CommitIcon.Agility} />
		{/each}
		{#each { length: wild } as _, i}
			<SkillIcon icon={CommitIcon.Wild} />
		{/each}
	{/if}

	{#if column === ExtraColumn.Cost}
		<CostCircle {cost} c1={card.class1} c2={card.class2 ?? null} c3={card.class3 ?? null} />
	{/if}
</span>

<style>
	.label {
		font-size: x-small;
		padding: 1px 4px;
		border-radius: 2px;
		white-space: nowrap;
		margin: 0px 1px;
	}

	.skill-flex {
		display: flex;
	}
</style>
