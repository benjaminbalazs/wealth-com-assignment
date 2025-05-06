import { describe, expect, test } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils";

describe("Auth", async () => {
	await setup({});

	test("Check API Root", async () => {
		const html = await $fetch("/api");

		expect(html).toContain("writeTime");
	});
});
