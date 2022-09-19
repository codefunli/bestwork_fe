export interface DataResSuccess<T> {
	code: string;
	message: string;
	data: T | null | undefined;
	status: 'ERROR' | 'OK';
}