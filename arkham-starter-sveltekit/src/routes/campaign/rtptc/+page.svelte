<script lang="ts">
	import { returnToThePathToCarcosaCampaign } from '$lib/campaign/ptc/campaign'
import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
</script>

<EncounterOverview campaign={returnToThePathToCarcosaCampaign} incomplete />
