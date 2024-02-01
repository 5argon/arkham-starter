<script lang="ts">
	import type { AhdbCard } from '$lib/ahdb/card'
	import Button from '$lib/design/components/basic/Button.svelte'
	import JsonToolItem from './JsonToolItem.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'

	let jsons: AhdbCard[] = []
</script>

<svelte:head>
	<title>arkham-starter.com | Tool | JSON</title>
</svelte:head>

<ListDivider label="Output" />

<ListDivider label="Input" />

{#each jsons as json, i}
	<JsonToolItem
		{json}
		index={i}
		onChange={(card, index) => {
			jsons[index] = card
			jsons = [...jsons]
		}}
	/>
{/each}

<div class="button-row">
	<Button
		label="Add"
		onClick={() => {
			if (jsons.length > 0) {
				const lc = jsons[jsons.length - 1]
				jsons.push({
					position: lc.position + 1,
					exceptional: false,
					myriad: false,
					code: 'code',
					name: 'name',
					real_name: 'name',
					subname: '',
					pack_code: '',
					pack_name: '',
					type_code: '',
					type_name: '',
					faction_code: lc.faction_code,
					faction_name: lc.faction_name,
					real_text: '',
					quantity: 2,
					health_per_investigator: false,
					deck_limit: 2,
					illustrator: '',
					is_unique: false,
					permanent: false,
					double_sided: false,
					octgn_id: '',
					url: '',
				})
				jsons = [...jsons]
			} else {
				jsons.push({
					position: 0,
					exceptional: false,
					myriad: false,
					code: 'code',
					name: 'name',
					real_name: 'name',
					subname: '',
					pack_code: '',
					pack_name: '',
					type_code: '',
					type_name: '',
					faction_code: 'guardian',
					faction_name: 'Guardian',
					real_text: '',
					quantity: 2,
					health_per_investigator: false,
					deck_limit: 2,
					illustrator: '',
					is_unique: false,
					permanent: false,
					double_sided: false,
					octgn_id: '',
					url: '',
				})
				jsons = [...jsons]
			}
		}}
	/>
</div>

<style>
	.button-row {
		margin: 20px;
	}
</style>
