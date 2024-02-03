import { GameComponent, type EncounterSet } from '$lib/core/campaign'
import { TextIcon } from '$lib/core/text-icon'

export function makeSetCountText(encounter: EncounterSet): string {
	return `(${encounter.count})`
}

export function gameComponentsToString(gcs: GameComponent[]): string {
	return gcs.map((x) => gameComponentToString(x)).join(', ')
}

export function gameComponentToString(gcs: GameComponent): string {
	switch (gcs) {
		case GameComponent.Seal1:
			return 'Seal1'
		case GameComponent.Seal2:
			return 'Seal2'
		case GameComponent.Seal3:
			return 'Seal3'
		case GameComponent.Seal4:
			return 'Seal4'
		case GameComponent.Seal5:
			return 'Seal5'
		case GameComponent.Token0:
			return '0'
		case GameComponent.TokenM1:
			return '-1'
		case GameComponent.TokenM2:
			return '-2'
		case GameComponent.TokenM3:
			return '-3'
		case GameComponent.TokenM4:
			return '-4'
		case GameComponent.TokenM5:
			return '-5'
		case GameComponent.TokenM6:
			return '-6'
		case GameComponent.TokenM7:
			return '-7'
		case GameComponent.TokenM8:
			return '-8'
		case GameComponent.TokenP1:
			return '+1'
		case GameComponent.TokenSkull:
			return 'Skull'
		case GameComponent.TokenCultist:
			return 'Cultist'
		case GameComponent.TokenTablet:
			return 'Tablet'
		case GameComponent.TokenElderThing:
			return 'Elder Thing'
		case GameComponent.TokenAutofail:
			return 'Autofail'
		case GameComponent.TokenElderSign:
			return 'Elder Sign'
		case GameComponent.TokenFrost:
			return 'Frost Token'
		default:
			return 'Unknown Token'
	}
}

export function gameComponentToTextIcon(gcs: GameComponent): TextIcon | null {
	switch (gcs) {
		case GameComponent.TokenSkull:
			return TextIcon.TokenSkull
		case GameComponent.TokenCultist:
			return TextIcon.TokenCultist
		case GameComponent.TokenTablet:
			return TextIcon.TokenTablet
		case GameComponent.TokenElderThing:
			return TextIcon.TokenElderThing
		case GameComponent.TokenFrost:
			return TextIcon.TokenFrost
		default:
			return null
	}
}
