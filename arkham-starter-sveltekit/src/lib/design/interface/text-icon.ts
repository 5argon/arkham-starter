import { TextIcon } from '$lib/core/text-icon'
export { TextIcon }

export const textIconFontClass = 'arkham-icon-font'

export function textIconToFontCharacter(ti: TextIcon): string {
	switch (ti) {
		case TextIcon.StatWillpower:
			return 'p'
		case TextIcon.StatCombat:
			return 'c'
		case TextIcon.StatIntellect:
			return 'b'
		case TextIcon.StatAgility:
			return 'a'
		case TextIcon.StatWild:
			return '?'

		case TextIcon.ClassGuardian:
			return 'f'
		case TextIcon.ClassSeeker:
			return 'h'
		case TextIcon.ClassRogue:
			return 'd'
		case TextIcon.ClassMystic:
			return 'g'
		case TextIcon.ClassSurvivor:
			return 'e'

		case TextIcon.TokenSkull:
			return 'k'
		case TextIcon.TokenCultist:
			return 'l'
		case TextIcon.TokenTablet:
			return 'q'
		case TextIcon.TokenElderThing:
			return 'n'
		case TextIcon.TokenElderSign:
			return 'o'
		case TextIcon.TokenAutoFail:
			return 'm'
		case TextIcon.TokenFrost:
			return 'x'

		case TextIcon.ActionTrigger:
			return 'i'
		case TextIcon.ActionFast:
			return 'j'
		case TextIcon.ActionReaction:
			return '!'

		case TextIcon.Unique:
			return 's'
		case TextIcon.PerInvestigator:
			return ''
	}
}
