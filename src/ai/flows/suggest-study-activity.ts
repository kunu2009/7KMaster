

'use server';
/**
 * @fileOverview An AI agent that suggests study activities based on a user's mood.
 *
 * - suggestStudyActivity - A function that suggests a study activity.
 * - StudyActivityInput - The input type for the suggestStudyActivity function.
 * - StudyActivityOutput - The return type for the suggestStudyActivity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudyActivityInputSchema = z.object({
  mood: z.string().describe('The user\'s current mood and energy level.'),
});
export type StudyActivityInput = z.infer<typeof StudyActivityInputSchema>;

const StudyActivityOutputSchema = z.object({
  suggestion: z.string().describe('A detailed study suggestion tailored to the user\'s mood, including what to study and how. The suggestion should be formatted with markdown, using headings and bullet points.'),
});
export type StudyActivityOutput = z.infer<typeof StudyActivityOutputSchema>;

export async function suggestStudyActivity(input: StudyActivityInput): Promise<StudyActivityOutput> {
  return suggestStudyActivityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStudyActivityPrompt',
  input: {schema: StudyActivityInputSchema},
  output: {schema: StudyActivityOutputSchema},
  prompt: `You are an expert study coach for law students. Your goal is to provide a specific, actionable study suggestion based on the user's mood.

Here are the available study tools in the app:
- **Daily MCQs:** For quick practice.
- **Topic Notes:** For in-depth reading.
- **Flashcards:** For quick revision of terms and maxims.
- **Legal Reels:** For very short, memorable facts.
- **Summarizer:** To summarize long legal texts.
- **AI Assistant:** To ask specific questions.
- **Visual Law:** For understanding processes with diagrams.

User's Mood: "{{{mood}}}"

Based on this mood, provide a single, creative study plan. Recommend one or two specific activities from the list above and suggest a relevant topic (e.g., "Fundamental Rights", "Law of Torts"). The response should be encouraging and formatted clearly using markdown.

Example for a tired user:
### Low-Energy Revision Session

Since you're feeling tired, let's do something light but effective!

*   **Activity:** Flip through 10-15 **Flashcards** on "Legal Maxims".
*   **Why:** It's a low-effort way to reinforce key terms without heavy reading.
*   **Bonus:** Watch a few **Legal Reels** for some quick, fun facts!
`,
});

const suggestStudyActivityFlow = ai.defineFlow(
  {
    name: 'suggestStudyActivityFlow',
    inputSchema: StudyActivityInputSchema,
    outputSchema: StudyActivityOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
