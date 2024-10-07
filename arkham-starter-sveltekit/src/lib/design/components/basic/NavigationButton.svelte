<script lang="ts">
	export let label: string
	export let href: string
	export let center: boolean = false
</script>

<div class="outer" class:center>
	<a {href}>
		<div class="label">{label}</div>
	</a>
</div>

<style>
	.center {
		margin: 2px auto;
	}

	.label {
		text-align: center;
		border-radius: 4px;
		padding: 2px 16px;
		border: 1px solid black;
		font-size: large;
		display: inline-block;
	}
</style>
