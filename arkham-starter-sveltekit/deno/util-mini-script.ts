import { walk } from 'https://deno.land/std@0.210.0/fs/mod.ts'

const setToName: { [key: string]: string } = {
	DWLC: 'The Dunwich Legacy (Campaign Expansion)',
	DWLP: 'The Dunwich Legacy (Investigator Expansion)',
	PTCC: 'The Path to Carcosa (Campaign Expansion)',
	PTCP: 'The Path to Carcosa (Investigator Expansion)',
	TFAC: 'The Forgotten Age (Campaign Expansion)',
	TFAP: 'The Forgotten Age (Investigator Expansion)',
	TCUP: 'The Circle Undone (Investigator Expansion)',
	TCUC: 'The Circle Undone (Campaign Expansion)',
	TDEP: 'The Dream-Eaters (Investigator Expansion)',
	TDEC: 'The Dream-Eaters (Campaign Expansion)',
	TICC: 'The Innsmouth Conspiracy (Campaign Expansion)',
	TICP: 'The Innsmouth Conspiracy (Investigator Expansion)',
	EOTEP: 'Edge of the Earth (Investigator Expansion)',
	EOTEC: 'Edge of the Earth (Campaign Expansion)',
	TSKP: 'The Scarlet Keys (Investigator Expansion)',
	TSKC: 'The Scarlet Keys (Campaign Expansion)',
	FHVP: 'The Feast of Hemlock Vale (Investigator Expansion)',
	FHVC: 'The Feast of Hemlock Vale (Campaign Expansion)',
	SS: 'Standalone Scenario',
	PAR: 'Parallel Investigator',
}

interface ResultItem {
	setCode: string
	setName: string
	hash: string
	name: string
	members: ResultItemMember[]
}

interface HashToDescription {
	hash: string
	description: string
}

interface ResultItemMember {
	variation: number
	quantity: number
	frontName: string
	backName: string
}

let items = new Map<string, ResultItem>()
const hashToDescription = new Map<string, HashToDescription>()

for await (const entry of walk('static/image/custom/utility-mini-card/full', {
	includeDirs: false,
})) {
	// Naming format : SET-NAME-NAME-ETC-1-x2-A.png
	// SET: Able to map into full name and automatically categorize into folders.
	// NAME: Any amount of names until we reach variation number.
	// 1: Variation number. Must contain A and B of the same number.
	// x2: Quantity, both front and back must use the same number.
	// A/B: Front/Back
	if (entry.name === '.DS_Store') {
		continue
	}
	if (entry.isFile) {
		const fullName = entry.name
		const [set, ...nameParts] = fullName.split('-')
		const frontOrBack = nameParts.pop()
		let front: boolean
		switch (frontOrBack) {
			case 'A.png':
				front = true
				break
			case 'B.png':
				front = false
				break
			default:
				throw new Error(`Invalid front/back: ${frontOrBack} of ${fullName}`)
		}
		const quantityOrNot = nameParts[nameParts.length - 1]
		// If there is no x, then quantity is 1, and don't pop it.
		let quantity = 1
		if (quantityOrNot.startsWith('x')) {
			const quantityText = nameParts.pop()
			if (quantityText !== undefined) {
				quantity = parseInt(quantityText.slice(1))
			}
		}

		// If no variation number, it is 1.
		let variation = 1
		const variationOrNot = nameParts[nameParts.length - 1]
		const parsedVariation = parseInt(variationOrNot)
		if (!isNaN(parsedVariation)) {
			nameParts.pop()
			variation = parsedVariation
		}

		const title = nameParts.join('-')
		const hash = `${set}-${title}`
		hashToDescription.set(hash, { hash: hash, description: '(No Description)' })

		let previousItem = items.get(hash)
		if (previousItem === undefined) {
			if (setToName[set] === undefined) {
				throw new Error(`Unknown set: ${set}`)
			}
			const setName = setToName[set]
			const resultItem: ResultItem = {
				setCode: set,
				setName: setName,
				hash: hash,
				name: title,
				members: [],
			}
			items = items.set(hash, resultItem)
			previousItem = resultItem
		}
		if (previousItem !== undefined) {
			// Search for same variation and quantity, to fill in the other side.
			const previousMember = previousItem.members.find((member) => {
				if (member.variation === variation && member.quantity === quantity) {
					return true
				}
				return false
			})
			if (previousMember !== undefined) {
				if (front) {
					previousMember.frontName = fullName
				} else {
					previousMember.backName = fullName
				}
			} else {
				previousItem.members.push({
					variation: variation,
					quantity: quantity,
					frontName: front ? fullName : '',
					backName: front ? '' : fullName,
				})
			}
		}
	}
}

const resultItemArray = Array.from(items.values())
resultItemArray.forEach((resultItem) => {
	resultItem.members.sort((a, b) => {
		if (a.variation < b.variation) {
			return -1
		}
		if (a.variation > b.variation) {
			return 1
		}
		return 0
	})
})

resultItemArray.sort((a, b) => {
	if (a.setCode < b.setCode) {
		return -1
	}
	if (a.setCode > b.setCode) {
		return 1
	}
	if (a.name < b.name) {
		return -1
	}
	if (a.name > b.name) {
		return 1
	}
	return 0
})

// Write util-mini-db.json
const resultItemArrayJson = JSON.stringify(resultItemArray, undefined, 2)
await Deno.writeTextFile(
	'static/image/custom/utility-mini-card/util-mini-db.json',
	resultItemArrayJson,
)
console.log(`Wrote ${resultItemArray.length} items to util-mini-db.json`)

// Load previous util-mini-hash-to-description.json first to merge and then write back.
let previousHashToDescriptionArray: HashToDescription[] = []
try {
	const previousHashToDescriptionJson = await Deno.readTextFile(
		'static/image/custom/utility-mini-card/util-mini-hash-to-description.json',
	)
	previousHashToDescriptionArray = JSON.parse(previousHashToDescriptionJson)
} catch {
	// OK if file doesn't exist.
}

for (const previousHashToDescription of previousHashToDescriptionArray) {
	if (
		hashToDescription.has(previousHashToDescription.hash) &&
		previousHashToDescription.description !== ''
	) {
		hashToDescription.set(previousHashToDescription.hash, previousHashToDescription)
	}
}

const hashToDescriptionArray: HashToDescription[] = Array.from(hashToDescription.values())
hashToDescriptionArray.sort((a, b) => {
	if (a.hash < b.hash) {
		return -1
	}
	if (a.hash > b.hash) {
		return 1
	}
	return 0
})

const hashToDescriptionJson = JSON.stringify(hashToDescriptionArray, undefined, 2)
await Deno.writeTextFile(
	'static/image/custom/utility-mini-card/util-mini-hash-to-description.json',
	hashToDescriptionJson,
)
console.log(`Wrote ${hashToDescriptionArray.length} items to util-mini-hash-to-description.json`)
