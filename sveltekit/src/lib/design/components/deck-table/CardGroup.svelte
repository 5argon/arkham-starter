<script lang="ts">
	export let level: number
	export let spanning: number
	export let groupName: string
</script>

<tr>
	{#if level === 0}
		<td class="level0" colspan={spanning}>{groupName}</td>
	{:else}
		<td class="level1" colspan={spanning}>{groupName}</td>
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
