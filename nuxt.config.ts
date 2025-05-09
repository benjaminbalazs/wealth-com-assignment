export default defineNuxtConfig({
	modules: ["@vueuse/nuxt"],

	devServer: {
		port: 4000,
	},

	experimental: {
		//inlineSSRStyles: true,
	},
	typescript: {
		typeCheck: true,
		strict: true,
		shim: false,
	},

	vue: {
		//defineModel: true,
		propsDestructure: true,
	},

	sourcemap: {
		server: true,
		client: true,
	},

	runtimeConfig: {
		databaseURL: process.env.DATABASE_URL,

		public: {},
	},

	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
		},
	},

	nitro: {
		timing: true,
		scanDirs: ["server/api", "server/utils", "server/models"],
	},

	css: ["normalize.css/normalize.css", "@/assets/styles/ress.css", "@/assets/fonts/fonts.css", "@/assets/styles/globals.scss"],
	postcss: {
		plugins: {
			autoprefixer: {},
		},
	},
	vite: {
		css: {
			modules: {
				scopeBehaviour: "global",
			},
		},
	},
});
