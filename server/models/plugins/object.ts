import { Schema } from "mongoose";

export type IID = {
	id: string;
};

export function objectPlugin(schema: Schema): void {
	schema.set("toObject", {
		getters: true,
		virtuals: false,
		versionKey: false,
		transform: function (doc, ret) {
			ret.id = ret._id.toString();
			delete ret._id;
			delete ret.__v;
		},
	});

	schema.set("toJSON", {
		getters: true,
		virtuals: false,
		versionKey: false,
		transform: function (doc, ret) {
			ret.id = ret._id.toString();
			delete ret._id;
			delete ret.__v;
		},
	});
}
