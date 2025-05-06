import { model } from "mongoose";
import { H3Event, createError } from "h3";
import getParamId from "./getParamId";

export type RESTAPIDeleteDocumentResponse = {
	id: string;
};

export default async function <T>(event: H3Event, modelName: string): Promise<RESTAPIDeleteDocumentResponse> {
	const id = getParamId(event);

	const document = await model(modelName).findByIdAndDelete<T>(id);

	if (!document) {
		throw createError({
			status: 404,
			statusText: `Document '${modelName}:${id}' cannot be deleted`,
		});
	}

	return {
		id: id,
	};
}
