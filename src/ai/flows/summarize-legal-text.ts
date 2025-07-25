
'use server';
/**
 * @fileOverview An AI agent that summarizes legal text.
 *
 * - summarizeLegalText - A function that handles the legal text summarization process.
 * - SummarizeLegalTextInput - The input type for the summarizeLegalText function.
 * - SummarizeLegalTextOutput - The return type for the summarizeLegalText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeLegalTextInputSchema = z.object({
  legalText: z.string().describe('The legal text to summarize.'),
});
export type SummarizeLegalTextInput = z.infer<typeof SummarizeLegalTextInputSchema>;

const SummarizeLegalTextOutputSchema = z.object({
  summary: z.string().describe('The summary of the legal text.'),
});
export type SummarizeLegalTextOutput = z.infer<typeof SummarizeLegalTextOutputSchema>;

export async function summarizeLegalText(input: SummarizeLegalTextInput): Promise<SummarizeLegalTextOutput> {
  return summarizeLegalTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeLegalTextPrompt',
  input: {schema: SummarizeLegalTextInputSchema},
  output: {schema: SummarizeLegalTextOutputSchema},
  prompt: `You are an expert legal professional, skilled at summarizing legal texts. Please provide a concise and accurate summary of the following legal text:\n\n{{{legalText}}}\n\nSummary:`,
});

const summarizeLegalTextFlow = ai.defineFlow(
  {
    name: 'summarizeLegalTextFlow',
    inputSchema: SummarizeLegalTextInputSchema,
    outputSchema: SummarizeLegalTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
