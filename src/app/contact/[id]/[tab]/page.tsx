interface TabPageProps {
	params: Promise<{ id: string; tab: string }>;
}

export default async function TabPage({ params }: TabPageProps) {
	const { tab } = await params;

	// Format tab name for display
	const tabName = tab
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	return (
		<div className="p-6">
			<div className="rounded border border-border bg-card p-8 text-center">
				<h2 className="mb-2 text-xl font-semibold text-foreground">
					{tabName}
				</h2>
				<p className="text-muted-foreground">Coming soon</p>
			</div>
		</div>
	);
}
