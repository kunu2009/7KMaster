
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
import type { Project, Skill, TimeBlock } from '@/lib/types';


const GenerateDailyPlanInputSchema = z.object({
  projects: z.array(z.object({
    name: z.string(),
    nextAction: z.string(),
  })).describe('A list of the user\'s current projects.'),
  skills: z.array(z.object({
    area: z.string(),
    weeklyGoal: z.string(),
  })).describe('A list of skills the user is developing.'),
  timeBlocks: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).optional().describe("A list of the user's custom time blocks for their schedule."),
});
export type GenerateDailyPlanInput = z.infer<typeof GenerateDailyPlanInputSchema>;


const TaskSchema = z.object({
    id: z.string().describe('A unique ID for the task, can be a simple number string like "1".'),
    timeBlock: z.string().describe("The suggested time for the task (e.g., '08:00 - 08:30', '10:00 - 12:00'). This must be one of the time blocks provided in the input."),
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
The plan must be time-blocked using the user's provided time blocks. Each task needs a specific time block assigned to it from the list below. The plan should feel balanced, with focus work, breaks, and personal/study tasks.

User's Custom Time Blocks:
{{#if timeBlocks}}
    {{#each timeBlocks}}
    - {{name}}
    {{/each}}
{{else}}
    - 08:00 - 09:00 Morning Routine
    - 09:00 - 11:00 Focus Block 1
    - 11:30 - 12:30 Skill Practice
    - 13:30 - 14:30 Admin & Breaks
    - 15:00 - 17:00 Focus Block 2
    - 17:00 - 17:30 Afternoon Wrap-up
    - 20:00 - 21:00 Evening Review
{{/if}}


Here are the user's projects and skills:

Projects:
{{#each projects}}
- {{name}}: Next action is "{{nextAction}}"
{{/each}}

Skills:
{{#each skills}}
- {{area}}: The weekly goal is "{{weeklyGoal}}"
{{/each}}

Incorporate at least one study-related task from Law (e.g., "Review Constitution notes"), History (e.g., "Read Chapter on the Renaissance"), or HSC Board studies (e.g., "HSC English: Read 'The Inchcape Rock'").

Based on this, generate a new list of 7 tasks. The tasks should be specific and actionable. For example, instead of 'Work on Project X', say 'Project: 7K Life - Add rewards system'.
Ensure the output is a JSON object with a "tasks" array, where each task has an id, a specific timeBlock from the user's list, a task description, and done (default to false).
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
