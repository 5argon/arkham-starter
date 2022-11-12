export enum CardPack {
	Unknown,
	RandomBasicWeakness,

	CoreSet,
	RevisedCoreSet,
	ParallelInvestigator,
	Novella,

	TheDunwichLegacy,
	ThePathToCarcosa,
	TheForgottenAge,
	TheCircleUndone,
	TheDreamEaters,
	TheInnsmouthConspiracy,
	EdgeOfTheEarth,
	TheScarletKeys,

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
