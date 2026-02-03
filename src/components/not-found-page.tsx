import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NotFoundPageProps {
	title?: string;
	description?: string;
	fullScreen?: boolean;
}

export function NotFoundPage({
	title = "Page not found",
	description = "The page you're looking for doesn't exist.",
	fullScreen = false,
}: NotFoundPageProps) {
	return (
		<div
			className={`flex flex-col items-center justify-center gap-4 ${fullScreen ? "min-h-screen" : "h-full p-6"}`}
		>
			<h2 className="text-xl font-semibold">{title}</h2>
			<p className="text-muted-foreground">{description}</p>
			<Button asChild>
				<Link href="/contacts">Back to contacts</Link>
			</Button>
		</div>
	);
}
