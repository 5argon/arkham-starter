<script lang="ts">
	export let text: string
	export let link: string
</script>

<div class="outer">
	<a href={link}>
		<div>
			{text}
		</div>
	</a>
</div>

<style>
	.outer {
		flex: 1;
		margin: 0px 4px;
		padding: 2px;
		border: 1px solid black;
		font-size: large;
		text-align: center;
		user-select: none;
		cursor: pointer;
	}
</style>
