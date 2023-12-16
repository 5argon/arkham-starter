<script lang="ts">
	import CardBlock from '$lib/design/components/card/CardBlock.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import { CardClass } from '$lib/design/interface/card-class'
	import { placeholderCard } from '$lib/tool/upgrade/interface'

	export let onAddToLeftSide: (cardId: string) => void = () => {
		// do nothing
	}

	export let onAddToRightSide: (cardId: string) => void = () => {
		// do nothing
	}
</script>

<CardBlock
	cardId={placeholderCard}
	text={'Placeholder'}
	class1={CardClass.Neutral}
	disableHoverEffects
	dragDataPrefix={'-1,staging,'}
	leftButtons={[]}
	rightButtons={[
		{
			label: 'Add to left side',
			iconPath: allIcons.arrowLeftBordered,
			onClick: () => {
				onAddToLeftSide(placeholderCard)
			},
		},
		{
			label: 'Add to right side',
			iconPath: allIcons.arrowRightBordered,
			onClick: () => {
				onAddToRightSide(placeholderCard)
			},
		},
	]}
/>
