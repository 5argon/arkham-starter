export type Localization = 'en' | 'th'
export const defaultLocalization: Localization = 'en'

const localizedCardName: Record<Exclude<Localization, 'en'>, Record<string, string>> = {
	th: {},
}

export function getLocalizedCardName(
	originalName: string,
	code: string,
	localization: Exclude<Localization, 'en'>,
): string {
	return localizedCardName[localization][code] || originalName
}
