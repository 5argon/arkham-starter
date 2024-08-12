import type { AhdbDeckOption } from '$lib/ahdb/card'
import { isOldCore } from '$lib/ahdb/conversion'
import type { FullDatabase, FullDatabaseItem } from '$lib/core/full-database'
import { CardPack } from '$lib/design/interface/card-pack'

export interface WhoCanUseReturn {
	investigator: FullDatabaseItem
	factionSelect: string[]
	optionSelect: string
	options: AhdbDeckOption[]
}

export function whoCanUse(fdb: FullDatabase, cardIds: string[]): WhoCanUseReturn[] {
	const investigators = fdb
		.queryAllInvestigators()
		.filter(
			(x) =>
				!isOldCore(x.original.code) &&
				x.packIcon !== CardPack.Novella &&
				x.original.spoiler === undefined,
		)
	const whoOfEach = cardIds.map((cardId) => {
		const card = fdb.getCard(cardId)
		return whoCode(card, investigators)
	})
	// Intersect all whoOfEach
	const result = whoOfEach.reduce((a, b) =>
		a.filter((c) =>
			b.some((x) => {
				const sameFactionSelect =
					x.factionSelect.length === c.factionSelect.length &&
					x.factionSelect.every((v, i) => v === c.factionSelect[i])

				return (
					sameFactionSelect &&
					x.optionSelect === c.optionSelect &&
					x.investigator.original.code === c.investigator.original.code
				)
			}),
		),
	)
	result.sort((a, b) => {
		if (a.investigator.packIcon != b.investigator.packIcon) {
			return a.investigator.packIcon - b.investigator.packIcon
		}
		if (a.investigator.original.code < b.investigator.original.code) {
			return -1
		}
		if (a.investigator.original.code > b.investigator.original.code) {
			return 1
		}
		return 0
	})
	return result
}

function whoCode(card: FullDatabaseItem, investigators: FullDatabaseItem[]): WhoCanUseReturn[] {
	const expandedInvestigators: WhoCanUseReturn[] = []
	investigators.forEach((x) => {
		if (x.original.deck_options !== undefined) {
			const opts: AhdbDeckOption[] = x.original.deck_options
			const optionSelects = opts.filter((y) => {
				return y.option_select !== undefined
			})
			const factionSelects = opts.filter((y) => {
				return y.faction_select !== undefined
			})
			if (optionSelects.length === 0 && factionSelects.length === 0) {
				// push the original
				expandedInvestigators.push({
					factionSelect: [],
					optionSelect: '',
					investigator: x,
					options: opts,
				})
				return
			}
			// Expand and don't push the original
			if (optionSelects.length > 0) {
				optionSelects.forEach((y, i) => {
					y.option_select?.forEach((z) => {
						const newOption: AhdbDeckOption[] = [...opts, z]
						expandedInvestigators.push({
							investigator: x,
							factionSelect: [],
							optionSelect: z.name ?? '',
							options: newOption,
						})
					})
				})
			}
			if (factionSelects.length > 0) {
				// All combination of faction selects.
				if (factionSelects.length === 1) {
					const fs = factionSelects[0]
					fs.faction_select?.forEach((y) => {
						const newOption: AhdbDeckOption[] = [...opts, { ...fs, faction: [y] }]
						expandedInvestigators.push({
							investigator: x,
							factionSelect: [y],
							optionSelect: '',
							options: newOption,
						})
					})
				} else {
					const fs = factionSelects[0].faction_select
					const fs2 = factionSelects[1].faction_select
					if (fs !== undefined && fs2 !== undefined) {
						for (let i = 0; i < fs.length; i++) {
							for (let j = i + 1; j < fs2.length; j++) {
								const newOption: AhdbDeckOption[] = [
									...opts,
									{ ...factionSelects[0], faction: [fs[i]] },
									{ ...factionSelects[1], faction: [fs2[j]] },
								]
								expandedInvestigators.push({
									investigator: x,
									factionSelect: [fs[i], fs2[j]],
									optionSelect: '',
									options: newOption,
								})
							}
						}
					}
				}
			}
		}
	})
	return expandedInvestigators.filter((x) => {
		const options = x.options
		return canUse(card, options)
	})
}

function canUse(card: FullDatabaseItem, deckOptions: AhdbDeckOption[]): boolean {
	const results = deckOptions.map((x) => qualify(card, x))
	return (
		results.find((x) => x === 'pass') !== undefined &&
		results.find((x) => x === 'fail') === undefined
	)
}

function qualify(card: FullDatabaseItem, opt: AhdbDeckOption): 'pass' | 'fail' | 'next' {
	if (opt.trait !== undefined) {
		const optTraits = opt.trait
		const smallTraits = card.original.traits?.split(' ').map((x) => {
			return x.replace('.', '').toLowerCase()
		})
		if (smallTraits === undefined) {
			return 'next'
		}
		const traitQualify = smallTraits.find((x) => {
			return optTraits.includes(x)
		})
		if (!traitQualify) {
			return 'next'
		}
	}

	function factionMatch(code: string | undefined, optFactions: string[]): boolean {
		if (code === undefined) {
			return false
		}
		if (optFactions.includes(code)) {
			return true
		}
		return false
	}

	if (opt.faction !== undefined) {
		const optFactions = opt.faction
		const match1 = factionMatch(card.original.faction_code, optFactions)
		const match2 = factionMatch(card.original.faction2_code, optFactions)
		const match3 = factionMatch(card.original.faction3_code, optFactions)
		if (!match1 && !match2 && !match3) {
			return 'next'
		}
	}

	if (opt.level !== undefined) {
		if (card.original.xp === undefined) {
			return 'next'
		}
		if (card.original.xp < opt.level.min) {
			return 'next'
		}
		if (card.original.xp > opt.level.max) {
			return 'next'
		}
	}

	if (opt.tag !== undefined) {
		const optTag = opt.tag
		if (card.original.tags === undefined) {
			return 'next'
		}
		const originalTags = card.original.tags
		const splitted = originalTags.split('.')
		const tagQualify = splitted.find((x) => {
			return optTag.includes(x)
		})
		if (!tagQualify) {
			return 'next'
		}
	}

	if (opt.type !== undefined) {
		const found = opt.type.find((x) => {
			if (card.original.type_code === x) {
				return true
			}
		})
		if (!found) {
			return 'next'
		}
	}

	if (opt.uses !== undefined) {
		const found = opt.uses.find((x) => {
			const pattern = `Uses (.* ${x})`
			const match = card.original.text?.match(new RegExp(pattern)) ?? null
			return match !== null
		})
		if (!found) {
			return 'next'
		}
	}

	if (opt.option_select !== undefined) {
		const foundDisqualify = opt.option_select.find((x) => {
			return qualify(card, x)
		})
		if (foundDisqualify) {
			return 'next'
		}
	}

	if (opt.faction_select !== undefined && opt.faction === undefined) {
		// This has been expanded earlier, skip this one.
		return 'next'
	}

	if (opt.not !== undefined && opt.not === true) {
		return 'fail'
	}
	return 'pass'
}
