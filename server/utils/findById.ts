import type { IToken } from "./../models/token";
import { model } from "mongoose";
import { H3Event, createError } from "h3";
import type { Serializer } from "../models/plugins/serializer";
import getParamId from "./getParamId";

export type RESTAPIReadDocumentResponse<T> = T;

export default async function <T>(event: H3Event, modelName: string, token?: IToken): Promise<RESTAPIReadDocumentResponse<T>> {
	const id = getParamId(event);

	try {
		const timestamp = Date.now();

		const document = (await model(modelName).findOne({ _id: id })) as Serializer;

		const object = document.serialize(token?.role);

		//console.log(`Server: MongoDB: Document '${modelName}:${id}' found in ${Date.now() - timestamp}ms`);

		return object as RESTAPIReadDocumentResponse<T>;
	} catch (error) {
		throw createError({
			status: 404,
			statusText: `MongoDB: Document '${modelName}:${id}' is not found`,
		});
	}
}
