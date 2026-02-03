"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabNavigationProps {
	contactId: string;
}

const tabs = [
	{ name: "Overview", href: "" },
	{ name: "Information", href: "information" },
	{ name: "Conversation", href: "conversation" },
	{ name: "Documents", href: "documents" },
	{ name: "Forms", href: "forms" },
	{ name: "Workflows", href: "workflows" },
	{ name: "Invoices", href: "invoices" },
	{ name: "Order History", href: "order-history" },
	{ name: "AI Follow-up Cadence", href: "ai-followup-cadence" },
	{ name: "Notes", href: "notes" },
];

export const TabNavigation = ({ contactId }: TabNavigationProps) => {
	const pathname = usePathname();

	const isActive = (tabHref: string): boolean => {
		const basePath = `/contact/${contactId}`;
		if (tabHref === "") {
			return pathname === basePath;
		}
		return pathname === `${basePath}/${tabHref}`;
	};

	return (
		<div className="border-b border-border bg-background">
			<nav
				className="flex gap-6 overflow-x-scroll px-6 py-2 scrollbar-thin-grey"
				aria-label="Tabs"
			>
				{tabs.map((tab) => {
					const active = isActive(tab.href);
					const href =
						tab.href === ""
							? `/contact/${contactId}`
							: `/contact/${contactId}/${tab.href}`;

					return (
						<Link
							key={tab.name}
							href={href}
							className={`whitespace-nowrap  px-2 py-1 rounded text-xs transition-colors ${
								active
									? "bg-muted font-medium text-foreground"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							{tab.name}
						</Link>
					);
				})}
			</nav>
		</div>
	);
};
