"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MainNavigationSidebar } from "@/components/main-navigation-sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export const MobileHeader = () => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<>
			{/* Fixed header */}
			<div className="fixed left-0 right-0 top-0 z-50 flex h-10 items-center border-b border-border  px-2 md:hidden">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className={`flex h-8 w-8 items-center justify-center rounded ${
						isOpen
							? "bg-[var(--color-primary)] text-background"
							: "text-foreground"
					}`}
					aria-label={isOpen ? "Close menu" : "Open menu"}
				>
					{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</button>

				<div className="flex flex-1 items-center justify-center gap-3">
					<div className="flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-medium text-foreground">
						KA
					</div>
					<span className="text-xs font-medium text-foreground">
						Kevin Andrews
					</span>
				</div>
			</div>

			{/* Navigation sheet - positioned below header */}
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetContent side="left" belowHeader>
					<MainNavigationSidebar
						currentPath={pathname}
						onClose={() => setIsOpen(false)}
					/>
				</SheetContent>
			</Sheet>
		</>
	);
};
