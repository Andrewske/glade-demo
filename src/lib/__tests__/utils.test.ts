import { describe, expect, test } from "bun:test";
import { cn, daysBetween, formatDateShort, getInitials } from "../utils";

describe("daysBetween", () => {
	test("calculates days between two dates", () => {
		const date1 = new Date("2024-01-01");
		const date2 = new Date("2024-01-10");
		expect(daysBetween(date1, date2)).toBe(9);
	});

	test("returns 0 for same day", () => {
		const date = new Date("2024-01-01");
		expect(daysBetween(date, date)).toBe(0);
	});

	test("works regardless of order", () => {
		const date1 = new Date("2024-01-10");
		const date2 = new Date("2024-01-01");
		expect(daysBetween(date1, date2)).toBe(9);
	});
});

describe("getInitials", () => {
	test("extracts initials from full name", () => {
		expect(getInitials("Maria Garcia")).toBe("MG");
	});

	test("handles single name", () => {
		expect(getInitials("Maria")).toBe("M");
	});

	test("handles multiple names", () => {
		expect(getInitials("Maria Elena Garcia")).toBe("MEG");
	});
});

describe("cn", () => {
	test("joins class names", () => {
		expect(cn("foo", "bar")).toBe("foo bar");
	});

	test("filters falsy values", () => {
		expect(cn("foo", false, undefined, "bar")).toBe("foo bar");
	});
});

describe("formatDateShort", () => {
	test("formats date correctly", () => {
		const date = new Date("2024-01-15");
		const formatted = formatDateShort(date);
		expect(formatted).toMatch(/Jan 1[45]/);
	});
});
