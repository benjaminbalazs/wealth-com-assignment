import { Type } from "../../models/type";

export default defineEventHandler(async (event) => {
	return Type.find({});
});
