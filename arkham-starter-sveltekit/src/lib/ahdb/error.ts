export interface AhdbError {
	error: { code: number; message: string }
}
export type Safe<T> = T | AhdbError
