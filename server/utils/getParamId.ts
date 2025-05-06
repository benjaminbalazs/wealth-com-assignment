import { H3Event } from "h3";

export default function (event: H3Event): string {
	return event.context?.params?.id!;
}
