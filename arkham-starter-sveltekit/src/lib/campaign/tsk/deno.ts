const scenarios: string[] = [
	'riddlesAndRainScenario',
	'deadHeatScenario',
	'sanguineShadowsScenario',
	'dealingsInTheDarkScenario',
	'dancingMad1Scenario',
	'dancingMad2Scenario',
	'onThinIceScenario',
	'dogsOfWar1Scenario',
	'dogsOfWar2Scenario',
	'dogsOfWar3Scenario',
	'shadesOfSufferingScenario',
	'withoutATraceScenario',
	'congressOfTheKeys1Scenario',
	'congressOfTheKeys2Scenario',
	'congressOfTheKeys3Scenario',
]

const congressOfTheKeys = 'congressOfTheKeys'
const riddlesAndRain = 'riddlesAndRain'

const validPermutations: { from: string; to: string }[] = []

for (let i = 0; i < scenarios.length; i++) {
	const scenario1 = scenarios[i]
	const hasCongressOfTheKeys1 = scenario1.includes(congressOfTheKeys)
	const hasRiddlesAndRain1 = scenario1.includes(riddlesAndRain)

	for (let j = i + 1; j < scenarios.length; j++) {
		const scenario2 = scenarios[j]
		const hasCongressOfTheKeys2 = scenario2.includes(congressOfTheKeys)
		const hasRiddlesAndRain2 = scenario2.includes(riddlesAndRain)

		const similar = scenario1.substring(0, 4) === scenario2.substring(0, 4)

		if (!similar) {
			if (!hasCongressOfTheKeys1 && !hasRiddlesAndRain2) {
				validPermutations.push({ from: scenario1, to: scenario2 })
			}
			if (!hasCongressOfTheKeys2 && !hasRiddlesAndRain1) {
				validPermutations.push({ from: scenario2, to: scenario1 })
			}
		}
	}
}

console.log(
	JSON.stringify(
		validPermutations.sort((a, b) => {
			return a.from.localeCompare(b.from)
		}),
		null,
		2,
	),
)
