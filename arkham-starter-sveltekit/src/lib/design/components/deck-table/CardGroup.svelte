<script lang="ts">
	export let level: number
	export let totalLevels: number
	export let spanning: number
	export let previousGroupNames: (string | null)[]
	export let groupName: string

	$: deep = totalLevels > 2
	let effectiveGroupName: string = groupName
	$: {
		if (!deep) {
			effectiveGroupName = groupName
		} else if (level !== 0 && level !== totalLevels - 1) {
			effectiveGroupName = ''
		} else {
			effectiveGroupName = [...previousGroupNames.slice(1), groupName].join(' : ')
		}
	}
</script>

<tr>
	{#if level === 0}
		<td class="level0" colspan={spanning}>{effectiveGroupName}</td>
	{:else}
		<td class="level1" colspan={spanning}>{effectiveGroupName}</td>
	{/if}
</tr>

<style>
	.level0 {
		color: rgb(33, 33, 33);
		border-bottom: 1px solid rgb(33, 33, 33);
		padding-top: 8px;
	}

	.level1 {
		font-size: x-small;
		color: grey;
	}
</style>
