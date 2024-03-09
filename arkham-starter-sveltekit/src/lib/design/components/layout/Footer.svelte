<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown'

	import footerMd from '$lib/md/footer.md?raw'
</script>

<footer>
	<div>
		<SvelteMarkdown source={footerMd} />
	</div>
</footer>

<style>
	footer {
		display: flex;
		justify-content: center;
		text-align: center;
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
	}
</style>
