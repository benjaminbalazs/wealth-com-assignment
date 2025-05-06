import type { Roles, Visiblity } from "./../../utils/authenticate";
import { Schema } from "mongoose";
import { pick } from "lodash-es";

export interface Serializer {
	serialize: (role?: Roles) => any;
}

export function serializePlugin(schema: Schema): void {
	schema.methods.serialize = function (role?: Roles) {
		const object = this.toObject();

		const allowedPaths = Object.values(schema.paths)
			.filter((value) => {
				const { visibility, hidden } = value.options as Visiblity;

				if (hidden === true) {
					return false;
				}

				/* if ((value.path === "created_at" || value.path === "updated_at") && role !== "admin") {
					return false;
				} */

				if (role === "owner" && visibility === "admin") {
					return false;
				}

				if (!role && visibility) {
					return false;
				}

				return true;
			})
			.map((value) => value.path);

		return pick(object, allowedPaths, ["id"]);
	};
}
