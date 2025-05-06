import { type AnyKeys, model } from "mongoose";
import { H3Event, createError } from "h3";
import deserialize from "./deserialize";
import type { IToken } from "../models/token";
import getParamId from "./getParamId";

export type RESTAPIUpdateDocumentResponse<T> = T;

export default async function <T extends AnyKeys<any>>(event: H3Event, modelName: string, token: IToken): Promise<RESTAPIUpdateDocumentResponse<T>> {
	const id = getParamId(event);

	try {
		const body = deserialize<T>(await readBody(event), modelName, token);

		const document = await model(modelName).findByIdAndUpdate(id, body, { new: true });

		return document.serialize(token.role);
	} catch (error) {
		console.error(error);

		throw createError({
			status: 404,
			statusText: `Document '${modelName}:${id}' cannot be updated`,
		});
	}
}
