export const baseUrl = 'https://arkhamdb.com'
const apiPublic: string[] = [baseUrl, 'api', 'public']
export const publicApiCard = [...apiPublic, 'card']
export const publicApiCards = [...apiPublic, 'cards']
export const publicApiDecklist = [...apiPublic, 'decklist']
export const publicApiDeck = [...apiPublic, 'deck']
export const publicApiPacks = [...apiPublic, 'packs']
export const publicApiTaboos = [...apiPublic, 'taboos']

export const realUrlDecklist = [baseUrl, 'decklist', 'view']
export const realUrlDeck = [baseUrl, 'deck', 'view']

export const arkhamBuildShareApiUrl = ['https://api.arkham.build/v1/public', 'share']
export const arkhamBuildShareRealUrl = ['https://arkham.build', 'share']

export const arkhamStarterDeckUrl = ['https://arkham-starter.com/deck']