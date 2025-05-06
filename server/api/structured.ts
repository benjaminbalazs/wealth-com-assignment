import { Item } from "../models/item";
import type { IItem } from "../models/item";
import { Type } from "../models/type";
import type { IType } from "../models/type";

import type { StructuredLine, StructuredCategory } from "../../utils/structured";

export default defineEventHandler(async (event) => {
	const items = await Item.find({});
	const types = await Type.find({});

	//

	const categories = [] as StructuredCategory[];

	types.forEach((type) => {
		const primaryAssetCategory = type.primaryAssetCategory;

		// We look for the category in the categories array
		// If it exists, we update the total and add the type to the types array
		var category = categories.find((cat) => cat.name === primaryAssetCategory);
		if (!category) {
			category = {
				name: primaryAssetCategory,
				total: 0,
				types: [],
				items: [],
			};
			categories.push(category);
		}

		const lines: StructuredLine[] = [];

		type.holdings.majorAssetClasses.forEach((holding) => {
			holding.assetClasses.forEach((assetClass) => {
				const line = {
					name: assetClass.minorAssetClass,
					total: assetClass.value,
				};
				lines.push(line);
			});
		});

		// We update the total and add the type to the types array
		category.total += type.assetInfo.estimateValue;
		category.types.push({
			name: type.assetInfo.nickname,
			total: type.assetInfo.estimateValue,
			lines: lines,
		});
	});

	items.forEach((item) => {
		const primaryAssetCategory = item.primaryAssetCategory;
		// We look for the category in the categories array
		// If it exists, we update the total and add the type to the types array
		var category = categories.find((cat) => cat.name === primaryAssetCategory);
		if (!category) {
			category = {
				name: primaryAssetCategory,
				total: 0,
				types: [],
				items: [],
			};
			categories.push(category);
		}
		// We update the total and add the type to the types array
		category.total += item.assetInfo.estimateValue;
		category.items.push({
			name: item.assetInfo.nickname,
			total: item.assetInfo.estimateValue,
		});
	});

	//

	return categories;
});
