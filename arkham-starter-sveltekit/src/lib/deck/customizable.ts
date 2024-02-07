import type { CustomizableMeta } from '$lib/ahdb/public-api/high-level'
import type { PopupDatabase } from '$lib/core/popup-database'

function processText(d: string): string {
	const regex = /\[\[(.*?)\]\]/g
	const result = d.replace(regex, '$1').replace('_____', '')
	return result
}

function processDetail(popupDatabase: PopupDatabase, d: string): string {
	const tryGetCard = popupDatabase.getById(d)
	if (tryGetCard !== null) {
		return tryGetCard.original.n
	} else if (d.includes('^')) {
		const split = d.split('^')
		return split
			.map<string>((x) => {
				const tryGetCard = popupDatabase.getById(x)
				if (tryGetCard !== null) {
					return tryGetCard.original.n
				}
				return x
			})
			.join(', ')
	}
	return d
}

export interface ProcessedCustomizable {
	xp: number
	options: CustomizableOption[]
}

export interface CustomizableOption {
	checkedBoxes: number
	uncheckedBoxes: number
	text: string
	detail: string
}

export function processCustomizable(
	cardId: string,
	customizableMetas: CustomizableMeta[],
	popupDatabase: PopupDatabase,
): ProcessedCustomizable {
	const card = popupDatabase.getByIdThrowNull(cardId)
	const matchedCustomizables = customizableMetas
		.filter((x) => {
			return x.card === cardId
		})
		.sort((a, b) => a.index - b.index)

	// If not customizable, this stays empty.
	const newRealCust: CustomizableOption[] = []
	matchedCustomizables.forEach((x) => {
		if (card.original.cus && card.original.cus.length > x.index) {
			const c = card.original.cus[x.index]
			const zeroMax = c.xp === 0
			if (zeroMax || x.checked > 0) {
				newRealCust.push({
					text: processText(c.n),
					checkedBoxes: x.checked,
					uncheckedBoxes: c.xp - x.checked,
					detail: processDetail(popupDatabase, x.detail),
				})
			}
		}
	})

	const totalChecked = matchedCustomizables.reduce((a, b) => a + b.checked, 0)
	const custXp = Math.ceil(totalChecked / 2)
	const realCust = newRealCust
	return {
		xp: custXp,
		options: realCust,
	}
}
