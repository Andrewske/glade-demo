import { ContactSidebar } from "@/components/contact-sidebar";

export default function ContactsPage() {
	return (
		<>
			{/* Mobile: Show contact list in main area */}
			<div className="h-full md:hidden">
				<ContactSidebar />
			</div>

			{/* Desktop: Placeholder (sidebar handles contact list) */}
			<div className="hidden h-full items-center justify-center md:flex">
				<p className="text-lg text-muted-foreground">
					Select a contact to view details
				</p>
			</div>
		</>
	);
}
