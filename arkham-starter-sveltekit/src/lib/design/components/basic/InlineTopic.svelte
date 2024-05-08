<script lang="ts">
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'

	export let label: string | undefined = undefined
</script>

<div class="flex">
	<div class="topic"><slot name="topic">{label}</slot></div>
	<FaIcon path={allIcons.rightSingle} />
	<div class="flex"><slot /></div>
</div>

<style>
	.flex {
		display: flex;
		align-items: center;
	}

	.topic {
		margin: 2px;
		padding: 2px 4px 2px 4px;
		font-weight: bold;
	}
</style>
