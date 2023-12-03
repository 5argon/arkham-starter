import { CardPack as CardPackIcon } from '$lib/core/card-pack'
import { imageIconPackPath, imageIconPackPathBlack, imageIconPackPathWhite } from './path'
export { CardPackIcon }

export enum CardPackIconColor {
	Black,
	White,
}

export function getPackStaticUrl(pack: CardPackIcon, color: CardPackIconColor): string {
	const withColor =
		imageIconPackPath +
		(color === CardPackIconColor.White ? imageIconPackPathWhite : imageIconPackPathBlack)
	let fileName: string
	switch (pack) {
		case CardPackIcon.CoreSet:
			fileName = 'core'
			break
		case CardPackIcon.RevisedCoreSet:
			fileName = 'core'
			break
		case CardPackIcon.ParallelInvestigator:
			fileName = 'parallel'
			break
		case CardPackIcon.Novella:
			fileName = 'promotional'
			break

		case CardPackIcon.NathanielCho:
			fileName = 'nat'
			break
		case CardPackIcon.HarveyWalters:
			fileName = 'har'
			break
		case CardPackIcon.WinifredHabbamock:
			fileName = 'win'
			break
		case CardPackIcon.JacquelineFine:
			fileName = 'jac'
			break
		case CardPackIcon.StellaClark:
			fileName = 'ste'
			break

		case CardPackIcon.TheDunwichLegacy:
			fileName = 'dwl'
			break
		case CardPackIcon.ThePathToCarcosa:
			fileName = 'ptc'
			break
		case CardPackIcon.TheForgottenAge:
			fileName = 'tfa'
			break
		case CardPackIcon.TheCircleUndone:
			fileName = 'tcu'
			break
		case CardPackIcon.TheDreamEaters:
			fileName = 'tde'
			break
		case CardPackIcon.TheInnsmouthConspiracy:
			fileName = 'tic'
			break
		case CardPackIcon.EdgeOfTheEarth:
			fileName = 'eote'
			break
		case CardPackIcon.TheScarletKeys:
			fileName = 'tsk'
			break

		case CardPackIcon.ReturnToTheNightOfTheZealot:
			fileName = 'rtnotz'
			break
		case CardPackIcon.ReturnToTheDunwichLegacy:
			fileName = 'rtdwl'
			break
		case CardPackIcon.ReturnToThePathToCarcosa:
			fileName = 'rtptc'
			break
		case CardPackIcon.ReturnToTheForgottenAge:
			fileName = 'rttfa'
			break
		case CardPackIcon.ReturnToTheCircleUndone:
			fileName = 'rttcu'
			break
		default:
			return ''
	}
	return `${withColor}/${fileName}.png`
}
