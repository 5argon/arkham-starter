<script lang="ts">
	export let currentText: string;
	export let prefixText: string;
	export let suffixText: string;
	export let smallBox: boolean;
	export let disableEditing: boolean;
	export let greyOutEditing: boolean;
</script>

<span class="prefix-suffix">{prefixText}</span>
{#if disableEditing}
	<span>{currentText}</span>
{:else}
	<span
		><input
			disabled={greyOutEditing}
			class={smallBox ? 'input-box-small' : 'input-box'}
			type="text"
			value={currentText}
		/></span
	>
{/if}
<span class="prefix-suffix">{suffixText}</span>

<style>
	.prefix-suffix {
		font-size: 0.7em;
		color: rgba(1, 1, 1, 0.2);
	}
	.input-box {
		width: 200px;
	}
	.input-box-small {
		width: 20px;
	}
</style>
