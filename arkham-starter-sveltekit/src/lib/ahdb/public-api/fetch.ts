export async function fetchWithRetries(req: string): Promise<Response> {
	const reqInit: RequestInit = {
		method: 'GET',
	}

	try {
		return await fetch(req, reqInit)
	} catch {
		// Just try again
	}
	try {
		return await fetch(req, reqInit)
	} catch {
		// Just try again
	}
	try {
		return await fetch(req, reqInit)
	} catch {
		// Just try again
	}
	// Throws this time
	return await fetch(req, reqInit)
}
