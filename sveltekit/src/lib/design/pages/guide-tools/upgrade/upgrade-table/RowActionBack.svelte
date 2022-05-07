<script lang="ts">
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'

	export let xpLock: boolean
	export let onXpLockChanged: (n: boolean) => void
</script>

<td>
	<Checkbox
		label="Toggle manual XP calculation"
		checked={xpLock}
		onCheckChanged={onXpLockChanged}
		iconImagePath={allIcons.unlock}
	/>
</td>
