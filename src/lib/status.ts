import type { ContactStatus, ContactWithContext } from "./types";
import { daysBetween } from "./utils";

function checkUnreviewedClientAction(contact: ContactWithContext): boolean {
	// Find most recent client action
	const clientActions = contact.conversations.filter(
		(c) => c.type === "client-response",
	);
	const mostRecentClientAction =
		clientActions.length > 0
			? clientActions.reduce((latest, current) =>
					current.timestamp > latest.timestamp ? current : latest,
				)
			: null;

	// Find most recent attorney action
	const attorneyActions = contact.conversations.filter(
		(c) => c.type === "attorney-message" || c.type === "ai-followup",
	);
	const mostRecentAttorneyAction =
		attorneyActions.length > 0
			? attorneyActions.reduce((latest, current) =>
					current.timestamp > latest.timestamp ? current : latest,
				)
			: null;

	// If client has acted but attorney hasn't, or client's action is more recent
	if (!mostRecentAttorneyAction && mostRecentClientAction) return true;
	if (!mostRecentClientAction || !mostRecentAttorneyAction) return false;

	return mostRecentClientAction.timestamp > mostRecentAttorneyAction.timestamp;
}

export function calculateStatus(contact: ContactWithContext): ContactStatus {
	const daysSinceResponse = contact.lastClientResponse
		? daysBetween(contact.lastClientResponse, new Date())
		: Infinity;

	// Priority 1: Needs attention (red)
	if (
		(contact.followUpCount >= 3 && daysSinceResponse >= 10) ||
		contact.pendingItems.invoices.overdue
	) {
		return "needs-attention";
	}

	// Priority 2: Waiting for you (amber)
	// Check if client's last action is more recent than attorney's last action
	const hasUnreviewedClientAction = checkUnreviewedClientAction(contact);
	if (hasUnreviewedClientAction) {
		return "waiting-for-you";
	}

	// Priority 3: Waiting for them (green)
	return "waiting-for-them";
}
