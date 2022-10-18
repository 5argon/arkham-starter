<script lang="ts">
	import { allIcons } from '$lib/design/icons/all-icons'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'

	export let checkBoxes: number = 0
	export let checkedBoxes: number = 0
</script>

<span class="outer-span">
	{#each Array(checkBoxes) as _, i}
		<span class="inner-span">
			<FaIcon path={allIcons.checkBox} />
		</span>
	{/each}
	{#each Array(checkedBoxes) as _, i}
		<span class="inner-span">
			<FaIcon path={allIcons.checkBoxChecked} />
		</span>
	{/each}
</span>

<style>
	.outer-span {
		display: flex;
		margin: 0px 2px;
	}

	/* These are inside the card span and should be inside flex */
	.inner-span {
		display: flex;
		margin: 0px -1px;
	}
</style>
