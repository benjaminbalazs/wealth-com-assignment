import { type IUser, User } from "../models/user";
import { type IToken, Token } from "../models/token";
import { PostLike } from "../models/post-like";
import { PostShare } from "../models/post-share";
import { PostResponse } from "../models/post-response";
import { PostView } from "../models/post-view";
import { log } from "../services/slack";
import { Post } from "../models/post";
import deletePostDocuments from "./deletePost";

export default async function (id: string) {
	// delete all owned documents

	await Promise.all([
		(async function () {
			const { deletedCount } = await PostLike.deleteMany({ owner: id }).exec();
			await log(`Deleted ${deletedCount} likes for user ${id}`);
		})(),

		(async function () {
			const { deletedCount } = await PostShare.deleteMany({ owner: id }).exec();
			await log(`Deleted ${deletedCount} shares for user ${id}`);
		})(),

		(async function () {
			const { deletedCount } = await PostResponse.deleteMany({ owner: id }).exec();
			await log(`Deleted ${deletedCount} responses for user ${id}`);
		})(),

		(async function () {
			const { deletedCount } = await PostView.deleteMany({ owner: id }).exec();
			await log(`Deleted ${deletedCount} views for user ${id}`);
		})(),

		(async function () {
			const { deletedCount } = await Token.deleteMany({ owner: id }).exec();
			await log(`Deleted ${deletedCount} tokens for user ${id}`);
		})(),
	]);

	// delete all posts and their documents

	try {
		const posts = await Post.find({ owner: id }).exec();
		await Promise.all(
			posts.map(async (post) => {
				return deletePostDocuments(id);
			})
		);
	} catch (error) {
		console.error(error);
	}

	// delete user itself
	return User.deleteOne({ _id: id }).exec();
}
