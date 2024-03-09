<script lang="ts">
	import { thePathToCarcosaCampaign } from '$lib/campaign/ptc/campaign'
import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
</script>

<EncounterOverview campaign={thePathToCarcosaCampaign} />
