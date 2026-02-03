import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen gap-4">
			<h2 className="text-xl font-semibold">Page not found</h2>
			<p className="text-muted-foreground">
				The page you're looking for doesn't exist.
			</p>
			<Button asChild>
				<Link href="/contacts">Back to contacts</Link>
			</Button>
		</div>
	);
}
