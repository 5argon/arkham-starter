<script lang="ts">
	export let path: string
	export let spin: boolean = false
</script>

<span><img class={spin ? 'spinning' : ''} src={path} alt="" /></span>

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
	.spinning {
		animation: spin 1s linear infinite;
	}
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
