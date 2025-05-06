import type { EventHandler } from "h3";
import { H3Error } from "h3";

export default <T>(handler: EventHandler<T>) =>
	defineEventHandler<T>(async (event): Promise<T> => {
		const time = Date.now();

		try {
			const response = await handler(event);

			setHeader(event, "X-Response-Time", `${Date.now() - time}ms`);

			if (response instanceof H3Error) {
				console.error(response);
			}

			return response;
		} catch (error: any) {
			console.error(error);

			return error;
		}
	});
