<script lang="ts">
	import {} from 'svelte'
	export let xpLock: boolean
	export let onXpLockChanged: (n: boolean) => void
	function handler(e: Event & { currentTarget: HTMLInputElement }) {
		onXpLockChanged(e.currentTarget.checked)
	}
</script>

<td>
	<input type="checkbox" checked={xpLock} on:change={handler} />
</td>
