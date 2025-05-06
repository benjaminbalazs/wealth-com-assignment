export default defineEventHandler(async () => {
	const { version } = await import("../../package.json");

	return {
		version: version,
	};
});

export interface APIListResponse<T> {
	success: boolean;
	list?: T[];
	length?: number;
	error?: string;
}

export interface APIDocumentResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
}
