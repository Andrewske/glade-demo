import { openai } from "@ai-sdk/openai";

export const aiModel = openai("gpt-4o-mini");

export function hasOpenAIKey(): boolean {
	return !!process.env.OPENAI_API_KEY;
}
