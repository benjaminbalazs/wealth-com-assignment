import { H3Event, createError } from "h3";
import { User } from "../models/user";
import type { IUser } from "../models/user";
import findById from "./findById";
import { type IToken } from "~/server/models/token";
import { type Serializer } from "~/server/models/plugins/serializer";

export default async function (event: H3Event, token?: IToken) {
	const id = getParamId(event);

	if (id.includes("@")) {
		try {
			const document = (await User.findOne({ username: id.replaceAll("@", "") })) as Serializer;

			return document.serialize(token?.role) as IUser;
		} catch (error) {
			throw createError({
				status: 404,
				statusText: `MongoDB: Document '${User.modelName}:${id}' is not found`,
			});
		}
	} else {
		return findById<IUser>(event, User.modelName, token);
	}
}
