import type { H3Event } from "h3";
import { model } from "mongoose";
import { StoreQueryFilterOperators, type StoreQueryFilter } from "~/services/store";

export type RESTAPICountResponse = {
	count: number;
};

export default async function (event: H3Event, modelName: string, filters?: StoreQueryFilter[]): Promise<RESTAPICountResponse> {
	// input
	const query = getQuery(event);

	//
	const Model = model(modelName);
	const command = Model.count();

	// set filters
	try {
		const _filters = filters || (query.filters ? (JSON.parse(query.filters.toString()) as StoreQueryFilter[]) : undefined);

		_filters?.forEach((filter) => {
			if (filter.operator === StoreQueryFilterOperators.equal) {
				command.where(filter.field).equals(filter.value);
			} else if (filter.operator === StoreQueryFilterOperators.notEqual) {
				command.where(filter.field).ne(filter.value);
			} else if (filter.operator === StoreQueryFilterOperators.less) {
				command.where(filter.field).lt(filter.value as number);
			} else if (filter.operator === StoreQueryFilterOperators.lessThanOrEqual) {
				command.where(filter.field).lte(filter.value as number);
			} else if (filter.operator === StoreQueryFilterOperators.greater) {
				command.where(filter.field).gt(filter.value as number);
			} else if (filter.operator === StoreQueryFilterOperators.greaterOrEqual) {
				command.where(filter.field).gte(filter.value as number);
			} else if (filter.operator === StoreQueryFilterOperators.arrayContains) {
				//
			}
		});
	} catch (error) {
		console.error(error);
	}

	const count = await command.exec();

	return { count } as RESTAPICountResponse;
}
