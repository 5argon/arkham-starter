<script lang="ts">
	import { returnToTheCircleUndoneCampaign } from '$lib/campaign/tcu/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
	import help from '$lib/md/campaign-reference.md?raw'
</script>

<PageTitle
	subTitle="Tool"
	title={'Campaign Reference: ' + returnToTheCircleUndoneCampaign.name}
	helpMd={help}
/>

<EncounterOverview campaign={returnToTheCircleUndoneCampaign} incomplete />
