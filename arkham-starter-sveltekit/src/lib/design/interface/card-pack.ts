import { CardPack } from '$lib/core/card-pack'

import { imageIconPackPath, imageIconPackPathBlack, imageIconPackPathWhite } from './path'
export { CardPack }

export enum CardPackIconColor {
	Black,
	White,
}

export function getPackStaticUrl(pack: CardPack, color: CardPackIconColor): string {
	const withColor =
		imageIconPackPath +
		(color === CardPackIconColor.White ? imageIconPackPathWhite : imageIconPackPathBlack)
	let fileName: string
	switch (pack) {
		case CardPack.CoreSet:
			fileName = 'core'
			break
		case CardPack.RevisedCoreSet:
			fileName = 'core'
			break
		case CardPack.ParallelInvestigator:
			fileName = 'parallel'
			break
		case CardPack.Novella:
			fileName = 'promotional'
			break

		case CardPack.NathanielCho:
			fileName = 'nat'
			break
		case CardPack.HarveyWalters:
			fileName = 'har'
			break
		case CardPack.WinifredHabbamock:
			fileName = 'win'
			break
		case CardPack.JacquelineFine:
			fileName = 'jac'
			break
		case CardPack.StellaClark:
			fileName = 'ste'
			break

		case CardPack.TheDunwichLegacy:
			fileName = 'dwl'
			break
		case CardPack.ThePathToCarcosa:
			fileName = 'ptc'
			break
		case CardPack.TheForgottenAge:
			fileName = 'tfa'
			break
		case CardPack.TheCircleUndone:
			fileName = 'tcu'
			break
		case CardPack.TheDreamEaters:
			fileName = 'tde'
			break
		case CardPack.TheInnsmouthConspiracy:
			fileName = 'tic'
			break
		case CardPack.EdgeOfTheEarth:
			fileName = 'eote'
			break
		case CardPack.TheScarletKeys:
			fileName = 'tsk'
			break
		case CardPack.TheFeastOfHemlockVale:
			fileName = 'fhv'
			break
		case CardPack.TheDrownedCity:
			fileName = 'tdc'
			break

		case CardPack.TheBlobThatAteEverythingElse:
			fileName = 'blbe'
			break

		case CardPack.ReturnToTheNightOfTheZealot:
			fileName = 'rtnotz'
			break
		case CardPack.ReturnToTheDunwichLegacy:
			fileName = 'rtdwl'
			break
		case CardPack.ReturnToThePathToCarcosa:
			fileName = 'rtptc'
			break
		case CardPack.ReturnToTheForgottenAge:
			fileName = 'rttfa'
			break
		case CardPack.ReturnToTheCircleUndone:
			fileName = 'rttcu'
			break
		default:
			return ''
	}
	return `${withColor}/${fileName}.png`
}

export function getCampaignStaticUrl(pack: CardPack, color: CardPackIconColor): string {
	const withColor =
		imageIconPackPath +
		(color === CardPackIconColor.White ? imageIconPackPathWhite : imageIconPackPathBlack)
	let fileName: string
	switch (pack) {
		case CardPack.EdgeOfTheEarth:
			fileName = 'eotec'
			break
		case CardPack.TheScarletKeys:
			fileName = 'tskc'
			break
		case CardPack.TheFeastOfHemlockVale:
			fileName = 'fhvc'
			break
		default:
			return getPackStaticUrl(pack, color)
	}
	return `${withColor}/${fileName}.png`
}
