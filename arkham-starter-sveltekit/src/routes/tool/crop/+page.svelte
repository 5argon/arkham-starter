<script lang="ts">
	import Checkbox from '$lib/design/components/basic/Checkbox.svelte'
	import ListDivider from '$lib/design/components/basic/ListDivider.svelte'
	import CardForm from '$lib/design/components/form/CardForm.svelte'
	import PageTitle from '$lib/design/components/layout/PageTitle.svelte'
	import { browser } from '$app/environment'
	import type { PageData } from './$types'
	import Button from '$lib/design/components/basic/Button.svelte'
	export let data: PageData
	let selected: string | null = null
	let startingWidth = 630 / 2
	let startingHeight = 880 / 2
	$: horizontal = selected ? data.pdb.getByIdThrowNull(selected).original.inv : false

	let resizePercentageInteger = 100
	$: resizePercentage = resizePercentageInteger / 100
	$: resizeWidth = Math.round((horizontal ? startingHeight : startingWidth) * resizePercentage)
	$: resizeHeight = Math.round((horizontal ? startingWidth : startingHeight) * resizePercentage)
	let horizontalCropInteger = 100
	let verticalCropInteger = 100
	$: cropWidth = Math.round((resizeWidth * horizontalCropInteger) / 100)
	$: cropHeight = Math.round((resizeHeight * verticalCropInteger) / 100)
	let verticalMaskInteger = 0
	let horizontalMaskInteger = 0
	$: frameTop = -Math.round((resizeHeight * verticalMaskInteger) / 100)
	$: frameLeft = -Math.round((resizeWidth * horizontalMaskInteger) / 100)

	let imageSrc: string
	let divStyleText: string
	let imgStyleText: string
	let template: string
	$: imageSrc = `https://arkhamdb.com/bundles/cards/${selected}.png`
	$: divStyleText = `padding:8px 0px; width:${cropWidth}px; height:${cropHeight}px; overflow:hidden;`
	$: imgStyleText = `margin-top:${frameTop}px; margin-left:${frameLeft}px;`
	$: template = `<center style="padding:8px 0px;"><div style="${divStyleText}"><img style="${imgStyleText}" src="${imageSrc}" width=${resizeWidth} height=${resizeHeight}/></div></center>`

	$: divStyleText2 = `padding:8px 0px; width: ${resizeWidth}px; height: ${resizeHeight}px; background: no-repeat url("${imageSrc}"); background-position: ${frameLeft}px ${frameTop}px;`
	$: template2 = `<div style="${divStyleText2}"></div>`

	function copyToClipboard(s: string) {
		if (browser) {
			navigator.clipboard.writeText(s)
		}
	}
</script>

<svelte:head>
	<title>arkham-starter.com | Tool | Crop</title>
</svelte:head>

<PageTitle title="Crop Player Cards" />

<p>
	This tool is used to generate HTML for arkhamdb.com deck description that displays a centered,
	cropped / scaled card image. The image is also hosted on arkhamdb.com, so there is no need to
	upload the image elsewhere.
</p>
<p>
	Technical information : arkhamdb.com strips out the following CSS : overflow (so we can't use
	overflow:hidden trick), background-size (makes background difficult).
</p>

<ListDivider label="Result" />

{#if selected !== null}
	<div>
		<div><Button label="Copy To Clipboard" onClick={() => copyToClipboard(template2)} /></div>
		<div><textarea style="width: 600px;" rows={4}>{template2}</textarea></div>
	</div>
{/if}

<ListDivider label="Design" />
<CardForm
	popupDatabase={data.pdb}
	onSelectChanged={(s) => {
		if (s.length > 0) {
			selected = s[s.length - 1]
		} else {
			selected = null
		}
	}}
	selected={selected ? [selected] : []}
	title={'Search Result'}
	placeholder={"Search by card's name"}
	filter={(pdbi) => {
		return pdbi.original.sp !== true && pdbi.original.hd !== true
	}}
/>
<!-- 
<Checkbox
	checked={horizontal}
	label="Horizontal"
	onCheckChanged={(c) => {
		horizontal = c
	}}
/> -->

<label for="volume">Resize</label>
<input
	type="range"
	id="volume"
	name="volume"
	min="50"
	max="200"
	step="0.01"
	bind:value={resizePercentageInteger}
/>

<label for="volume">Horizontal Crop</label>
<input
	type="range"
	id="horizontalCrop"
	name="horizontalCrop"
	min="0"
	max="100"
	step="0.01"
	bind:value={horizontalCropInteger}
/>

<label for="volume">Vertical Crop</label>
<input
	type="range"
	id="verticalCrop"
	name="verticalCrop"
	min="0"
	max="100"
	step="0.01"
	bind:value={verticalCropInteger}
/>

<label for="volume">Vertical Mask</label>
<input
	type="range"
	id="verticalMask"
	name="verticalMask"
	min="0"
	max="100"
	step="0.01"
	bind:value={verticalMaskInteger}
/>

<label for="volume">Horizontal Mask</label>
<input
	type="range"
	id="horizontalMask"
	name="horizontalMask"
	min="0"
	max="100"
	step="0.01"
	bind:value={horizontalMaskInteger}
/>

<!-- {#if selected !== null}
	<div style={divStyleText}>
		<img width={resizeWidth} height={resizeHeight} style={imgStyleText} src={imageSrc} alt="Card" />
	</div>
{/if} -->
{#if selected !== null}
	<div class="aim">
		<div class="content" style={divStyleText2}></div>
	</div>
{/if}

<style>
	.aim {
		display: inline-block;
		border: 1px solid black;
	}
</style>
