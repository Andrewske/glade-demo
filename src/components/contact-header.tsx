import { Settings } from "lucide-react";
import { calculateStatus } from "@/lib/status";
import type { ContactWithContext } from "@/lib/types";
import { formatDateFull } from "@/lib/utils";
import { StatusBadge } from "./status-badge";

interface ContactHeaderProps {
	contact: ContactWithContext;
}

export const ContactHeader = ({ contact }: ContactHeaderProps) => {
	const status = calculateStatus(contact);

	return (
		<div className="border-b border-border  bg-background h-38 px-4 py-4 md:px-6 flex flex-col justify-between">
			<div className="mb-4 items-center gap-1 text-xs text-muted-foreground flex">
				<span>Contacts</span>
				<span>/</span>
				<span>Unverified</span>
				<span>/</span>
				<span className="text-foreground">{contact.name}</span>
			</div>

			{/* Contact info */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3 md:gap-4">
					<div>
						{/* Name and status */}
						<div className="mb-1 flex gap-2 md:flex-row md:items-center md:gap-3">
							<h1 className="text-2xl font-semibold text-foreground md:text-2xl">
								{contact.name}
							</h1>
							<StatusBadge status={status} variant="badge" />
						</div>

						{/* Email and created date */}
						<div className="flex flex-col gap-1 text-xs text-muted-foreground md:flex-row md:items-center md:gap-3 md:text-sm">
							<span>{contact.email}</span>
							<span className="hidden md:inline">•</span>
							<span className="hidden md:inline">
								Created at {formatDateFull(contact.createdAt)}
							</span>
						</div>
					</div>
				</div>

				{/* Settings icon */}
				<button className="flex h-10 w-10 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
					<Settings className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
};
