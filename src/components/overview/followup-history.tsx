import type { Conversation } from "@/lib/types";

interface FollowupHistoryProps {
	conversations: Conversation[];
}

function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
	}).format(date);
}

function getIcon(type: Conversation["type"]) {
	switch (type) {
		case "ai-followup":
			return (
				<svg
					className="h-5 w-5 text-primary"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
					/>
				</svg>
			);
		case "client-response":
			return (
				<svg
					className="h-5 w-5 text-status-success"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
					/>
				</svg>
			);
		case "attorney-message":
			return (
				<svg
					className="h-5 w-5 text-accent"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
					/>
				</svg>
			);
		case "system":
			return (
				<svg
					className="h-5 w-5 text-muted-foreground"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>
			);
	}
}

function getLabel(type: Conversation["type"]): string {
	switch (type) {
		case "ai-followup":
			return "AI Follow-up sent";
		case "client-response":
			return "Client responded";
		case "attorney-message":
			return "Attorney message";
		case "system":
			return "System notification";
	}
}

export function FollowupHistory({ conversations }: FollowupHistoryProps) {
	const recentConversations = conversations
		.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
		.slice(0, 5);

	return (
		<div className="rounded border border-border bg-card p-6">
			<h3 className="mb-4 text-lg font-semibold text-foreground">
				Follow-up History
			</h3>

			<div className="space-y-3">
				{recentConversations.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						No conversation history yet.
					</p>
				) : (
					recentConversations.map((conversation) => (
						<div
							key={conversation.id}
							className="flex items-center justify-between gap-3 rounded border border-border bg-muted p-3"
						>
							<div className="flex items-center gap-3">
								{getIcon(conversation.type)}
								<span className="text-sm text-muted-foreground">
									{getLabel(conversation.type)}
								</span>
							</div>
							<span className="text-sm text-muted-foreground">
								{formatDate(conversation.timestamp)}
							</span>
						</div>
					))
				)}
			</div>
		</div>
	);
}
