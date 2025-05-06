import { model } from "mongoose";
import { H3Event, createError } from "h3";
import deserialize from "./deserialize";
import type { IToken } from "../models/token";
import { parseHeaders } from "../models/mixins/geo";

export type RESTAPICreateDocumentResponse<T> = T;

export default async function <T>(event: H3Event, modelName: string, token: IToken): Promise<RESTAPICreateDocumentResponse<T>> {
	try {
		// save only the params that are allowed
		const body = deserialize<T>(await readBody(event), modelName, token);

		// Parse Vercel geo info
		try {
			const vercel = parseHeaders(event);
			if (vercel) {
				// @ts-ignore
				body.geo = vercel.geo;
			}
		} catch (error: any) {
			console.error(error);
		}

		// save the data
		const Model = model(modelName);
		const document = await Model.create(body);

		// serialize it and return it
		return document.serialize(token.role);
	} catch (error: any) {
		console.error(error.errors);

		const statusText = error.errors
			? Object.values(error.errors)
					.map((error: any) => error.message)
					.join(", ")
			: `Document '${modelName}' cannot be created`;

		throw createError({
			status: 404,
			statusText: statusText,
		});
	}
}
