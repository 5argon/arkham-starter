<script lang="ts">
	import Button from '$lib/design/components/basic/Button.svelte'
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import IntegerBox from '$lib/design/components/basic/IntegerBox.svelte'
	import LimitedTab from '$lib/design/components/layout/LimitedTab.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import { allIcons } from '$lib/design/icons/all-icons'
	import FaIcon from '$lib/design/icons/FaIcon.svelte'

	import RunicCharge from './RunicCharge.svelte'
	let combat = 4
	let commit = 0
	let plusDamage = 0
	let enemy = 3
	let shroud = 3
	let charge = 4

	let glory = false
	let elders = false
	let hunt = false
	let fury = false
	let ancientPower = false
	let saga = false
	let scriptWeaver = false

	const maxCharge = 4
</script>

<svelte:head>
	<title>arkham-starter.com | Tool | Runic Axe</title>
</svelte:head>

<PageTitle title="Runic Axe" />

<p>Mobile screen friendly calculator for Runic Axe player.</p>

<LimitedTab>
	<span slot="tab2">Upgrade Sheet</span>
	<span slot="content2">
		<div>
			<Checkbox
				label={'Inscription of Glory'}
				checked={glory}
				onCheckChanged={(x) => {
					glory = x
				}}
			/>
		</div>
		<div>
			<Checkbox
				label={'Inscription of the Elders'}
				checked={elders}
				onCheckChanged={(x) => {
					elders = x
				}}
			/>
		</div>
		<div>
			<Checkbox
				label={'Inscription of the Hunt'}
				checked={hunt}
				onCheckChanged={(x) => {
					hunt = x
				}}
			/>
		</div>
		<div>
			<Checkbox
				label={'Inscription of Fury'}
				checked={fury}
				onCheckChanged={(x) => {
					fury = x
				}}
			/>
		</div>
		<div>
			<Checkbox
				label={'Ancient Power'}
				checked={ancientPower}
				onCheckChanged={(x) => {
					ancientPower = x
				}}
			/>
		</div>
		<div>
			<Checkbox
				label={'Saga'}
				checked={saga}
				onCheckChanged={(x) => {
					saga = x
				}}
			/>
		</div>
		<div>
			<Checkbox
				label={'Scriptweaver'}
				checked={scriptWeaver}
				onCheckChanged={(x) => {
					scriptWeaver = x
				}}
			/>
		</div>
	</span>
	<span slot="tab1">Calculator</span>
	<span slot="content1">
		<IntegerBox
			label="Enemy Combat"
			labelWidth={130}
			value={enemy}
			onValueChanged={(x) => {
				enemy = x
			}}
		/>
		{#if elders}
			<IntegerBox
				label="Shroud"
				labelWidth={130}
				value={shroud}
				onValueChanged={(x) => {
					shroud = x
				}}
			/>
		{/if}

		<table>
			<tr>
				<td />
				<td> Combat </td>
				<td> Damage </td>
				<td />
				<td />
				<td />
				<td />
			</tr>
			<tr>
				<td>
					<Button
						label="-"
						onClick={() => {
							charge = Math.max(0, charge - 1)
						}}
					>
						<FaIcon path={allIcons.minus} />
					</Button>
					<Button
						label="+"
						onClick={() => {
							const add = saga ? 2 : 1
							charge = Math.min(maxCharge, charge + add)
						}}
					>
						<FaIcon path={allIcons.plus} />
					</Button>
				</td>
				<td>
					<IntegerBox
						label=""
						value={combat}
						onValueChanged={(x) => {
							combat = x
						}}
					/>
				</td>
				<td>1</td>
			</tr>
			<tr>
				<td>
					<Button
						label="Spend"
						onClick={() => {
							// TODO
						}}
					/>
				</td>
				<td>
					<IntegerBox
						label=""
						value={commit}
						onValueChanged={(x) => {
							commit = x
						}}
					/>
				</td>
				<td>
					<IntegerBox
						label=""
						value={plusDamage}
						onValueChanged={(x) => {
							plusDamage = x
						}}
					/>
				</td>
			</tr>
			<tr>
				<td />
				<td> Accuracy </td>
				<td> Power </td>
				<td> Glory </td>
				<td> Elders </td>
				<td> Hunt </td>
				<td> Fury </td>
			</tr>
			{#each new Array(maxCharge) as _, i}
				<RunicCharge charged={i < charge} spending={true} />
			{/each}
		</table>
	</span>
</LimitedTab>
