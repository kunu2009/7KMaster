
'use server';
/**
 * @fileOverview A flow to analyze a user's journal entry and provide emotional insight.
 *
 * - analyzeMood - A function that analyzes the mood of a text entry.
 * - MoodMirrorInput - The input type for the function.
 * - MoodMirrorOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MoodMirrorInputSchema = z.object({
  journalEntry: z.string().describe("The user's freeform text entry about their day or feelings."),
});
export type MoodMirrorInput = z.infer<typeof MoodMirrorInputSchema>;

const MoodMirrorOutputSchema = z.object({
  mood: z.string().describe("A single-word emotion that best describes the user's entry (e.g., 'Productive', 'Stressed', 'Hopeful')."),
  insight: z.string().describe("A short, empathetic, and constructive insight based on the user's entry. It should be about 1-2 sentences."),
  color: z.string().describe("A hex color code representing the mood (e.g., '#4ade80' for positive, '#f87171' for negative, '#60a5fa' for neutral)."),
});
export type MoodMirrorOutput = z.infer<typeof MoodMirrorOutputSchema>;

export async function analyzeMood(input: MoodMirrorInput): Promise<MoodMirrorOutput> {
  return moodMirrorFlow(input);
}

const prompt = ai.definePrompt({
    name: 'moodMirrorPrompt',
    input: { schema: MoodMirrorInputSchema },
    output: { schema: MoodMirrorOutputSchema },
    prompt: `You are an empathetic AI life coach. A user has written a short journal entry about their day. Your task is to analyze their entry and provide a reflection.

User's Entry: "{{journalEntry}}"

Based on the entry, perform the following steps:
1.  Identify the dominant emotion or mood. This should be a single, descriptive word (e.g., Productive, Overwhelmed, Grateful, Anxious, Reflective).
2.  Provide a concise, empathetic, and constructive insight (1-2 sentences). If the mood is negative, offer gentle encouragement. If it's positive, celebrate it.
3.  Choose a hex color code that visually represents the mood. Use calming, modern colors. For example:
    - Positive (Productive, Hopeful, Grateful): A green like #4ade80
    - Negative (Stressed, Overwhelmed, Anxious): A red like #f87171
    - Neutral or Mixed (Reflective, Thoughtful): A blue like #60a5fa

Return the result as a JSON object with the fields: 'mood', 'insight', and 'color'.
`,
});

const moodMirrorFlow = ai.defineFlow(
  {
    name: 'moodMirrorFlow',
    inputSchema: MoodMirrorInputSchema,
    outputSchema: MoodMirrorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
