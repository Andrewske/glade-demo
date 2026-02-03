import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function daysBetween(date1: Date, date2: Date): number {
	const diffTime = Math.abs(date2.getTime() - date1.getTime());
	return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function formatDateShort(date: Date): string {
	return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatDateFull(date: Date): string {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(date);
}

export function getInitials(name: string): string {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();
}
