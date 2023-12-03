<script lang="ts">
	export let text: string;
	export let level: number;
	export let navigatorOffset: number;
</script>

<div>
	{#each Array(level) as _}
		<span class="level-padding" style={'width:' + navigatorOffset + 'px'} />
	{/each}
	<span>{text}</span>
</div>

<style>
	.level-padding {
		display: inline-block;
	}
</style>
