import { model } from "mongoose";
import { Post } from "../models/post";
import { User } from "../models/user";

export default async function (ownerId: string, postId: string, namespace: "likes" | "responses" | "shares" | "views", modelName: string) {
	const Model = model(modelName);

	await Promise.all([
		(async function updatePost() {
			try {
				const length = await Model.find({ post: postId }).countDocuments().exec();
				await Post.findOneAndUpdate({ _id: postId }, { [`analytics.${namespace}`]: length }).exec();
				console.log("post:" + postId, `analytics.${namespace}`, namespace, length);
			} catch (error) {
				console.error(error);
			}
		})(),
		(async function updateUserActivity() {
			try {
				const length = await Model.find({ owner: ownerId }).countDocuments().exec();
				await User.findOneAndUpdate({ _id: ownerId }, { [`activity.${namespace}`]: length }).exec();
				console.log("user:" + ownerId, `activity.${namespace}`, namespace, length);
			} catch (error) {
				console.error(error);
			}
		})(),
		(async function updateUserAnalytics() {
			try {
				const length = await Model.find({ recipient: ownerId }).countDocuments().exec();
				await User.findOneAndUpdate({ _id: ownerId }, { [`analytics.${namespace}`]: length }).exec();
				console.log("user:" + ownerId, `analytics.${namespace}`, namespace, length);
			} catch (error) {
				console.error(error);
			}
		})(),
	]);
}
