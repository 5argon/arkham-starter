<script lang="ts">
	export let count = 0
	export let attention: boolean = false
</script>

<span class:attention>{count}</span>

<style>
	span {
		margin-left: 6px;
		padding: 0px 4px;
		border-radius: 12px;
		font-weight: bold;
		background-color: rgb(153, 153, 153);
		color: white;
	}

	.attention {
		background-color: red;
		color: white;
	}
</style>
