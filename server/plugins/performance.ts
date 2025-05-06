import type { NitroAppPlugin } from "nitropack";

export default <NitroAppPlugin>function (app) {
	app.hooks.hook("request", (event) => {
		if (!event.path.includes("api")) {
			event.context.timestamp = Date.now();
		}
	});

	app.hooks.hook("render:response", (response, { event }) => {
		if (!event.path.includes("api")) {
			//console.log("Performance: Render Response", event.path, `${Date.now() - event.context.timestamp}ms`);
		}
	});
};
