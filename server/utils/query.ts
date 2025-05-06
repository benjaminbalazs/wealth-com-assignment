import { StoreQueryFilterOperators, type StoreQueryFilter, type StoreQueryOptions, type StoreQueryOptionsSort } from "./../../services/store";
import { H3Event } from "h3";
import type { Serializer } from "../models/plugins/serializer";
import { model } from "mongoose";
import { merge } from "lodash-es";

export type RESTAPIQueryResponse<T> = T[];

const defaultOptions: StoreQueryOptions = {
	limit: 100,
	offset: 0,
	sort: { field: "created_at", direction: "desc" },
};

export default async function <T>(event: H3Event, modelName: string, token?: IToken, filters?: StoreQueryFilter[], sort?: (a: Serializer, b: Serializer) => number): Promise<RESTAPIQueryResponse<T>> {
	// input
	const query = getQuery(event);

	//
	const Model = model(modelName);
	const command = Model.find();

	//

	const options: StoreQueryOptions = merge(defaultOptions, query.options ? JSON.parse(query.options.toString()) : {});
	const limit = Math.min(options.limit!, 250);
	command.limit(limit);

	// set skip
	command.skip(options.offset!);

	// set sort
	command.sort({ [options.sort!.field]: options.sort!.direction === "asc" ? 1 : -1 });

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

	//

	const list: Serializer[] = await command.exec();

	if (sort) {
		list.sort(sort);
	}

	const result = list.map((item) => item.serialize(token?.role));

	return result as RESTAPIQueryResponse<T>;
}
