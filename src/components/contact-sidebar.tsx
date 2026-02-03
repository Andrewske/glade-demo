"use client";

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { contacts } from "@/lib/mock-data";
import { calculateStatus } from "@/lib/status";
import { cn, getInitials } from "@/lib/utils";
import { StatusBadge } from "./status-badge";

interface ContactSidebarProps {
	mobileMode?: boolean;
	onClose?: () => void;
}

export const ContactSidebar = ({
	mobileMode = false,
	onClose,
}: ContactSidebarProps = {}) => {
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const [loadingId, setLoadingId] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredContacts = contacts.filter((contact) => {
		const query = searchQuery.toLowerCase();
		return (
			contact.name.toLowerCase().includes(query) ||
			contact.email.toLowerCase().includes(query)
		);
	});

	const handleClick = (id: string) => {
		setLoadingId(id);
		startTransition(() => {
			// Navigation happens via Link, this just tracks loading state
			if (mobileMode && onClose) {
				onClose(); // Close sidebar when navigating on mobile
			}
		});
	};

	return (
		<div
			className={`flex h-screen w-full md:w-90 flex-col border-r border-border bg-background`}
		>
			{/* Header */}
			<div className="border-b border-border p-4 h-38">
				<h2 className="mb-3 text-2xl font-semibold text-foreground">
					Contacts
				</h2>

				{/* Tabs */}
				<div className="mb-3 flex gap-4">
					<button className="text-sm font-medium text-foreground border-b-2 border-foreground pb-1">
						Contacts
					</button>
					<button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-1">
						Companies
					</button>
				</div>

				<button className="flex items-center justify-center gap-2 rounded bg-[var(--color-primary)] px-3 py-2 text-xs font-medium text-foreground transition-colors hover:brightness-110">
					<Plus className="h-4 w-4" />
					Create Contact
				</button>
			</div>

			{/* Search with integrated Filters - Full width with top/bottom border */}
			<div className="relative h-12 border-b border-border bg-background">
				<Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<input
					type="text"
					placeholder="Search"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="h-full w-full bg-transparent pl-11 pr-28 text-sm text-foreground placeholder-muted-foreground focus:outline-none"
				/>
				<button className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
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
							d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
						/>
					</svg>
					Filters
					<span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-medium text-foreground">
						1
					</span>
				</button>
			</div>

			{/* Total count */}

			{/* Contact list */}
			<nav aria-label="Contact list" className="flex-1 overflow-y-auto bg-card">
				<div className="py-2 text-center">
					<span className="text-xs text-muted-foreground">
						{filteredContacts.length} total
					</span>
				</div>
				{filteredContacts.map((contact) => {
					const status = calculateStatus(contact);
					const isActive = pathname.startsWith(`/contact/${contact.id}`);
					const isLoading = loadingId === contact.id && isPending;

					const statusLabels = {
						"needs-attention": "needs attention",
						"waiting-for-you": "waiting for you",
						"waiting-for-them": "waiting for them",
					};

					return (
						<Link
							key={contact.id}
							href={`/contact/${contact.id}`}
							onClick={() => handleClick(contact.id)}
							aria-label={`View ${contact.name}, status: ${statusLabels[status]}`}
							aria-current={isActive ? "page" : undefined}
							className={cn(
								"flex items-center gap-3 px-3 h-20 transition-all bg-background",
								isActive &&
									"mx-2 my-1 rounded border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/10",
								!isActive &&
									"mx-2 my-1 rounded border border-border hover:bg-muted",
								isLoading && "opacity-70",
							)}
						>
							{/* Avatar */}
							<div
								className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium text-foreground"
								style={{ backgroundColor: contact.avatarColor }}
							>
								{getInitials(contact.name)}
							</div>

							{/* Contact info */}
							<div className="min-w-0 flex-1">
								<div className="flex items-center gap-2">
									<p className="truncate text-sm font-medium text-foreground">
										{contact.name}
									</p>
									{isLoading ? (
										<div className="h-4 w-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
									) : (
										<StatusBadge status={status} variant="dot" />
									)}
								</div>
								<p className="truncate text-xs text-muted-foreground">
									{contact.email}
								</p>
							</div>
						</Link>
					);
				})}
			</nav>
		</div>
	);
};
