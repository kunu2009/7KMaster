
'use server';
/**
 * @fileOverview A flow to generate a list of to-do items for a project.
 *
 * - generateProjectTodos - A function that generates todos for a project.
 * - GenerateTodosInput - The input type for the function.
 * - GenerateTodosOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTodosInputSchema = z.object({
  projectName: z.string().describe('The name of the project to generate todos for.'),
  numberOfTodos: z.number().int().positive().describe('The number of todos to generate.'),
  projectContext: z.string().optional().describe('Any additional context about the project, like its goal or next action.'),
});
export type GenerateTodosInput = z.infer<typeof GenerateTodosInputSchema>;

const TodoSchema = z.object({
    id: z.string().describe("A unique ID for the todo item, generated as a random string."),
    text: z.string().describe("The description of the task. This field is crucial and cannot be blank or just whitespace."),
    completed: z.boolean().describe("Whether the task is completed. This should always be false initially."),
});

const GenerateTodosOutputSchema = z.object({
  todos: z.array(TodoSchema),
});
export type GenerateTodosOutput = z.infer<typeof GenerateTodosOutputSchema>;


export async function generateProjectTodos(input: GenerateTodosInput): Promise<GenerateTodosOutput> {
  return generateProjectTodosFlow(input);
}


const prompt = ai.definePrompt({
    name: 'generateProjectTodosPrompt',
    input: { schema: GenerateTodosInputSchema },
    output: { schema: GenerateTodosOutputSchema },
    prompt: `
        You are a world-class project manager. A user needs help breaking down a project into tasks.
        Generate a list of exactly {{numberOfTodos}} actionable to-do items for the project named "{{projectName}}".

        {{#if projectContext}}
        The user has provided this context about the project: "{{projectContext}}"
        {{/if}}
        
        The tasks should be concrete, actionable, and clear. For example, instead of "code the backend", a good task would be "Set up Express server with TypeScript".
        Return the result as a JSON object with a "todos" array. Each todo must have:
        - an "id" (a unique random string)
        - a "text" (the task description, this cannot be empty)
        - a "completed" field (which must be false).
    `,
});

const generateProjectTodosFlow = ai.defineFlow(
  {
    name: 'generateProjectTodosFlow',
    inputSchema: GenerateTodosInputSchema,
    outputSchema: GenerateTodosOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output || { todos: [] };
  }
);
