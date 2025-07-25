
'use server';
/**
 * @fileOverview An AI agent that answers law-related questions for students.
 *
 * - answerLawQuestion - A function that uses the AI to answer a law question.
 * - AnswerLawQuestionInput - The input type for the answerLawQuestion function.
 * - AnswerLawQuestionOutput - The return type for the answerLawQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerLawQuestionInputSchema = z.object({
  question: z.string().describe('The law-related question to be answered.'),
});
export type AnswerLawQuestionInput = z.infer<typeof AnswerLawQuestionInputSchema>;

const AnswerLawQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the law-related question.'),
});
export type AnswerLawQuestionOutput = z.infer<typeof AnswerLawQuestionOutputSchema>;

export async function answerLawQuestion(input: AnswerLawQuestionInput): Promise<AnswerLawQuestionOutput> {
  return answerLawQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerLawQuestionPrompt',
  input: {schema: AnswerLawQuestionInputSchema},
  output: {schema: AnswerLawQuestionOutputSchema},
  prompt: `You are a helpful AI assistant for law students. Your goal is to answer their questions about legal concepts in a clear and concise manner.

Question: {{{question}}}`,
});

const answerLawQuestionFlow = ai.defineFlow(
  {
    name: 'answerLawQuestionFlow',
    inputSchema: AnswerLawQuestionInputSchema,
    outputSchema: AnswerLawQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
