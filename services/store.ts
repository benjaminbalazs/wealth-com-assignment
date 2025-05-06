import { merge } from "lodash-es";
import type { IID } from "./../server/models/plugins/object";
import type { RecordsStoreMethods } from "./../stores/records";

export type StoreMethods = {
	getDocument: (reference: StoreRecordReference) => Promise<StoreData>;
	getDocuments: (collectionName: CollectionNames, filters?: StoreQueryFilter[], options?: StoreQueryOptions) => Promise<StoreData[]>;
	saveDocument: (reference: StoreRecordReference, input: StoreRecord) => Promise<StoreData>;
	createDocument: (collectionName: CollectionNames, input: StoreRecord) => Promise<StoreData>;
	deleteDocument: (reference: StoreRecordReference) => Promise<void>;
	//getCount: (collectionName: CollectionNames, filters?: StoreQueryFilter[]) => Promise<number>;
};

export function update(records: RecordsStoreMethods, reference: StoreRecordReference, input: StoreData): void {
	if (!reference) {
		throw new Error(`Cannot update undefined reference`);
	}

	const record = records.get(reference); // reload record just in case

	if (!record) {
		throw new Error(`Record ${reference} does not exist`);
	}

	records.update(reference, input);
}

export function recordFactory(input: StoreData, collectionName: CollectionNames, _internals?: StoreRecordInternals): StoreRecord {
	const internals = merge(
		{
			reference: toReference(collectionName, input.id),
			saved: true,
			saving: false,
			deleting: false,
			reloading: false,
		},
		_internals
	);

	return {
		...input,
		internals: internals,
		//...adapter.getDefault(collectionName),
	} as StoreRecord;
}

export function pushRecords(records: RecordsStoreMethods, documents: StoreData[], collectionName: CollectionNames, internals?: StoreRecordInternals): void {
	const toPush: StoreRecord[] = [];
	documents.forEach((document) => {
		const reference = toReference(collectionName, document.id);

		const record = records.get(reference);
		if (record) {
			update(records, reference, { ...document, internals: { ...record.internals, ...internals, ...({ saved: true } as StoreRecordInternals) } as StoreRecordInternals } as StoreData);
		} else {
			toPush.push(recordFactory(document, collectionName, internals));
		}
	});

	if (toPush.length) {
		records.push(toPush);
	}
}

export type StoreOperation = {
	id: string;
	error?: Error;
	task?: Promise<any>;
	timestamp: number;
	elapsed_time?: number;
	type: StoreOperationTypes;
	ssr: boolean;
	processing: boolean;
	provider: StoreProviderTypes;
};

export interface StoreQueryOperation extends IStoreFindOperation {
	collectionName: CollectionNames;
	filters?: StoreQueryFilter[];
}

export interface StoreFindOperation extends IStoreFindOperation {
	reference: StoreRecordReference;
}

export interface IStoreFindOperation extends StoreOperation {
	count: number;
}

export interface StoreSaveOperation extends StoreOperation {
	reference: StoreRecordReference;
	input?: object;
}

export interface StoreDeleteOperation extends StoreOperation {
	reference: StoreRecordReference;
}

export enum StoreOperationTypes {
	query = "query",
	find = "find",
	save = "save",
	create = "create",
	delete = "delete",
}

export type StoreRecordReference = string;

export function toReference(collectionName: CollectionNames, id: string): StoreRecordReference {
	return collectionName + "/" + id;
}

export type StoreDate = number;

export function unwrapReference(reference: StoreRecordReference): { collectionName: CollectionNames; id: string } {
	let params = reference.split("/");

	return {
		collectionName: params[0] as CollectionNames,
		id: params[1],
	};
}

export type StoreData = IID & {};

export type StoreRecord = StoreData & {
	internals: StoreRecordInternals;
};

export type StoreRecordData<T> = StoreData &
	T & {
		internals: StoreRecordInternals;
	};

export type StoreRecordInternals = {
	/**
	 * @property reference
	 * @public
	 * @type {string}
	 * @description The unique, readable identifier of the record.
	 */
	reference: StoreRecordReference;

	/**
	 * @property reloading
	 * @public
	 * @type {Boolean}
	 * @description If this property is `true` the record is being reloaded.
	 */
	reloading: boolean;

	/**
	 * @property saving
	 * @public
	 * @type {Boolean}
	 * @description If this property is `true` the record is being saved.
	 */
	saving: boolean;

	/**
	 * @property saved
	 * @public
	 * @type {Boolean}
	 * @description If this property is false the record does not exist in the database, only in the cache.
	 */
	saved: boolean;

	/**
	 * @property deleting
	 * @public
	 * @type {Boolean}
	 * @description If this property is `true` the record is being deleted.
	 */
	deleting: boolean;
};

// ENUMS ------------------------------------------

export enum StoreQueryFilterOperators {
	less = "<",
	lessThanOrEqual = "<=",
	equal = "==",
	notEqual = "!=",
	greater = ">",
	greaterOrEqual = ">=",
	arrayContains = "array-contains",
	arrayContainsAny = "array-contains-any",
}

// TYPES ------------------------------------------

export type StoreQueryOptions = {
	offset?: number;
	limit?: number;
	sort?: StoreQueryOptionsSort;
};

export type StoreQueryOptionsSort = {
	field: string;
	direction: "asc" | "desc";
};

export type StoreQueryFilter =
	| {
			field: string;
			operator: StoreQueryFilterOperators.equal | StoreQueryFilterOperators.notEqual;
			value?: number | string | boolean;
			reference?: StoreRecordReference;
	  }
	| {
			field: string;
			operator: StoreQueryFilterOperators.less | StoreQueryFilterOperators.lessThanOrEqual | StoreQueryFilterOperators.greater | StoreQueryFilterOperators.greaterOrEqual;
			value: number | Date;
			reference?: StoreRecordReference;
	  }
	| {
			field: string;
			operator: StoreQueryFilterOperators.arrayContains;
			value?: number | string;
			reference?: StoreRecordReference;
	  }
	| {
			field: string;
			operator: StoreQueryFilterOperators.arrayContainsAny;
			value: string[];
			reference?: StoreRecordReference;
	  };

//

export type StoreQueryParams = {
	/**
	 * @type {boolean} - where to load data from
	 */
	provider?: StoreProviderTypes;

	/**
	 * @type {boolean} - whether to reload data on client if data was already loaded on the server
	 */

	reloadOnClient?: ClientReloadPolicy;

	/**
	 * @type {boolean} - subscribe: to turn on live updates listener
	 */
	subscribe?: boolean;

	/**
	 * @type {boolean} - authenticate: to wait for authentication
	 */
	authenticate?: boolean;
};

export enum StoreProviderTypes {
	restapi = "restapi",
	mongodb = "mongodb",
}

export enum ClientReloadPolicy {
	never = "never",
	once = "once",
	always = "always",
}

export enum SchemaParamType {
	boolean = "boolean",
	array = "array",
	string = "string",
	number = "number",
	date = "date",
	object = "object",
	reference = "reference",
}

export type SchemaType =
	| {
			type: SchemaParamType.reference;
			defaultValue?: () => StoreRecordReference;
			collectionName: CollectionNames;
			required?: boolean;
			readonly?: boolean;
			indexed?: boolean;
	  }
	| {
			type: SchemaParamType.array;
			itemType: SchemaParamType.number;
			defaultValue?: () => number[];
			required?: boolean;
			readonly?: boolean;
			schema?: Schema;
	  }
	| {
			type: SchemaParamType.array;
			itemType: SchemaParamType.string;
			defaultValue?: () => string[];
			required?: boolean;
			readonly?: boolean;
			schema?: Schema;
	  }
	| {
			type: SchemaParamType.array;
			itemType: SchemaParamType.object;
			defaultValue?: () => object[];
			required?: boolean;
			readonly?: boolean;
			schema: Schema;
	  }
	| {
			type: SchemaParamType.number;
			defaultValue?: () => number;
			required?: boolean;
			readonly?: boolean;
			indexed?: boolean;
	  }
	| {
			type: SchemaParamType.date;
			defaultValue?: () => StoreDate;
			required?: boolean;
			readonly?: boolean;
			indexed?: boolean;
	  }
	| {
			type: SchemaParamType.object;
			defaultValue?: () => object;
			required?: boolean;
			readonly?: boolean;
			schema: Schema;
	  }
	| {
			type: SchemaParamType.string;
			defaultValue?: () => string;
			required?: boolean;
			readonly?: boolean;
			indexed?: boolean;
	  }
	| {
			type: SchemaParamType.boolean;
			defaultValue?: () => boolean;
			required?: boolean;
			readonly?: boolean;
			indexed?: boolean;
	  };

export type Schema = {
	[key: string]: SchemaType;
};

export function defaultDate(): StoreDate {
	return Date.now();
}

export function defaultObject(schema: Schema): object {
	const result: any = {};

	for (const key in schema) {
		const param = schema[key];

		if (param.defaultValue) {
			result[key] = param.defaultValue();
		}
	}

	return {};
}

export function getKeys(schema: Schema, prefix: string = ""): string[] {
	const keys: string[] = [];

	for (const key in schema) {
		const param = schema[key];

		if (param.type === SchemaParamType.object) {
			keys.push(...getKeys(param.schema, prefix + "." + key));
		} else {
			keys.push(prefix + "." + key);
		}
	}

	return keys;
}

export type CollectionNames = string;
