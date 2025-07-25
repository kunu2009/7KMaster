
'use server';
/**
 * @fileOverview Generates an image for a journal entry.
 *
 * - generateJournalImage - A function that generates an image data URI from a prompt.
 * - GenerateJournalImageInput - The input type for the function.
 * - GenerateJournalImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateJournalImageInputSchema = z.object({
  prompt: z.string().describe('A text description to generate an image from.'),
});
export type GenerateJournalImageInput = z.infer<typeof GenerateJournalImageInputSchema>;

const GenerateJournalImageOutputSchema = z.object({
  imageUrl: z.string().describe('A data URI of the generated image.'),
});
export type GenerateJournalImageOutput = z.infer<typeof GenerateJournalImageOutputSchema>;

export async function generateJournalImage(input: GenerateJournalImageInput): Promise<GenerateJournalImageOutput> {
  return generateJournalImageFlow(input);
}

const generateJournalImageFlow = ai.defineFlow(
  {
    name: 'generateJournalImageFlow',
    inputSchema: GenerateJournalImageInputSchema,
    outputSchema: GenerateJournalImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `Generate a serene and slightly abstract image representing the following concept for a personal journal: "${input.prompt}". The style should be modern, calming, and minimalist.`,
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
    });

    if (!media?.url) {
        throw new Error('Failed to generate image for the journal entry.');
    }
    
    return {
        imageUrl: media.url,
    };
  }
);
