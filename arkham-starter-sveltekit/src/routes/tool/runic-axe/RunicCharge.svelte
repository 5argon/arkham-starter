<script lang="ts">
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
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
