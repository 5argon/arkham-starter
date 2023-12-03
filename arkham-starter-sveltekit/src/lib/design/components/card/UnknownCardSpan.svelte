<script lang="ts">
	import CardSpan from './CardSpan.svelte'

	export let cardId: string
</script>

<CardSpan text={'(Unknown card ID ' + cardId + ')'} />
