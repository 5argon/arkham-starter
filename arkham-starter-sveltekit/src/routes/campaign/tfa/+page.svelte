<script lang="ts">
	import { theForgottenAgeCampaign } from '$lib/campaign/tfa/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
	import help from '$lib/md/campaign-reference.md?raw'
</script>

<PageTitle title={'Campaign Reference: The Forgotten Age'} helpMd={help} />

<EncounterOverview campaign={theForgottenAgeCampaign}/>
