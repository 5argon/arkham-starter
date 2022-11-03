<script lang="ts">
	import { returnToTheNightOfTheZealotCampaign } from '$lib/campaign/notz/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
	import help from '$lib/md/campaign-reference.md?raw'
</script>

<PageTitle
	subTitle="Tool"
	title={'Campaign Reference: ' + returnToTheNightOfTheZealotCampaign.name}
	helpMd={help}
/>

<EncounterOverview campaign={returnToTheNightOfTheZealotCampaign} incomplete />
