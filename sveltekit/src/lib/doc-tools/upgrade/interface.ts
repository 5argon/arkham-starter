export interface ExportOptions {
	card: CardOptions;
}

export interface ImportOptions {
	arrow: string;
	suffix1Regex: string;
	suffix2Regex: string;
}

export interface CardOptions {
	taboo: boolean;
	pips: boolean;
	classIcon: boolean;
}

export enum PipStyle {
	None,
	Number,
	Pips
}

export enum Alignment {
	Left,
	Center,
	Right
}

export interface AllColumns {
	mark: Column;
	left: Column;
	arrow: Column;
	right: Column;
	xp: Column;
	xpCumulative: Column;
}

export interface Column {
	title: string;
	alignment: Alignment;
	prefix: string;
	suffix: string;
	special: ColumnSpecial;
}

export enum ColumnSpecial {
	Mark,
	LeftSide,
	RightSide,
	Arrow,
	Xp,
	XpCumulative
}

export interface UpgradeTableData {
	rows: Row[];
	columns: Column[];
	importOptions: ImportOptions;
	exportOptions: ExportOptions;
}

export interface Row {
	mark: string;
	left: string;
	right: string;
	xp: number;
	xpCumulative: number;
	divider: boolean;
	carryoverXp: number;
	xpUnlock:boolean
}
