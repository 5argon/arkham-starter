<script lang="ts">
	import { theForgottenAgeCampaign } from '$lib/campaign/tfa/campaign'

	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import EncounterOverview from '$lib/design/pages/tool/campaign/EncounterOverview.svelte'
</script>

<EncounterOverview campaign={theForgottenAgeCampaign} />
