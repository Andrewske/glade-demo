import { NextResponse } from "next/server";
import { getContactSummary } from "@/lib/data/contacts";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	const summary = await getContactSummary(id);

	if (!summary) {
		return NextResponse.json({ error: "Summary not found" }, { status: 404 });
	}

	return NextResponse.json(summary);
}
