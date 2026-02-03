"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { ContactWithContext } from "@/lib/types";

interface SuggestedActionProps {
	contact: ContactWithContext;
}

export function SuggestedAction({ contact }: SuggestedActionProps) {
	const [escalationMessage, setEscalationMessage] = useState<string>("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEscalation = async () => {
			try {
				const response = await fetch(`/api/summary/${contact.id}`);
				const data = await response.json();
				setEscalationMessage(data.escalation || "");
			} catch (error) {
				console.error("Failed to fetch escalation message:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEscalation();
	}, [contact.id]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(escalationMessage);
			toast.success("Message copied to clipboard");
		} catch (error) {
			console.error("Failed to copy:", error);
			toast.error("Failed to copy message");
		}
	};

	const handleSMS = () => {
		toast.info("SMS feature coming soon");
	};

	if (loading) {
		return (
			<div className="rounded border border-status-danger/20 bg-status-danger/10 p-6">
				<div className="mb-4 flex items-center gap-2">
					<svg
						className="h-5 w-5 text-status-danger"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					<h3 className="text-lg font-semibold text-foreground">
						Suggested Action
					</h3>
				</div>
				<div className="h-4 w-full animate-pulse rounded bg-muted" />
			</div>
		);
	}

	if (!escalationMessage) {
		return null;
	}

	return (
		<div className="rounded border border-status-danger/20 bg-status-danger/10 p-6">
			<div className="mb-4 flex items-center gap-2">
				<svg
					className="h-5 w-5 text-status-danger"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<h3 className="text-lg font-semibold text-foreground">
					Suggested Action
				</h3>
			</div>

			<p className="mb-4 text-sm leading-relaxed text-muted-foreground">
				Multiple follow-ups haven't gotten a response. Try a different approach:
			</p>

			<div className="mb-4 rounded border border-border bg-background p-4">
				<p className="text-sm italic leading-relaxed text-muted-foreground">
					"{escalationMessage}"
				</p>
			</div>

			<div className="flex gap-3">
				<button
					onClick={handleCopy}
					className="flex items-center gap-2 rounded bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
				>
					<svg
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
					Copy Message
				</button>

				<button
					onClick={handleSMS}
					className="flex items-center gap-2 rounded bg-accent/20 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/30"
				>
					<svg
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
						/>
					</svg>
					Send via SMS
				</button>
			</div>
		</div>
	);
}
