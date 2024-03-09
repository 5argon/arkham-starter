<script lang="ts">
	import { allIcons } from '$lib/design/icons/all-icons'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	export let charged: boolean
	export let spending: boolean
</script>

<tr>
	<td>
		<span class="charge">
			{#if charged}
				🌕
			{:else}
				🌑
			{/if}
			{#if spending}
				<FaIcon path={allIcons.arrowRightBordered} />
			{/if}
		</span>
	</td>
</tr>

<style>
	.charge {
		user-select: none;
	}
</style>
