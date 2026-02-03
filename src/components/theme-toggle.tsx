"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { type ReactNode, useEffect, useState } from "react";

export function ThemeToggle(): ReactNode {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect -- Required for hydration
	}, []);

	const isDark = mounted ? resolvedTheme === "dark" : false;

	return (
		<div className="flex flex-col items-center gap-1.5 py-2">
			{/* Sun icon */}
			{isDark ? (
				<Moon className="h-4 w-4 text-muted-foreground" fill="currentColor" />
			) : (
				<Sun className="h-4 w-4 text-muted-foreground" />
			)}

			{/* Toggle switch */}
			<button
				type="button"
				onClick={() => setTheme(isDark ? "light" : "dark")}
				className="relative h-3 w-6 rounded-full bg-muted transition-colors"
				aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
				role="switch"
				aria-checked={isDark}
			>
				<span
					className={`absolute top-0.5 h-2 w-2 rounded-full bg-foreground shadow-sm transition-transform ${
						isDark ? "left-3.5" : "left-0.5"
					}`}
				/>
			</button>
		</div>
	);
}
