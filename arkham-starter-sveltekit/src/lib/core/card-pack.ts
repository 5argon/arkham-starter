export enum CardPack {
	CoreSet,
	RevisedCoreSet,

	TheDunwichLegacy,
	ThePathToCarcosa,
	TheForgottenAge,
	TheCircleUndone,
	TheDreamEaters,
	TheInnsmouthConspiracy,
	EdgeOfTheEarth,
	TheScarletKeys,
	TheFeastOfHemlockVale,

	ReturnToTheNightOfTheZealot,
	ReturnToTheDunwichLegacy,
	ReturnToThePathToCarcosa,
	ReturnToTheCircleUndone,
	ReturnToTheForgottenAge,
	ReturnToTheDreamEaters,
	ReturnToTheInnsmouthConspiracy,

	NathanielCho,
	HarveyWalters,
	WinifredHabbamock,
	JacquelineFine,
	StellaClark,

	TheBlobThatAteEverythingElse,

	ParallelInvestigator,
	Novella,

	Unknown,
	RandomBasicWeakness,
}

export function cardPackToRevised(x: CardPack): CardPack {
	if (x === CardPack.CoreSet) {
		return CardPack.RevisedCoreSet
	}
	return x
}

export function isReturnToPack(x: CardPack): boolean {
	if (
		x === CardPack.ReturnToTheNightOfTheZealot ||
		x === CardPack.ReturnToTheDunwichLegacy ||
		x === CardPack.ReturnToThePathToCarcosa ||
		x === CardPack.ReturnToTheCircleUndone ||
		x === CardPack.ReturnToTheForgottenAge ||
		x === CardPack.ReturnToTheDreamEaters ||
		x === CardPack.ReturnToTheInnsmouthConspiracy
	) {
		return true
	}
	return false
}

export function isStarterPack(x: CardPack): boolean {
	if (
		x === CardPack.NathanielCho ||
		x === CardPack.HarveyWalters ||
		x === CardPack.WinifredHabbamock ||
		x === CardPack.JacquelineFine ||
		x === CardPack.StellaClark
	) {
		return true
	}
	return false
}
