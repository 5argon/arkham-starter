<script lang="ts">
	export let name: string
</script>

<h1>{name}</h1>
<hr/>
<slot />

<style>
	h1 {
		text-align: left;
		font-size: 1em;
		font-weight: bold;
	}
</style>
