export interface StructuredCategory {
	name: string;
	total: number;
	types: StructuredType[];
	items: StructuredItem[];
}

export interface StructuredType {
	name: string;
	total: number;
	lines: StructuredLine[];
}

export interface StructuredLine {
	name: string;
	total: number;
}

export interface StructuredItem {
	name: string;
	total: number;
}
