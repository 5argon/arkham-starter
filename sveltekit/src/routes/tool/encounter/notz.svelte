<script lang="ts">
	import { nightOfTheZealotCampaign } from '$lib/campaign/core/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/encounter/EncounterOverview.svelte'
	import help from '$lib/md/encounter.md?raw'
</script>

<PageTitle subTitle="Tool" title={'Encounter Set Quick Reference (Night of the Zealot)'} helpMd={help} />

<EncounterOverview campaign={nightOfTheZealotCampaign} />
