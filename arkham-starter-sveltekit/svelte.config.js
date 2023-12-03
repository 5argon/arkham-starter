import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
// import decksJson from './src/lib/data/decks.json'
// import type { DeckEntryBeforeProcess } from './src/lib/deck/deck'
// import { Config } from '@sveltejs/kit'

// const rawDecks = decksJson as unknown as DeckEntryBeforeProcess[]

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		// prerender: { entries: rawDecks.map<`/${string}`>((x) => `/deck/${x.raw.id}`) },
	},
}

export default config
