export function makeSimpleList(
	upgradeExportOptions: UpgradeExportOptions,
	exportOptions: ExportOptions,
	exportRows: UpgradeRow[],
): string {
	return exportRows
		.map<string>((x) => makeSimpleListOneRow(upgradeExportOptions, exportOptions, x))
		.join('\n')
}

export function makeSimpleListOneRow(
	upgradeExportOptions: UpgradeExportOptions,
	exportOptions: ExportOptions,
	exportRows: UpgradeRow,
): string {
	throw new Error('Function not implemented.')
}
