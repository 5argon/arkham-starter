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
			fileName = '_Core Set'
			break
		case CardPackIcon.RevisedCoreSet:
			fileName = '_Core Set'
			break
		case CardPackIcon.ParallelInvestigator:
			fileName = '_Parallel'
			break
		case CardPackIcon.Novella:
			fileName = '_Novella'
			break

		case CardPackIcon.NathanielCho:
			fileName = 'Nathaniel Cho'
			break
		case CardPackIcon.HarveyWalters:
			fileName = 'Harvey Walters'
			break
		case CardPackIcon.WinifredHabbamock:
			fileName = 'Winifred Habbamock'
			break
		case CardPackIcon.JacquelineFine:
			fileName = 'Jacqueline Fine'
			break
		case CardPackIcon.StellaClark:
			fileName = 'Stella Clark'
			break

		case CardPackIcon.TheDunwichLegacy:
			fileName = '_The Dunwich Legacy'
			break
		case CardPackIcon.ThePathToCarcosa:
			fileName = '_The Path to Carcosa'
			break
		case CardPackIcon.TheForgottenAge:
			fileName = '_The Forgotten Age'
			break
		case CardPackIcon.TheCircleUndone:
			fileName = '_The Circle Undone'
			break
		case CardPackIcon.TheDreamEaters:
			fileName = '_The Dream-Eaters'
			break
		case CardPackIcon.TheInnsmouthConspiracy:
			fileName = '_The Innsmouth Conspiracy'
			break
		case CardPackIcon.EdgeOfTheEarth:
			fileName = '_Edge of the Earth'
			break

		case CardPackIcon.ReturnToTheNightOfTheZealot:
			fileName = '_Return to the Night of the Zealot'
			break
		case CardPackIcon.ReturnToTheDunwichLegacy:
			fileName = '_Return to the Dunwich Legacy'
			break
		case CardPackIcon.ReturnToThePathToCarcosa:
			fileName = '_Return to the Path to Carcosa'
			break
		case CardPackIcon.ReturnToTheForgottenAge:
			fileName = '_Return to the Forgotten Age'
			break
		case CardPackIcon.ReturnToTheCircleUndone:
			fileName = '_Return to the Circle Undone'
			break
		default:
			return ''
	}
	return `${withColor}/${fileName}.png`
}
