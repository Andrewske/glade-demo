"use client";

import { readStreamableValue } from "@ai-sdk/rsc";
import { RefreshCw } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import {
	generateContactSummary,
	type SummaryResult,
} from "@/actions/generate-summary";
import type { ContactWithContext } from "@/lib/types";

interface AISummaryProps {
	contact: ContactWithContext;
}

const CACHE_KEY_PREFIX = "ai-summary-cache-";

function getCachedSummary(contactId: string): Partial<SummaryResult> | null {
	if (typeof window === "undefined") return null;
	try {
		const cached = sessionStorage.getItem(CACHE_KEY_PREFIX + contactId);
		return cached ? JSON.parse(cached) : null;
	} catch {
		return null;
	}
}

function setCachedSummary(
	contactId: string,
	data: Partial<SummaryResult>,
): void {
	if (typeof window === "undefined") return;
	try {
		sessionStorage.setItem(CACHE_KEY_PREFIX + contactId, JSON.stringify(data));
	} catch {
		// Ignore storage errors
	}
}

async function loadSummary(
	contact: ContactWithContext,
	setData: (data: Partial<SummaryResult>) => void,
	setError: (error: string | null) => void,
): Promise<void> {
	try {
		const result = await generateContactSummary(contact);

		if (result.type === "static") {
			setData(result.data);
			setCachedSummary(contact.id, result.data);
		} else {
			let finalData: Partial<SummaryResult> = {};
			for await (const partialObject of readStreamableValue(result.stream)) {
				if (partialObject) {
					setData(partialObject);
					finalData = partialObject;
				}
			}
			setCachedSummary(contact.id, finalData);
		}
	} catch (err) {
		const message =
			err instanceof Error ? err.message : "Failed to generate summary";
		setError(message);
		toast.error(message);
	}
}

export function AISummary({ contact }: AISummaryProps) {
	const [data, setData] = useState<Partial<SummaryResult>>({});
	const [error, setError] = useState<string | null>(null);
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		// Check cache first (dev convenience - avoids API calls on refresh)
		const cached = getCachedSummary(contact.id);
		if (cached?.summary) {
			setData(cached);
			return;
		}

		setData({});
		setError(null);

		startTransition(async () => {
			await loadSummary(contact, setData, setError);
		});
	}, [contact]);

	const handleRefresh = () => {
		setData({});
		setError(null);

		startTransition(async () => {
			await loadSummary(contact, setData, setError);
		});
	};

	return (
		<div className="rounded border border-border bg-card p-6 h-full">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-lg font-semibold text-foreground">AI Summary</h3>
				<button
					onClick={handleRefresh}
					disabled={isPending}
					className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
					aria-label="Refresh summary"
				>
					<RefreshCw className={`h-5 w-5 ${isPending ? "animate-spin" : ""}`} />
				</button>
			</div>

			{isPending && !data.summary ? (
				<div className="space-y-3">
					<div className="h-4 w-full animate-pulse rounded bg-muted" />
					<div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
					<div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
				</div>
			) : error ? (
				<p className="text-sm text-status-danger">{error}</p>
			) : (
				<p className="text-sm leading-relaxed text-muted-foreground">
					{data.summary}
				</p>
			)}
		</div>
	);
}
