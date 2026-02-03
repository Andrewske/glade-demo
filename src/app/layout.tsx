import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ContactSidebar } from "@/components/contact-sidebar";
import { IconRail } from "@/components/icon-rail";
import { MobileHeader } from "@/components/mobile-header";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemedToastContainer } from "@/components/themed-toast-container";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Glade - Contact Overview",
	description: "Contact management for bankruptcy attorneys",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider>
					<div className="flex h-screen bg-background">
						{/* Mobile header */}
						<MobileHeader />

						{/* Desktop: Always visible sidebars */}
						<div className="hidden md:flex">
							<IconRail />
							<ContactSidebar />
						</div>

						{/* Main content area */}
						<div className="flex-1 min-w-0 overflow-hidden pt-10 md:pt-0">
							{children}
						</div>
					</div>
					<ThemedToastContainer />
				</ThemeProvider>
			</body>
		</html>
	);
}
