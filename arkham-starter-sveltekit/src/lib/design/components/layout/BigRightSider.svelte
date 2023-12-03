<script lang="ts">
	export let viewingLeft: boolean = false
</script>

<div class="flex-outer">
	<div class={'flex-inner left'}>
		<slot name="left" />
	</div>
	{#if !viewingLeft}
		<div class={'flex-inner right'}>
			<slot name="right" />
		</div>
	{/if}
</div>

<style>
	.flex-outer {
		display: flex;
	}

	.left {
		flex: 3;
		padding-right: 4px;
	}

	.right {
		flex: 9;
		padding-left: 4px;
	}
</style>
