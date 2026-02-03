import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactNotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-full gap-4 p-6">
			<h2 className="text-xl font-semibold">Contact not found</h2>
			<p className="text-muted-foreground">
				This contact doesn't exist or has been removed.
			</p>
			<Button asChild>
				<Link href="/contacts">Back to contacts</Link>
			</Button>
		</div>
	);
}
