import type { ContactStatus } from "@/lib/types";

interface StatusBadgeProps {
	status: ContactStatus;
	variant: "dot" | "badge";
}

const statusConfig = {
	"waiting-for-them": {
		label: "Waiting for them",
		bgClass: "bg-status-success",
		textClass: "text-status-success",
	},
	"waiting-for-you": {
		label: "Waiting for you",
		bgClass: "bg-status-warning",
		textClass: "text-status-warning",
	},
	"needs-attention": {
		label: "Needs attention",
		bgClass: "bg-status-danger",
		textClass: "text-status-danger",
	},
} as const;

export const StatusBadge = ({ status, variant }: StatusBadgeProps) => {
	const config = statusConfig[status];

	if (variant === "dot") {
		return (
			<div
				role="status"
				aria-label={`Status: ${config.label}`}
				className={`h-2 w-2 rounded-full ${config.bgClass}`}
				title={config.label}
			/>
		);
	}

	return (
		<div
			role="status"
			aria-label={`Status: ${config.label}`}
			className={`inline-flex items-center gap-1.5 rounded border border-border bg-muted px-2 text-xs font-medium ${config.textClass}`}
		>
			<div className={`h-1.5 w-1.5 rounded ${config.bgClass}`} />
			{config.label}
		</div>
	);
};
