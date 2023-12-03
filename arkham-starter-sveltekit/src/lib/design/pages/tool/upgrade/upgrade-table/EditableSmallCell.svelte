<script lang="ts">
	export let currentText: string
	export let onChange: (n: string) => void = () => {
		// do nothing
	}
	export let justText: boolean = false
	function inputChangedHandler(e: Event & { currentTarget: HTMLInputElement }) {
		onChange(e.currentTarget.value)
	}
</script>

<span>
	{#if justText}
		<span class="just-text">
			{currentText}
		</span>
	{:else}
		<input
			class={'input-box-small'}
			type="text"
			value={currentText}
			on:change={inputChangedHandler}
		/>
	{/if}
</span>

<style>
	.just-text {
		width: 20px;
		text-align: center;
		display: inline-block;
	}

	.input-box-small {
		width: 20px;
		text-align: center;
	}
</style>
