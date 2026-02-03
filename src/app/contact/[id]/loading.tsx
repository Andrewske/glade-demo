import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
	return (
		<div className="p-6 space-y-6">
			{/* Header skeleton */}
			<div className="flex items-center gap-4">
				<Skeleton className="h-16 w-16 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="h-6 w-48" />
					<Skeleton className="h-4 w-32" />
				</div>
			</div>

			{/* Cards skeleton */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Skeleton className="h-48 rounded" />
				<Skeleton className="h-48 rounded" />
				<Skeleton className="h-48 rounded" />
				<Skeleton className="h-48 rounded" />
			</div>
		</div>
	);
}
