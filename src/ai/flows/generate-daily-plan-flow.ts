'use server';
/**
 * @fileOverview Generates a daily plan based on user's projects and skills.
 *
 * - generateDailyPlan - A function that generates a list of tasks.
 * - GenerateDailyPlanInput - The input type for the generateDailyPlan function.
 * - GenerateDailyPlanOutput - The return type for the generateDailyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Project, Skill } from '@/lib/types';


const GenerateDailyPlanInputSchema = z.object({
  projects: z.array(z.object({
    name: z.string(),
    nextAction: z.string(),
  })).describe('A list of the user\'s current projects.'),
  skills: z.array(z.object({
    area: z.string(),
    weeklyGoal: z.string(),
  })).describe('A list of skills the user is developing.'),
});
export type GenerateDailyPlanInput = z.infer<typeof GenerateDailyPlanInputSchema>;


const TaskSchema = z.object({
    id: z.string().describe('A unique ID for the task, can be a simple number string like "1".'),
    timeBlock: z.string().describe("The suggested time block for the task (e.g., 'Morning Reset', 'Focus Block 1'). There should be 5 tasks in total."),
    task: z.string().describe('A description of the task to be completed.'),
    done: z.boolean().describe('Whether the task is completed. Default to false.'),
});

const GenerateDailyPlanOutputSchema = z.object({
    tasks: z.array(TaskSchema),
});
export type GenerateDailyPlanOutput = z.infer<typeof GenerateDailyPlanOutputSchema>;

export async function generateDailyPlan(input: GenerateDailyPlanInput): Promise<GenerateDailyPlanOutput> {
  return generateDailyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailyPlanPrompt',
  input: {schema: GenerateDailyPlanInputSchema},
  output: {schema: GenerateDailyPlanOutputSchema},
  prompt: `You are a productivity assistant. Your goal is to create a simple, actionable daily plan with exactly 5 tasks for the user.
The plan should include:
1.  A morning task for setup or well-being.
2.  Two focus blocks dedicated to specific projects or skills from the lists provided.
3.  A practice/activity block for another skill.
4.  An evening task for review or wind-down.

Here are the user's projects and skills:

Projects:
{{#each projects}}
- {{name}}: Next action is "{{nextAction}}"
{{/each}}

Skills:
{{#each skills}}
- {{area}}: The weekly goal is "{{weeklyGoal}}"
{{/each}}

Based on this, generate a new list of 5 tasks. The tasks should be specific and actionable. For example, instead of 'Work on Project X', say 'Project: 7K Life - Add rewards system'.
Ensure the output is a JSON object with a "tasks" array, where each task has an id, timeBlock, task, and done (default to false).
`,
});

const generateDailyPlanFlow = ai.defineFlow(
  {
    name: 'generateDailyPlanFlow',
    inputSchema: GenerateDailyPlanInputSchema,
    outputSchema: GenerateDailyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
