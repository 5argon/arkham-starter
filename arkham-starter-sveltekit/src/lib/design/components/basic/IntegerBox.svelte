<script lang="ts">
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import Button from './Button.svelte'
	export let label: string
	export let value: number
	export let labelWidth: number | undefined = undefined
	export let onValueChanged: (v: number) => void
</script>

<div>
	<span style={labelWidth !== undefined ? 'width:' + labelWidth + 'px' : undefined} class="title"
		>{label}</span
	>
	<span>
		<Button
			label="Subtract"
			onClick={() => {
				onValueChanged(Math.max(0, value - 1))
			}}
		>
			<FaIcon path={allIcons.minus} />
		</Button>
	</span>
	<span class="number">
		{value}
	</span>
	<span>
		<Button
			label="Add"
			onClick={() => {
				onValueChanged(value + 1)
			}}
		>
			<FaIcon path={allIcons.plus} />
		</Button>
	</span>
</div>

<style>
	.title {
		font-weight: bold;
		padding-right: 8px;
	}

	div {
		display: flex;
		align-items: center;
	}

	.number {
		display: inline-block;
		user-select: none;
		width: 18px;
		text-align: center;
		font-weight: bold;
	}
</style>
