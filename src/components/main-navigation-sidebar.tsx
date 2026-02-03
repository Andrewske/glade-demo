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
import { useRouter } from "next/navigation";

const navigation = [
	{ name: "Home", icon: Home },
	{ name: "Inbox", icon: Mail },
	{ name: "Messaging", icon: MessageSquare },
	{ name: "Workflows", icon: HelpCircle },
	{ name: "Content", icon: RefreshCw },
	{ name: "Contacts", icon: Users },
	{ name: "Transactions", icon: DollarSign },
	{ name: "Bookings", icon: Calendar },
	{ name: "Workflow Reports", icon: FileText },
];

interface MainNavigationSidebarProps {
	currentPath: string;
	onClose?: () => void;
}

export const MainNavigationSidebar = ({
	currentPath,
	onClose,
}: MainNavigationSidebarProps) => {
	const router = useRouter();
	const isContactsActive =
		currentPath === "/contacts" || currentPath.startsWith("/contact/");

	return (
		<div className="flex h-full w-full flex-col ">
			{/* Navigation items */}
			<nav className="flex-1 overflow-y-auto">
				{navigation.map((item) => {
					const Icon = item.icon;
					const isActive = item.name === "Contacts" && isContactsActive;

					return (
						<button
							key={item.name}
							onClick={() => {
								if (item.name === "Contacts") {
									router.push("/contacts");
									onClose?.();
								}
								// Other items are visual only
							}}
							className={`flex w-full items-center gap-2 px-3 py-3 text-md  transition-colors ${
								isActive
									? "bg-muted text-foreground"
									: "text-muted-foreground hover:bg-muted hover:text-foreground"
							}`}
						>
							<Icon className="h-5 w-5" />
							<span>{item.name}</span>
						</button>
					);
				})}
			</nav>

			{/* Account button at bottom */}
			<div className="border-t border-border p-4">
				<button className="flex w-full items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground">
					<div className="flex h-5 w-5 items-center justify-center">
						<svg
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<circle cx="12" cy="12" r="10" strokeWidth={2} />
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 16v-4m0-4h.01"
							/>
						</svg>
					</div>
					<span>Account</span>
				</button>
			</div>
		</div>
	);
};
