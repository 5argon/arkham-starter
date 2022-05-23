<script context="module" lang="ts">
	export const prerender = false
	export async function load({ url }) {
		const deck = url.searchParams.get('deck')
		return {
			props: {
				deck,
			},
		}
	}
</script>

<script lang="ts">
	export let deck: string
</script>

Viewing deck : {deck}
