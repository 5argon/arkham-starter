<script lang="ts">
	export let text: string
	export let link: string
</script>

<div class="outer">
	<a href={link}>
		<div>
			{text}
		</div>
	</a>
</div>

<style>
	.outer {
		padding: 6px 12px;
		text-align: center;
		user-select: none;
	}
</style>
