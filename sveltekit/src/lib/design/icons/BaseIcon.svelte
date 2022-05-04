<script lang="ts">
	export let fileName: string
</script>

<span><img src={'/fa/' + fileName + '.svg'} alt="" /></span>

<style>
	span {
		margin: 0px 2px;
	}
	span img {
		height: 12px;
	}
</style>
