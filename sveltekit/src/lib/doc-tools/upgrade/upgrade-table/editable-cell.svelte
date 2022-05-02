<script lang="ts">
	export let currentText: string;
	export let prefixText: string;
	export let suffixText: string;
</script>

<span class="prefix-suffix">{prefixText}</span>
<span>{currentText}</span>
<span class="prefix-suffix">{suffixText}</span>

<style>
	.prefix-suffix {
		font-size: 0.7em;
		color: rgba(1, 1, 1, 0.2);
	}
</style>
