export interface AhdbError {
	error: { code: number; message: string }
}
export type Safe<T> = T | AhdbError

export function isNotAhdbError<T>(s: Safe<T>): s is T {
	return !('error' in s)
}
