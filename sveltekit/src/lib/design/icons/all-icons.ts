export const allIcons = {
	rightSingle: ic('angle-right-duotone'),
	rightDouble: ic('angles-right-duotone'),
	arrowUp: ic('arrow-up-solid'),
	arrowUpAdd: ic('arrow-up-add-solid'),
	arrowDown: ic('arrow-down-solid'),
	arrowDownAdd: ic('arrow-down-add-solid'),
	arrowLeftBordered: ic('left-regular'),
	arrowRightBordered: ic('right-regular'),
	delete: ic('trash-regular'),
	unlock: ic('lock-open-regular'),
	collapse: ic('arrows-to-line-regular'),
	investigatorRestriction: ic('star-christmas-solid'),
	noticeInfo: ic('circle-info-solid'),
	noticeSuccess: ic('circle-check-solid'),
	noticeError: ic('circle-exclamation-solid'),
	loading: ic('spinner-third-duotone'),
	manual: ic('book-solid'),
}

function ic(s: string): string {
	return '/fa/' + s + '.svg'
}
