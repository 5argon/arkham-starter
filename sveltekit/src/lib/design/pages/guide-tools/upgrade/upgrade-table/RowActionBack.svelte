<script lang="ts">
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'

	export let xpLock: boolean
	export let onXpLockChanged: (n: boolean) => void
</script>

<td>
	<Checkbox
		label="Toggle manual XP calculation"
		checked={xpLock}
		onCheckChanged={onXpLockChanged}
	/>
</td>
