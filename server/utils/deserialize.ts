import { model } from "mongoose";
import type { Visiblity } from "./authenticate";
import type { IToken } from "./../models/token";
import { pick } from "lodash-es";

export default function <T>(body: any, modelName: string, token: IToken): T {
	const { role, owner } = token;

	// make sure the user cannot change the owner
	/* if (body.owner && body.owner !== owner.toString() && role !== "admin") {
		body.owner = owner.toString();
		console.error(`User tried to change owner of ${modelName} to ${body.owner}`);
	} */

	// auto populate owner
	/* if (token.role === "owner") {
		body.owner = token.owner.toString();
	} */

	// get all allowed paths

	const Model = model(modelName);
	const paths = Model.schema.paths;

	const allowedPaths = Object.values(paths)
		.filter((value) => {
			const { visibility, hidden, readonly } = value.options as Visiblity;

			if (readonly) return false;

			if (value.path === "created_at" || value.path === "updated_at" || value.path === "__v" || value.path === "_id") return false;

			if (hidden) {
				// if field is hidden, don't let anyone overwrite it
				return false;
			}

			if (visibility) {
				// delete all admin fields if role is not admin
				if (role !== "admin" && visibility === "admin") {
					return false;
				}

				// delete all owner fields if role is not admin or owner
				if (role !== "admin" && role !== "owner" && visibility === "owner") {
					return false;
				}
			}

			return true;
		})
		.map((value) => value.path);

	return pick(body, allowedPaths) as T;
}
