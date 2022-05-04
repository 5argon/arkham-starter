export function makePips(p: number): string {
	const pipCharacter = '•'
	const newPips: string[] = []
	if (p !== null) {
		for (let i = 0; i < p; i++) {
			newPips.push(pipCharacter)
		}
	}
	return newPips.join('')
}

export function makeParentheses(p: number): string {
	return `(${p})`
}
