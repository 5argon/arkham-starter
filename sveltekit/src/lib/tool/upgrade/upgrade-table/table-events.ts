import type { PopupDatabase } from '$lib/core/popup-database'

export interface ToolbarEvents {
	onAddCardRow: () => void
	onAddDividerRow: () => void
	onClear: () => void
	onExportMarkdown: (pdb: PopupDatabase) => void
}
