import mongoose from "mongoose";

export default defineNitroPlugin(async (app) => {
	try {
		const { databaseURL } = useRuntimeConfig();

		mongoose.connection.on("error", (error) => {
			console.error("Server: MongoDB: connection failed", error);
		});

		mongoose.connection.on("connected", () => {
			console.log("Server: MongoDB: connection established");
		});

		mongoose.connection.on("disconnected", () => {
			console.log("Server: MongoDB: connection lost");
		});

		mongoose.connection.on("reconnected", () => {
			console.log("Server: MongoDB: connection reestablished");
		});

		mongoose.connection.on("close", () => {
			console.log("Server: MongoDB: connection closed");
		});

		mongoose.connection.on("fullsetup", () => {
			console.log("Server: MongoDB: all servers connected");
		});

		mongoose.connection.on("all", () => {
			console.log("Server: MongoDB: all servers connected");
		});

		mongoose.connection.on("reconnectFailed", () => {
			console.log("Server: MongoDB: reconnect failed");
		});

		await mongoose.connect(databaseURL);
	} catch (error: any) {
		console.error("MongoDB: connection failed", error);
	}
});
