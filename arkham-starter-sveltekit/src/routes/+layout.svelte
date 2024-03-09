<script lang="ts">
	import '../app.css'

	import Footer from '$lib/design/components/layout/Footer.svelte'
	import Header from '$lib/design/components/layout/Header.svelte'
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
