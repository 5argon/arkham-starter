export const allIcons = {
	rightSingle: ic('angle-right-duotone'),
	rightDouble: ic('angles-right-duotone'),
	arrowUp: ic('arrow-up-solid'),
	arrowDown: ic('arrow-down-solid'),
	delete: ic('trash-regular'),
}

function ic(s: string): string {
	return '/fa/' + s + '.svg'
}