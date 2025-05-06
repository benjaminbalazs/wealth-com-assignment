import type { IMuxVideo } from "../models/mixins/muxVideo";
import { deleteAsset } from "../services/mux";

export default async function (before?: IMuxVideo, after?: IMuxVideo) {
	try {
		if (before && before.id && before.id !== after?.id) {
			await deleteAsset(before.id);
			console.log("Deleted video from Mux", before.id);
		}
	} catch (error) {
		console.error(error);
	}
}
