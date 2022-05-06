<script lang="ts">
	export let path: string
</script>

<span><img src={path} alt="" /></span>

<style>
	span {
		user-select: none;
		margin: 0px 2px;
		display: inline-flex;
		align-items: center;
	}
	span img {
		height: 12px;
	}
</style>
