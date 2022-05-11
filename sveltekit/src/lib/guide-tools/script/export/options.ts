export function binaryToUrlString(u: Uint8Array): string {
	return encodeURIComponent(btoa(String.fromCharCode(...new Uint8Array(u))))
}
