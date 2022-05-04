export enum TextIcon {
	StatWillpower,
	StatCombat,
	StatIntellect,
	StatAgility,
	StatWild,

	ClassGuardian,
	ClassSeeker,
	ClassRogue,
	ClassMystic,
	ClassSurvivor,

	TokenSkull,
	TokenCultist,
	TokenTablet,
	TokenElderThing,
	TokenElderSign,
	TokenAutoFail,

	ActionTrigger,
	ActionFast,
	ActionReaction,

	Unique,
	PerInvestigator,
	Weakness,
}

export const textIconFontClass = 'arkham-icon-font'

export function textIconToFontCharacter(ti: TextIcon): string {
	switch (ti) {
		case TextIcon.StatWillpower:
			return 'A'
		case TextIcon.StatCombat:
			return 'D'
		case TextIcon.StatIntellect:
			return 'F'
		case TextIcon.StatAgility:
			return 'S'
		case TextIcon.StatWild:
			return 'G'

		case TextIcon.ClassGuardian:
			return 'Q'
		case TextIcon.ClassSeeker:
			return 'E'
		case TextIcon.ClassRogue:
			return 'T'
		case TextIcon.ClassMystic:
			return 'W'
		case TextIcon.ClassSurvivor:
			return 'R'

		case TextIcon.TokenSkull:
			return 'N'
		case TextIcon.TokenCultist:
			return 'B'
		case TextIcon.TokenTablet:
			return 'V'
		case TextIcon.TokenElderThing:
			return 'C'
		case TextIcon.TokenElderSign:
			return 'X'
		case TextIcon.TokenAutoFail:
			return 'Z'

		case TextIcon.ActionTrigger:
			return 'I'
		case TextIcon.ActionFast:
			return 'U'
		case TextIcon.ActionReaction:
			return 'Y'

		case TextIcon.Unique:
			return 'K'
		case TextIcon.PerInvestigator:
			return 'H'
		case TextIcon.Weakness:
			return 'J'
	}
	return ''
}
