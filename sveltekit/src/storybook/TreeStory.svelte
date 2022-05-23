<script lang="ts">
	export let text: string;
	export let level: number;
	export let path: string[];
	export let navigatorOffset: number;
</script>

<div>
	{#each Array(level) as _}
		<span class="level-padding" style={'width:' + navigatorOffset + 'px'} />
	{/each}
	<a href={'/' + path.join('/')}>{text}</a>
</div>

<style>
	.level-padding {
		display: inline-block;
	}
	a:visited, a:link{
		color: black;
	}
</style>
