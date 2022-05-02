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

export interface Column {
	title: string;
	alignment: Alignment;
	prefix: string;
	suffix: string;
	special: ColumnSpecial;
}

export enum ColumnSpecial {
	None,
	LeftSide,
	RightSide,

	/**
	 * Disappear if only left side exists.
	 * Disappear if right side is not a card.
	 */
	Arrow,
	Xp
}

export interface UpgradeTableData {
	rows: Row[];
	columns: Column[];
	importOptions: ImportOptions;
	exportOptions: ExportOptions;
}

export interface Row {
	data: string[];
}
