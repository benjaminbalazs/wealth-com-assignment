import type { ICloudflareImage } from "../models/mixins/cloudflareImage";
import { deleteImage } from "../services/cloudflare/images";

export default async function (before?: ICloudflareImage, after?: ICloudflareImage) {
	try {
		if (before && before.id && before.id !== after?.id) {
			// if there was an image before, and there is a new image
			await deleteImage(before.id);
		} else if (before && before.id && !after?.id) {
			// if there was an image before, and there is no new image
			await deleteImage(before.id);
		}
	} catch (error) {
		console.error(error);
	}
}
