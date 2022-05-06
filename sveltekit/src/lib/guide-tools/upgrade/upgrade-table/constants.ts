import type { AllColumns } from '../interface.ts'
import { Alignment, ColumnSpecial } from '../interface.ts'

export const columns: AllColumns = {
	mark: {
		title: '',
		alignment: Alignment.Left,
		prefix: '',
		suffix: '',
		special: ColumnSpecial.Mark
	},
	left: {
		title: '',
		alignment: Alignment.Left,
		prefix: '',
		suffix: '',
		special: ColumnSpecial.LeftSide
	},
	arrow: {
		title: '',
		alignment: Alignment.Center,
		prefix: '　→　',
		suffix: '',
		special: ColumnSpecial.Arrow
	},
	right: {
		title: '',
		alignment: Alignment.Left,
		prefix: '',
		suffix: '',
		special: ColumnSpecial.RightSide
	},
	xp: {
		title: 'Cost',
		alignment: Alignment.Right,
		prefix: '',
		suffix: 'XP',
		special: ColumnSpecial.Xp
	},
	xpCumulative: {
		title: 'Total',
		alignment: Alignment.Right,
		prefix: '',
		suffix: 'XP',
		special: ColumnSpecial.XpCumulative
	}
}
