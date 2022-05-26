<script lang="ts">
	export let currentText: string
	export let onChange: (n: string) => void = () => {
		// do nothing
	}
	function inputChangedHandler(e: Event & { currentTarget: HTMLInputElement }) {
		onChange(e.currentTarget.value)
	}
</script>

<span>
	<input
		class={'input-box-small'}
		type="text"
		value={currentText}
		on:change={inputChangedHandler}
	/>
</span>

<style>
	.input-box-small {
		width: 20px;
		text-align: center;
	}
</style>
