

'use server';
/**
 * @fileOverview An AI agent that simulates a courtroom judge.
 *
 * - courtroomAgent - A function that simulates the judge's response in a mock trial.
 * - CourtroomAgentInput - The input type for the courtroomAgent function.
 * - CourtroomAgentOutput - The return type for the courtroomAgent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { CaseSimulation } from '@/lib/types';

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CourtroomAgentInputSchema = z.object({
  caseInfo: z.object({
    id: z.string(),
    title: z.string(),
    scenario: z.string(),
    playerRole: z.string(),
  }).describe("The details of the mock case."),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).describe("The history of the conversation so far."),
});
export type CourtroomAgentInput = z.infer<typeof CourtroomAgentInputSchema>;

const CourtroomAgentOutputSchema = z.object({
  aiResponse: z.string().describe("The AI judge's response to the user's argument."),
});
export type CourtroomAgentOutput = z.infer<typeof CourtroomAgentOutputSchema>;

export async function courtroomAgent(input: CourtroomAgentInput): Promise<CourtroomAgentOutput> {
  return courtroomAgentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'courtroomAgentPrompt',
  input: {schema: CourtroomAgentInputSchema},
  output: {schema: CourtroomAgentOutputSchema},
  prompt: `You are an AI Judge presiding over a mock trial simulation. Your persona is that of a wise, impartial, and strict judge. You must maintain this persona throughout the interaction.

The user is a law student playing the role of a lawyer. Your task is to respond to their arguments based on the provided case scenario and general principles of law.

**Case Details:**
- **Title:** {{{caseInfo.title}}}
- **Scenario:** {{{caseInfo.scenario}}}
- **User's Role:** {{{caseInfo.playerRole}}}

**Your Instructions:**
1.  **Analyze the User's Argument:** Evaluate the user's latest argument from the chat history. Is it logical? Is it based on law or emotion?
2.  **Maintain Your Role:** Address the user formally (e.g., "Counselor,"). Ask probing questions, point out fallacies, or rule on their arguments.
3.  **Keep it Realistic:** Your responses should mimic a real courtroom exchange. They can be short and direct (e.g., "Objection sustained. Move on, Counselor.") or more detailed, explaining a legal point.
4.  **Do Not Conclude Immediately:** Do not end the case in one turn. The goal is a back-and-forth interaction. Guide the simulation forward.
5.  **Use the Chat History for Context.**

**Conversation History:**
{{#each history}}
  **{{role}}:** {{{content}}}
{{/each}}

Based on the user's last argument, provide your response as the judge.`,
});

const courtroomAgentFlow = ai.defineFlow(
  {
    name: 'courtroomAgentFlow',
    inputSchema: CourtroomAgentInputSchema,
    outputSchema: CourtroomAgentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
