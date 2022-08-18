<script lang="ts">
	import { CardClass } from '$lib/core/card-class'

	import Story from '$lib/design/story/story.svelte'
	import type { UpgradeExportRow } from '$lib/tool/script/export/export-tools-center'
	import { CardInfo_CommitOptions_CommitIcon } from '$lib/proto/generated/card_info'
	import type { ExportOptions } from '$lib/proto/generated/export_options'
	import { GlobalSettings_PipStyle } from '$lib/proto/generated/global_settings'
	import UpgradeExportModalContent from './UpgradeExportModalContent.svelte'
	import {
		UpgradeExportOptions_SimpleListOptions,
		UpgradeExportOptions_SimpleListOptions_BlockStyle,
		UpgradeExportOptions_UpgradeExportStyle,
		type UpgradeExportOptions,
	} from '$lib/proto/generated/upgrade_export'

	let exportRows: UpgradeExportRow[] = [
		{
			cardLeft: {
				cardName: 'Test Card',
				class1: CardClass.Guardian,
				class2: null,
				class3: null,
				cost: 4,
				exceptional: false,
				exceptionalTaboo: false,
				id: '01073',
				skillAgility: 1,
				skillCombat: 1,
				skillIntellect: 1,
				skillWild: 0,
				skillWillpower: 0,
				traits: [],
				xp: 1,
				xpTaboo: 2,
			},
			cardRight: {
				cardName: 'Test Card 2',
				class1: CardClass.Survivor,
				class2: null,
				class3: null,
				cost: 4,
				exceptional: false,
				exceptionalTaboo: false,
				id: '01073',
				skillAgility: 1,
				skillCombat: 1,
				skillIntellect: 1,
				skillWild: 0,
				skillWillpower: 0,
				traits: [],
				xp: 3,
				xpTaboo: 0,
			},
			divider: false,
			dividerText: '',
			mark: 'O',
			xp: 14,
			xpCumulative: 38,
			xpCumulativeUnlocked: false,
			xpUnlocked: true,
		},
		{
			cardLeft: null,
			cardRight: null,
			divider: true,
			dividerText: 'Divider Row',
			mark: '',
			xp: 18,
			xpCumulative: 45,
			xpCumulativeUnlocked: true,
			xpUnlocked: false,
		},
		{
			cardLeft: {
				cardName: 'Test Card',
				class1: CardClass.Rogue,
				class2: null,
				class3: null,
				cost: 4,
				exceptional: false,
				exceptionalTaboo: false,
				id: '01073',
				skillAgility: 1,
				skillCombat: 1,
				skillIntellect: 1,
				skillWild: 0,
				skillWillpower: 0,
				traits: [],
				xp: 1,
				xpTaboo: 2,
			},
			cardRight: {
				cardName: 'Test Card',
				class1: CardClass.Survivor,
				class2: CardClass.Mystic,
				class3: null,
				cost: 4,
				exceptional: false,
				exceptionalTaboo: false,
				id: '01073',
				skillAgility: 1,
				skillCombat: 1,
				skillIntellect: 1,
				skillWild: 0,
				skillWillpower: 0,
				traits: [],
				xp: 3,
				xpTaboo: 0,
			},
			divider: false,
			dividerText: '',
			mark: 'O',
			xp: 14,
			xpCumulative: 38,
			xpCumulativeUnlocked: false,
			xpUnlocked: true,
		},
	]
	let upgradeExportOptions: UpgradeExportOptions = {
		arrow: {
			character: '→',
			highlightUpgrade: true,
		},
		columns: {
			cumulativeColumn: true,
			markColumn: true,
			xpColumn: true,
		},
		headers: {
			costHeader: 'Cost',
			totalHeader: 'Total',
		},
		ignoreSmall: false,
		simpleList: false,
		splitDivider: true,
		xpSuffix: 'XP',
		showLink: false,
		showLinkText: 'link',
		upgradeExportStyle: UpgradeExportOptions_UpgradeExportStyle.MarkdownArkhamDb,
		upgradeUrl: true,
		simpleListOptions: { blockStyle: UpgradeExportOptions_SimpleListOptions_BlockStyle.A },
	}
	let exportOptions: ExportOptions = {
		cardInfo: {
			cardInfoTypes: [],
			commitOptions: { highlight: CardInfo_CommitOptions_CommitIcon.Unknown },
			traitOptions: { highlight: '' },
		},
		cardOptions: {
			bold: false,
			classIcons: true,
			color: true,
			exceptionalIcon: true,
			link: true,
			tabooIcon: true,
		},
		globalSettings: {
			pipStyle: GlobalSettings_PipStyle.Pips,
			taboo: true,
		},
	}
	let onChangeUpgradeExportOptions: (n: UpgradeExportOptions) => void = (n) => {
		upgradeExportOptions = n
	}
	let onChangeExportOptions: (n: ExportOptions) => void = (n) => {
		exportOptions = n
	}
</script>

<Story name="Test">
	<UpgradeExportModalContent
		singleMode={false}
		{exportOptions}
		{exportRows}
		{onChangeExportOptions}
		{onChangeUpgradeExportOptions}
		{upgradeExportOptions}
		importDeckUrl="something.com"
	/>
</Story>
