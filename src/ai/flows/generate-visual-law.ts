

'use server';
/**
 * @fileOverview An AI agent that generates a visual diagram and description for a legal topic.
 *
 * - generateVisualLaw - A function that generates a mindmap/flowchart.
 * - GenerateVisualLawInput - The input type for the function.
 * - GenerateVisualLawOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { marked } from 'marked';


const GenerateVisualLawInputSchema = z.object({
  topic: z.string().describe('The legal topic for which to generate a visual guide.'),
});
export type GenerateVisualLawInput = z.infer<typeof GenerateVisualLawInputSchema>;

const GenerateVisualLawOutputSchema = z.object({
  description: z.string().describe('A detailed markdown description of the mindmap or flowchart.'),
  imageUrl: z.string().describe('A data URI of the generated image of the diagram.'),
});
export type GenerateVisualLawOutput = z.infer<typeof GenerateVisualLawOutputSchema>;

export async function generateVisualLaw(input: GenerateVisualLawInput): Promise<GenerateVisualLawOutput> {
  return generateVisualLawFlow(input);
}

const descriptionPrompt = ai.definePrompt({
    name: 'visualLawDescriptionPrompt',
    input: {schema: GenerateVisualLawInputSchema},
    output: {schema: z.object({ description: z.string() })},
    prompt: `You are an expert legal educator. Your task is to create a clear and structured description for a mindmap or flowchart about the legal topic: "{{topic}}".

The description should be detailed enough for a graphic designer or an AI image generator to create a visual representation from it. Use markdown to structure the content with headings, lists, and connections.

For example, for "How a Bill Becomes an Act", you might describe:
- A central box: "The Bill"
- Arrows leading to: "First Reading in House 1 (Lok Sabha)" -> "Second Reading (Debate & Scrutiny)" -> "Third Reading (Voting)"
- A decision diamond: "Passed?" with Yes/No branches.
- Yes branch leads to "Sent to House 2 (Rajya Sabha)" and repeats the process.
- Final step: "Presidential Assent" -> "Becomes an Act".

Provide a similarly structured description for the topic: "{{topic}}".`
});

const generateVisualLawFlow = ai.defineFlow(
  {
    name: 'generateVisualLawFlow',
    inputSchema: GenerateVisualLawInputSchema,
    outputSchema: GenerateVisualLawOutputSchema,
  },
  async (input) => {
    // Step 1: Generate a structured description of the diagram.
    const { output: descriptionOutput } = await descriptionPrompt(input);
    const description = descriptionOutput?.description || `A mindmap about ${input.topic}`;

    // Step 2: Use the description to generate an image.
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `Generate a very clean, modern, and easy-to-understand diagram, mindmap, or flowchart based on the following description.
        The style should be professional and educational, using clear boxes, arrows, and text. Avoid photographic or realistic styles. Focus on clarity for learning.
        
        Description: ${description}`,
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
    });

    if (!media?.url) {
        throw new Error('Failed to generate image for the visual law guide.');
    }
    
    return {
        description,
        imageUrl: media.url,
    };
  }
);
