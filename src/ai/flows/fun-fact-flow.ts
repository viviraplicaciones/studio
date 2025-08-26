
'use server';

/**
 * @fileOverview A Genkit flow to generate fun facts about chemical elements.
 *
 * - generateFunFact - A function that generates a fun fact for a given element.
 * - FunFactInput - The input type for the generateFunFact function.
 * - FunFactOutput - The return type for the generateFunFact function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { Language } from '@/lib/types';

const languageMap: Record<Language, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  pt: 'Portuguese',
  ja: 'Japanese',
};

const FunFactInputSchema = z.object({
  elementName: z.string().describe('The name of the chemical element.'),
  elementSymbol: z.string().describe('The symbol of the chemical element.'),
  elementSummary: z.string().describe('A brief summary of the chemical element.'),
  language: z.nativeEnum(languageMap).describe('The language for the response.'),
});
export type FunFactInput = z.infer<typeof FunFactInputSchema>;

const FunFactOutputSchema = z.object({
  fact: z.string().describe('An interesting, little-known, or surprising fact about the element.'),
});
export type FunFactOutput = z.infer<typeof FunFactOutputSchema>;

export async function generateFunFact(input: FunFactInput): Promise<FunFactOutput> {
  return funFactFlow(input);
}

const prompt = ai.definePrompt({
  name: 'funFactPrompt',
  input: { schema: FunFactInputSchema },
  output: { schema: FunFactOutputSchema },
  prompt: `You are a chemistry expert and a great science communicator.
Generate a surprising, interesting, or little-known fun fact about the chemical element provided.
The fact should be concise and easy to understand for a general audience.
Respond in the following language: {{{language}}}.

Element Information:
Name: {{{elementName}}} ({{{elementSymbol}}})
Summary: {{{elementSummary}}}
`,
});

const funFactFlow = ai.defineFlow(
  {
    name: 'funFactFlow',
    inputSchema: FunFactInputSchema,
    outputSchema: FunFactOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
