<script context="module" lang="ts">
	export enum EditingLevel {
		Editable,
		GreyedOut,
		JustText,
	}
	export enum NoticeLevel {
		Normal,
		Success,
		Error,
	}
</script>

<script lang="ts">
	import { allIcons } from '$lib/design/icons/all-icons'

	import FaIcon from '$lib/design/icons/FaIcon.svelte'
	import { topCssTextError, topCssTextSuccess } from '$lib/design/interface/top-css-class'

	import Button from './Button.svelte'
	import SpinnerSpan from './SpinnerSpan.svelte'

	export let currentText: string
	export let label: string | null = null
	export let placeholderText: string = ''
	export let rightAlign: boolean = false
	export let editingLevel: EditingLevel = EditingLevel.Editable
	export let submitButtonText: string | null = null
	export let enableNotice: boolean = false
	export let noticeText: string | null = null
	export let noticeLevel: NoticeLevel = NoticeLevel.Normal
	export let spinnerText: string | null = null
	export let onChange: (n: string) => void = () => {
		// do nothing
	}
	export let onEndEdit: (n: string) => void = () => {
		// do nothing
	}
	export let onSubmit: (n: string) => void = () => {
		// do nothing
	}

	function inputEndEditHandler(e: Event & { currentTarget: HTMLInputElement }) {
		onEndEdit(e.currentTarget.value)
	}

	function inputKeyboardHandler(e: KeyboardEvent & { currentTarget: HTMLInputElement }) {
		if (e.key === 'Enter') {
			onSubmit(e.currentTarget.value)
		}
	}

	function inputChangeHandler(e: Event & { currentTarget: HTMLInputElement }) {
		onChange(e.currentTarget.value)
	}

	$: rightAlignClass = rightAlign ? 'right-align' : ''

	$: disabled = spinnerText !== null || editingLevel === EditingLevel.GreyedOut
	let noticeIcon: string
	$: {
		switch (noticeLevel) {
			case NoticeLevel.Normal:
				noticeIcon = allIcons.noticeInfo
				break
			case NoticeLevel.Error:
				noticeIcon = allIcons.noticeError
				break
			case NoticeLevel.Success:
				noticeIcon = allIcons.noticeSuccess
				break
		}
	}
	let colorClass: string
	$: {
		switch (noticeLevel) {
			case NoticeLevel.Normal:
				colorClass = ''
				break
			case NoticeLevel.Error:
				colorClass = topCssTextError
				break
			case NoticeLevel.Success:
				colorClass = topCssTextSuccess
				break
		}
	}
</script>

{#if label !== null}
	<div class="label">{label}</div>
{/if}
<div class="outer-flex">
	{#if editingLevel === EditingLevel.JustText}
		<div>{currentText}</div>
	{:else}
		<input
			{disabled}
			class={'text-box-input' + ' ' + rightAlignClass}
			type="text"
			placeholder={placeholderText}
			on:change={inputChangeHandler}
			on:input={inputChangeHandler}
			on:keyup={inputKeyboardHandler}
			value={currentText}
		/>
	{/if}
	{#if submitButtonText !== null}
		<Button {disabled} label={submitButtonText} onClick={() => onSubmit(currentText)} />
	{/if}
</div>

<div class="below-text">
	{#if spinnerText !== null}
		<div class="spinner-text">
			<SpinnerSpan text={spinnerText} />
		</div>
	{:else if enableNotice}
		<div class={'notice-text' + ' ' + colorClass}>
			{#if noticeText !== null}
				<FaIcon path={noticeIcon} /> {noticeText}
			{/if}
		</div>
	{/if}
</div>

<style>
	.notice-text {
		height: 20px;
	}

	.label {
		font-weight: bold;
	}

	.outer-flex {
		display: flex;
	}
	.text-box-input {
		width: 100%;
	}
	.prefix-suffix {
		font-size: 0.7em;
		color: rgba(1, 1, 1, 0.2);
	}

	.input-box {
		width: 200px;
	}

	.input-box-small {
		width: 20px;
	}

	.right-align {
		text-align: right;
	}

	.below-text {
		margin: 4px 0px;
	}
</style>
