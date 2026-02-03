"use client";

import { useTheme } from "next-themes";
import { type ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export function ThemedToastContainer(): ReactNode {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect -- Required for hydration
	}, []);

	// Avoid hydration mismatch
	if (!mounted) {
		return null;
	}

	return (
		<ToastContainer
			position="bottom-right"
			theme={resolvedTheme === "dark" ? "dark" : "light"}
			autoClose={5000}
		/>
	);
}
