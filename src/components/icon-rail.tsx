"use client";

import {
	Calendar,
	DollarSign,
	FileText,
	HelpCircle,
	Home,
	Mail,
	MessageSquare,
	RefreshCw,
	Users,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = [
	{ name: "Home", href: "/", icon: Home },
	{ name: "Inbox", href: "/inbox", icon: Mail },
	{ name: "Messaging", href: "/messages", icon: MessageSquare },
	{ name: "Workflows", href: "/help", icon: HelpCircle },
	{ name: "Content", href: "/sync", icon: RefreshCw },
	{ name: "Contacts", href: "/contacts", icon: Users },
	{ name: "Transactions", href: "/billing", icon: DollarSign },
	{ name: "Bookings", href: "/calendar", icon: Calendar },
	{ name: "Workflow Reports", href: "/documents", icon: FileText },
];

export const IconRail = () => {
	const pathname = usePathname();

	const isActive = (href: string): boolean => {
		if (href === "/contacts") {
			return pathname === "/contacts" || pathname.startsWith("/contact/");
		}
		return pathname === href;
	};

	return (
		<div className="flex h-screen w-18 flex-col items-center border-r border-border bg-background py-4">
			{/* Glade logo */}
			<div className="mb-8 flex h-8 w-8 items-center justify-center">
				<Image
					src="/glade-logo.avif"
					alt="Glade"
					width={28}
					height={32}
					className="rounded"
				/>
			</div>

			{/* Navigation icons */}
			<nav className="flex flex-col gap-2 w-full">
				{navigation.map((item) => {
					const Icon = item.icon;
					const active = isActive(item.href);

					return (
						<div key={item.name} className="group relative w-full">
							<button
								className={`flex py-3 w-full cursor-pointer items-center justify-center transition-colors ${
									active ? "bg-muted text-foreground" : "text-muted-foreground"
								}`}
								onClick={(e) => e.preventDefault()}
							>
								<Icon className="h-6 w-6" />
							</button>
							{/* Tooltip */}
							<div className="z-50 pointer-events-none absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-muted px-2 py-1 text-[10px] text-foreground shadow-lg group-hover:block">
								{item.name}
							</div>
						</div>
					);
				})}
			</nav>
		</div>
	);
};
