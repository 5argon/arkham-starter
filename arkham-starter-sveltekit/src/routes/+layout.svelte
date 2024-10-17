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