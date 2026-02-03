import { describe, expect, test } from "bun:test";
import { calculateStatus } from "../status";
import type { ContactWithContext } from "../types";

describe("calculateStatus", () => {
	const baseContact: ContactWithContext = {
		id: "test",
		name: "Test User",
		email: "test@example.com",
		phone: "555-0100",
		chapter: "7",
		avatarColor: "#ec4899",
		createdAt: new Date(),
		conversations: [],
		pendingItems: {
			documents: { required: 6, uploaded: 4, items: [] },
			forms: { complete: true, name: "Means Test" },
			invoices: { total: 1000, paid: 1000, overdue: false },
		},
		notes: [],
		lastClientResponse: new Date(),
		followUpCount: 0,
	};

	test("returns needs-attention when followUpCount >= 3 AND daysSinceResponse >= 10", () => {
		const contact = {
			...baseContact,
			followUpCount: 3,
			lastClientResponse: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), // 11 days ago
		};
		expect(calculateStatus(contact)).toBe("needs-attention");
	});

	test("returns needs-attention when invoice is overdue", () => {
		const contact = {
			...baseContact,
			pendingItems: {
				...baseContact.pendingItems,
				invoices: { total: 1000, paid: 500, overdue: true },
			},
		};
		expect(calculateStatus(contact)).toBe("needs-attention");
	});

	test("returns waiting-for-you when client has unreviewed action", () => {
		const contact = {
			...baseContact,
			conversations: [
				{
					id: "1",
					contactId: "test",
					type: "client-response" as const,
					content: "Here are my documents",
					timestamp: new Date(),
				},
			],
		};
		expect(calculateStatus(contact)).toBe("waiting-for-you");
	});

	test("returns waiting-for-them as default", () => {
		expect(calculateStatus(baseContact)).toBe("waiting-for-them");
	});

	test("returns needs-attention when client has never responded and multiple follow-ups sent", () => {
		const contact = {
			...baseContact,
			followUpCount: 3,
			lastClientResponse: null,
		};
		expect(calculateStatus(contact)).toBe("needs-attention");
	});
});
