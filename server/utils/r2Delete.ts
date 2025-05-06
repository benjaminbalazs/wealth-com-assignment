import type { IR2Video } from "../models/mixins/r2Video";
import { deleteObject } from "../services/cloudflare/r2";

export default async function (before?: IR2Video, after?: IR2Video) {
	try {
		if (before && before.filename && before.filename !== after?.filename) {
			await deleteObject(before.filename);
			console.log("Deleted video from R2", before.filename);
		}
		if (before && before.thumbnail && before.thumbnail !== after?.thumbnail) {
			await deleteObject(before.thumbnail);
			console.log("Deleted thumbnail from R2", before.thumbnail);
		}
	} catch (error) {
		console.error(error);
	}
}
