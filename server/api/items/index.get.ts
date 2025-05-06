import { Item } from "../../models/item";

export default defineEventHandler(async (event) => {
	return Item.find({});
});
