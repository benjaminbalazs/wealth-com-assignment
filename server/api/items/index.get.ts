import { Item } from "../../models/item";
import type { IItem } from "../../models/item";
import query from "../../utils/query";
import handler from "../../utils/handler";

export default handler(async (event) => {
	return query<IItem>(event, Item.modelName, undefined, undefined, undefined);
});
