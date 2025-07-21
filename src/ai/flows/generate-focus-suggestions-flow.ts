'use server';
/**
 * @fileOverview Generates skill focus suggestions.
 *
 * - generateFocusSuggestions - A function that suggests skills to focus on.
 * - GenerateFocusSuggestionsInput - The input type for the function.
 * - GenerateFocusSuggestionsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillSchema = z.object({
    id: z.string(),
    area: z.string(),
    level: z.string(),
    weeklyGoal: z.string(),
});

const GenerateFocusSuggestionsInputSchema = z.object({
  skills: z.array(SkillSchema).describe("A list of all the user's current skills, including their goals."),
});
export type GenerateFocusSuggestionsInput = z.infer<typeof GenerateFocusSuggestionsInputSchema>;


const GenerateFocusSuggestionsOutputSchema = z.object({
    focusSkillIds: z.array(z.string()).describe("An array containing the IDs of the three recommended skills to focus on."),
    reasoning: z.string().describe("A brief, friendly explanation for why these skills were chosen, to be shown to the user."),
});
export type GenerateFocusSuggestionsOutput = z.infer<typeof GenerateFocusSuggestionsOutputSchema>;

export async function generateFocusSuggestions(input: GenerateFocusSuggestionsInput): Promise<GenerateFocusSuggestionsOutput> {
  return generateFocusSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFocusSuggestionsPrompt',
  input: {schema: GenerateFocusSuggestionsInputSchema},
  output: {schema: GenerateFocusSuggestionsOutputSchema},
  prompt: `You are a productivity coach. The user wants to activate "Focus Mode" and needs you to identify the top 3 skills they should concentrate on this week.

Analyze the user's list of skills and their associated weekly goals.

User's Skills:
{{#each skills}}
- Skill: "{{area}}" (ID: {{id}}), Level: {{level}}, Weekly Goal: "{{weeklyGoal}}"
{{/each}}

Based on this, select the three most impactful skills for them to focus on. Consider skills that seem most aligned with growth or have clear, actionable goals.

Return a JSON object containing:
1. 'focusSkillIds': An array with the exact string IDs of the three chosen skills.
2. 'reasoning': A short, encouraging message for the user explaining why these three skills are a great choice for this week's focus. For example: "Focusing on these three will help you make great progress on your main goals this week!"
`,
});

const generateFocusSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateFocusSuggestionsFlow',
    inputSchema: GenerateFocusSuggestionsInputSchema,
    outputSchema: GenerateFocusSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
