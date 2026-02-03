import { afterEach, expect } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import * as matchers from "@testing-library/jest-dom/matchers";

// Register happy-dom as global DOM implementation
GlobalRegistrator.register({ url: "http://localhost:3000" });

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Set test environment variables
process.env.NODE_ENV = "test";

// Cleanup DOM after each test
afterEach(() => {
	if (typeof document !== "undefined") {
		document.body.innerHTML = "";
	}
});
