import { Post } from "../models/post";
import { PostLike } from "../models/post-like";
import { PostResponse } from "../models/post-response";
import { PostShare } from "../models/post-share";
import { PostView } from "../models/post-view";
import { Video } from "../models/video";
import { deleteObject } from "../services/cloudflare/r2";
import { deleteVideo } from "../services/cloudflare/stream.videos";
import { deleteAsset } from "../services/mux";
import { log } from "../services/slack";

export default async function (id: string) {
	// delete all related documents
	try {
		await Promise.all([
			(async function () {
				const { deletedCount } = await PostLike.deleteMany({ post: id }).exec();
				//await log(`Deleted ${deletedCount} likes for post ${id}`);
			})(),

			(async function () {
				const { deletedCount } = await PostShare.deleteMany({ post: id }).exec();
				//await log(`Deleted ${deletedCount} shares for post ${id}`);
			})(),

			(async function () {
				const { deletedCount } = await PostResponse.deleteMany({ post: id }).exec();
				//await log(`Deleted ${deletedCount} responses for post ${id}`);
			})(),

			(async function () {
				const { deletedCount } = await PostView.deleteMany({ post: id }).exec();
				//await log(`Deleted ${deletedCount} views for post ${id}`);
			})(),
		]);
	} catch (error) {
		console.error(error);
	}

	try {
		const post = await Post.findById(id).exec();

		if (!post) {
			throw new Error(`Post not found: ${id}`);
		}

		// delete the video
		try {
			if (post?.r2?.filename) {
				await Video.deleteOne({ "r2.filename": post.r2.filename }).exec();
			}
		} catch (error) {
			console.error(error);
		}

		// delete the R2 video file
		if (post?.r2?.filename) {
			await deleteObject(post?.r2?.filename);
		}

		// delete the R2 thumbnail file
		if (post?.r2?.thumbnail) {
			await deleteObject(post?.r2?.thumbnail);
		}

		// delete the Mux asset
		if (post?.mux?.id) {
			await deleteAsset(post.mux.id);
		}

		// delete the Cloudflare video
		if (post?.cloudflare?.id) {
			await deleteVideo(post.cloudflare.id);
		}
	} catch (error) {
		console.error(error);
	}

	// delete the post itself
	return Post.deleteOne({ _id: id }).exec();
}
