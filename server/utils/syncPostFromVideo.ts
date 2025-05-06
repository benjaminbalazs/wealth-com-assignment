import { Post, type IPost } from "../models/post";
import { Video } from "../models/video";
import { isEqual } from "lodash-es";

export default async function (body: IPost): Promise<IPost | undefined> {
	try {
		if (body.r2?.filename) {
			const video = await Video.findOne({
				"r2.filename": body.r2?.filename,
			});
			if (video) {
				const post = await Post.findOne({
					"r2.filename": body.r2?.filename,
				});
				//console.log(video);
				if (!isEqual(video.r2, body.r2)) {
					//await log("R2 has been copied", video.r2);

					post!.r2 = video.r2;
					await post!.save();
				}

				if (!isEqual(video.cloudflare, body.cloudflare) && video.cloudflare?.state === "ready") {
					//await log("Cloudflare has been copied" + JSON.stringify(video.cloudflare));

					post!.cloudflare = video.cloudflare;
					await post!.save();
				}

				if (!isEqual(video.mux, body.mux) && video.mux?.state === "ready") {
					//await log("Mux has been copied" + JSON.stringify(video.mux));

					post!.mux = video.mux;
					await post!.save();
				}

				return post?.serialize();
			} else {
				console.error("Video not found", body.r2?.filename);
			}
		}
	} catch (error) {
		console.error(error);
	}
}
