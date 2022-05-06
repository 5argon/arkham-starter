export const allIcons = {
	rightSingle: ic('angle-right-duotone'),
	rightDouble: ic('angles-right-duotone'),
	arrowUp: ic('arrow-up-solid'),
	arrowDown: ic('arrow-down-solid'),
	arrowLeftBordered: ic('left-regular'),
	arrowRightBordered: ic('right-regular'),
	delete: ic('trash-regular'),
	unlock: ic('lock-open-regular'),
	collapse: ic('arrows-to-line-regular'),
	investigatorRestriction: ic('star-christmas-solid'),
}

function ic(s: string): string {
	return '/fa/' + s + '.svg'
}
