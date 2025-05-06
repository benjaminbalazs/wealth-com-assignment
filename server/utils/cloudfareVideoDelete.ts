import type { ICloudflareVideo } from "../models/mixins/cloudflareVideo";
import { deleteVideo } from "../services/cloudflare/stream.videos";

export default async function (before?: ICloudflareVideo, after?: ICloudflareVideo) {
	try {
		if (before && before.id && before.id !== after?.id) {
			await deleteVideo(before.id);
		}
	} catch (error) {
		console.error(error);
	}
}
