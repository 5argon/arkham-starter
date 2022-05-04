<script lang="ts">
	import CardSpan from './CardSpan.svelte'

	export let cardId: number
</script>

<CardSpan text={'(Unknown card ID ' + cardId + ')'} />
