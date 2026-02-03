import { notFound } from "next/navigation";
import { ContactHeader } from "@/components/contact-header";
import { TabNavigation } from "@/components/tab-navigation";
import { contacts } from "@/lib/mock-data";

interface ContactLayoutProps {
	children: React.ReactNode;
	params: Promise<{ id: string }>;
}

export default async function ContactLayout({
	children,
	params,
}: ContactLayoutProps) {
	const { id } = await params;

	// Find contact by ID
	const contact = contacts.find((c) => c.id === id);

	if (!contact) {
		notFound();
	}

	return (
		<>
			{/* Skip link for keyboard navigation */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-foreground"
			>
				Skip to main content
			</a>

			{/* Main content area */}
			<div id="main-content" className="flex flex-1 flex-col overflow-hidden">
				<ContactHeader contact={contact} />
				<TabNavigation contactId={id} />

				{/* Tab content */}
				<div className="flex-1 overflow-y-auto transition-opacity duration-200">
					{children}
				</div>
			</div>
		</>
	);
}
