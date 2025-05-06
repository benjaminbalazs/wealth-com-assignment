import { Item } from "../models/item";
import type { IItem } from "../models/item";
import { Type } from "../models/type";
import type { IType } from "../models/type";

export default defineEventHandler(async (event) => {
	//const items = await query<IItem>(event, Item.modelName, undefined, undefined, undefined);

	//const types = await query<IType>(event, Type.modelName, undefined, undefined, undefined);

	const items = await Item.find({});
	const types = await Type.find({});

	return {
		items: items.length,
		types: types.length,
	};
});

export interface StructuredCategory {
	name: string;
	total: number;
	types: StructuredType[];
}

export interface StructuredType {
	name: string;
	total: number;
	items: StructuredItem[];
}

export interface StructuredItem {
	name: string;
	total: number;
}
