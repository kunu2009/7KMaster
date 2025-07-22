
'use server';
/**
 * @fileOverview Generates a daily plan based on user's projects and skills.
 *
 * - generateDailyPlan - A function that generates a list of tasks.
 * - GenerateDailyPlanInput - The input type for the generateDailyPlan function.
 * - GenerateDailyPlanOutput - The return type for the function.
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
    timeBlock: z.string().describe("The suggested time for the task (e.g., '08:00 - 08:30', '10:00 - 12:00')."),
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
  prompt: `You are a productivity assistant. Your goal is to create a simple, actionable daily plan with exactly 7 tasks for the user, presented in chronological order.
The plan should be time-blocked. Each task needs a specific start and end time. The plan should feel balanced, with focus work, breaks, and personal tasks.

The plan should include:
1.  A short morning routine task.
2.  Two long focus blocks (e.g., 1.5-2 hours) dedicated to specific projects or skills.
3.  A shorter skill practice session.
4.  A mid-day break or administrative task.
5.  An afternoon wrap-up task.
6.  An evening task for review or wind-down.

Here are the user's projects and skills:

Projects:
{{#each projects}}
- {{name}}: Next action is "{{nextAction}}"
{{/each}}

Skills:
{{#each skills}}
- {{area}}: The weekly goal is "{{weeklyGoal}}"
{{/each}}

Based on this, generate a new list of 7 tasks. The tasks should be specific and actionable. For example, instead of 'Work on Project X', say 'Project: 7K Life - Add rewards system'.
Ensure the output is a JSON object with a "tasks" array, where each task has an id, a specific timeBlock (e.g., '09:00 - 11:00'), a task description, and done (default to false).
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
