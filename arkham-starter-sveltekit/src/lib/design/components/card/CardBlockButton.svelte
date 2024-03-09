<script context="module" lang="ts">
	export interface CardBlockButtonProp {
		label: string
		iconPath: string
		onClick: () => void
	}
</script>

<script lang="ts">
	import FaIcon from '$lib/design/icons/FaIcon.svelte'

	import Button from '../basic/Button.svelte'
	export let label: string
	export let iconPath: string
	export let onClick: () => void
</script>

<Button {label} {onClick}><FaIcon path={iconPath} /></Button>
