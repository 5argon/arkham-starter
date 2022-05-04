<script lang="ts">
	import CardBlock from './CardBlock.svelte'

	export let cardId: number
</script>

<CardBlock text={'(Unknown card ID ' + cardId + ')'} />
