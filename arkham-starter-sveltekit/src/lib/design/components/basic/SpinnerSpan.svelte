<script lang="ts">
	import { allIcons } from '$lib/design/icons/all-icons'
import FaIcon from '$lib/design/icons/FaIcon.svelte'

	export let text: string | null = null
</script>

<span>
	<FaIcon spin path={allIcons.loading} />
	{#if text !== null}{text}{/if}
</span>

<style>
</style>
