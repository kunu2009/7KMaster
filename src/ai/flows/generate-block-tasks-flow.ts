
'use server';
/**
 * @fileOverview Generates task suggestions for a specific time block.
 *
 * - generateBlockTasks - A function that generates a list of task descriptions.
 * - GenerateBlockTasksInput - The input type for the function.
 * - GenerateBlockTasksOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlockTasksInputSchema = z.object({
  blockTitle: z.string().describe("The title or theme of the time block (e.g., 'Focus Block', 'Admin')."),
  existingTasks: z.array(z.string()).describe("A list of tasks already in this time block."),
  projects: z.array(z.object({
    name: z.string(),
    nextAction: z.string(),
  })).describe('A list of the user\'s current projects for context.'),
  skills: z.array(z.object({
    area: z.string(),
    weeklyGoal: z.string(),
  })).describe('A list of skills the user is developing for context.'),
});
export type GenerateBlockTasksInput = z.infer<typeof GenerateBlockTasksInputSchema>;


const GenerateBlockTasksOutputSchema = z.object({
    tasks: z.array(z.string()).describe("An array of 2-3 new, unique task descriptions. The tasks should be concise and actionable."),
});
export type GenerateBlockTasksOutput = z.infer<typeof GenerateBlockTasksOutputSchema>;

export async function generateBlockTasks(input: GenerateBlockTasksInput): Promise<GenerateBlockTasksOutput> {
  return generateBlockTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlockTasksPrompt',
  input: {schema: GenerateBlockTasksInputSchema},
  output: {schema: GenerateBlockTasksOutputSchema},
  prompt: `You are a productivity assistant. Your goal is to suggest 2-3 new tasks for a specific time block in the user's daily plan.

The theme for this block is: "{{blockTitle}}".

Do not repeat any of these existing tasks for this block:
{{#each existingTasks}}
- {{this}}
{{/each}}

Use the user's projects and skills as inspiration for the new tasks.

Projects:
{{#each projects}}
- {{name}}: Next action is "{{nextAction}}"
{{/each}}

Skills:
{{#each skills}}
- {{area}}: The weekly goal is "{{weeklyGoal}}"
{{/each}}

Based on this, generate 2-3 new, concise, and actionable task descriptions. For example, if the theme is "Focus Block", suggest a task related to a project's next action or a skill's weekly goal.
`,
});

const generateBlockTasksFlow = ai.defineFlow(
  {
    name: 'generateBlockTasksFlow',
    inputSchema: GenerateBlockTasksInputSchema,
    outputSchema: GenerateBlockTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output || { tasks: [] };
  }
);
