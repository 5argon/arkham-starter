<script lang="ts">
	import { edgeOfTheEarthCampaign } from '$lib/campaign/eote/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/encounter/EncounterOverview.svelte'
	import help from '$lib/md/encounter.md?raw'
</script>

<PageTitle
	subTitle="Tool"
	title={'Encounter Set Quick Reference (Edge of the Earth)'}
	helpMd={help}
/>

<EncounterOverview campaign={edgeOfTheEarthCampaign} />
