
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
  taskType: z.enum(['Project-related', 'Skill-related', 'LawPrep Study', 'Itihas Study', 'HSC English', 'HSC Sanskrit', 'HSC Hindi', 'HSC Economics', 'HSC Political Science']).describe("The specific type of task to generate."),
  existingTasks: z.array(z.string()).describe("A list of tasks already in this time block."),
  projects: z.array(z.object({
    name: z.string(),
    nextAction: z.string(),
  })).describe('A list of the user\'s current projects for context.'),
  skills: z.array(z.object({
    area: z.string(),
    weeklyGoal: z.string(),
  })).describe('A list of skills the user is developing for context.'),
   hscEnglish: z.array(z.string()).optional().describe("A list of HSC English chapter and poem titles."),
   hscSanskrit: z.array(z.string()).optional().describe("A list of HSC Sanskrit chapter and poem titles."),
   hscHindi: z.array(z.string()).optional().describe("A list of HSC Hindi chapter and poem titles."),
   hscEconomics: z.array(z.string()).optional().describe("A list of HSC Economics chapter titles."),
   hscPoliticalScience: z.array(z.string()).optional().describe("A list of HSC Political Science chapter titles."),
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
The user wants tasks related to: "{{taskType}}".

Do not repeat any of these existing tasks for this block:
{{#each existingTasks}}
- {{this}}
{{/each}}

Here is the user's context:
Projects:
{{#if projects}}
    {{#each projects}}
    - {{name}}: Next action is "{{nextAction}}"
    {{/each}}
{{else}}
    No projects.
{{/if}}

Skills:
{{#if skills}}
    {{#each skills}}
    - {{area}}: The weekly goal is "{{weeklyGoal}}"
    {{/each}}
{{else}}
    No skills.
{{/if}}

{{#if hscEnglish}}
HSC English Syllabus: {{#each hscEnglish}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}
{{#if hscSanskrit}}
HSC Sanskrit Syllabus: {{#each hscSanskrit}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}
{{#if hscHindi}}
HSC Hindi Syllabus: {{#each hscHindi}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}
{{#if hscEconomics}}
HSC Economics Syllabus: {{#each hscEconomics}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}
{{#if hscPoliticalScience}}
HSC Political Science Syllabus: {{#each hscPoliticalScience}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}


Based on the requested task type and the context, generate 2-3 new, concise, and actionable task descriptions.

- If the type is 'Project-related', suggest tasks based on the project next actions.
- If the type is 'Skill-related', suggest tasks based on the skill development goals.
- If the type is 'LawPrep Study', suggest a specific law study task like "Review Tort Law notes for 15 mins" or "Complete 10 MCQs on Constitutional Law".
- If the type is 'Itihas Study', suggest a specific history study task like "Read chapter on the Mughal Empire" or "Make flashcards for the Harappan Civilization".
- If the type is 'HSC English', suggest a specific English study task related to one of the provided syllabus chapters. For example, "Summarize the poem 'The Inchcape Rock'" or "Practice writing a counter-view on a given topic based on 'The New Dress'".
- If the type is 'HSC Sanskrit', suggest a task like "Translate 5 verses from a specific chapter" or "Revise grammar rules for Sandhi".
- If the type is 'HSC Hindi', suggest a task like "Write a summary of a prose chapter" or "Practice 'Vakya Shuddhi' based on a chapter".
- If the type is 'HSC Economics', suggest a task like "Explain the Law of Demand with a diagram" or "Revise features of Microeconomics based on the provided syllabus".
- If the type is 'HSC Political Science', suggest a task like "Analyze the role of the UN" or "Summarize the key events of the Cold War based on the provided syllabus".
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
