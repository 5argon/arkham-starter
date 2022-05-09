<script lang="ts">
	import { fetchPopupDatabase } from '$lib/core/popup-database'

	import Story from '$lib/design/story/story.svelte'
	import {
		createEmptyRowActionEvents,
		createEmptyRowEditEvents,
	} from '$lib/guide-tools/upgrade/upgrade-table/row-events'
	import UpgradeRow from './UpgradeRow.svelte'

	let test: number = 0
	const er = createEmptyRowActionEvents()
	const ee = createEmptyRowEditEvents()
	const pdbp = fetchPopupDatabase()
</script>

{#await pdbp then pdb}
	<Story name="Try">
		<UpgradeRow
			rowActionEvents={er}
			rowEditEvents={ee}
			calculatedCumulativeXp={3}
			calculatedXp={6}
			popupDatabase={pdb}
			row={{
				carryoverXp: 10,
				divider: false,
				dividerText: 'Hello',
				dividerXpCumulativeUnlock: false,
				left: null,
				right: null,
				mark: '*',
				xp: 8,
				xpUnlock: false,
			}}
		/>
	</Story>

	<Story name="XP Unlock">
		<UpgradeRow
			rowActionEvents={er}
			rowEditEvents={ee}
			calculatedCumulativeXp={3}
			calculatedXp={6}
			popupDatabase={pdb}
			row={{
				carryoverXp: 10,
				divider: false,
				dividerText: 'Hello',
				dividerXpCumulativeUnlock: false,
				left: null,
				right: null,
				mark: '*',
				xp: 8,
				xpUnlock: true,
			}}
		/>
	</Story>

	<Story name="Left">
		<UpgradeRow
			rowActionEvents={er}
			rowEditEvents={ee}
			calculatedCumulativeXp={3}
			calculatedXp={6}
			popupDatabase={pdb}
			row={{
				carryoverXp: 10,
				divider: false,
				dividerText: 'Hello',
				dividerXpCumulativeUnlock: false,
				left: '01579',
				right: null,
				mark: '*',
				xp: 8,
				xpUnlock: false,
			}}
		/>
	</Story>

	<Story name="Right">
		<UpgradeRow
			rowActionEvents={er}
			rowEditEvents={ee}
			calculatedCumulativeXp={3}
			calculatedXp={6}
			popupDatabase={pdb}
			row={{
				carryoverXp: 10,
				divider: false,
				dividerText: 'Hello',
				dividerXpCumulativeUnlock: false,
				left: null,
				right: '01586',
				mark: '*',
				xp: 8,
				xpUnlock: false,
			}}
		/>
	</Story>

	<Story name="Left Right">
		<UpgradeRow
			rowActionEvents={er}
			rowEditEvents={ee}
			calculatedCumulativeXp={3}
			calculatedXp={6}
			popupDatabase={pdb}
			row={{
				carryoverXp: 10,
				divider: false,
				dividerText: 'Hello',
				dividerXpCumulativeUnlock: false,
				left: '08116',
				right: '08112',
				mark: '*',
				xp: 8,
				xpUnlock: false,
			}}
		/>
	</Story>

	<Story name="Divider">
		<UpgradeRow
			rowActionEvents={er}
			rowEditEvents={ee}
			calculatedCumulativeXp={3}
			calculatedXp={6}
			popupDatabase={pdb}
			row={{
				carryoverXp: 10,
				divider: true,
				dividerText: 'Hello',
				dividerXpCumulativeUnlock: false,
				left: '08116',
				right: '08112',
				mark: '*',
				xp: 8,
				xpUnlock: false,
			}}
		/>
	</Story>

	<Story name="Divider Unlock">
		<UpgradeRow
			rowActionEvents={er}
			rowEditEvents={ee}
			calculatedCumulativeXp={3}
			calculatedXp={6}
			popupDatabase={pdb}
			row={{
				carryoverXp: 10,
				divider: true,
				dividerText: 'Hello',
				dividerXpCumulativeUnlock: true,
				left: '08116',
				right: '08112',
				mark: '*',
				xp: 8,
				xpUnlock: false,
			}}
		/>
	</Story>

	<Story name="Single Left Right">
		<UpgradeRow
			singleMode
			rowActionEvents={er}
			rowEditEvents={ee}
			calculatedCumulativeXp={3}
			calculatedXp={6}
			popupDatabase={pdb}
			row={{
				carryoverXp: 10,
				divider: false,
				dividerText: 'Hello',
				dividerXpCumulativeUnlock: false,
				left: '08116',
				right: '08112',
				mark: '*',
				xp: 8,
				xpUnlock: false,
			}}
		/>
	</Story>

	<Story name="Single Divider">
		<UpgradeRow
			singleMode
			rowActionEvents={er}
			rowEditEvents={ee}
			calculatedCumulativeXp={3}
			calculatedXp={6}
			popupDatabase={pdb}
			row={{
				carryoverXp: 10,
				divider: true,
				dividerText: 'Hello',
				dividerXpCumulativeUnlock: false,
				left: '08116',
				right: '08112',
				mark: '*',
				xp: 8,
				xpUnlock: false,
			}}
		/>
	</Story>
{/await}
