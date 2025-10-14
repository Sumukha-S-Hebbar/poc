'use server';
/**
 * @fileOverview Generates personalized follow-up reminders for real estate agents.
 *
 * - generateFollowUpReminders - A function that generates follow-up reminders.
 * - GenerateFollowUpRemindersInput - The input type for the generateFollowUpReminders function.
 * - GenerateFollowUpRemindersOutput - The return type for the generateFollowUpReminders function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFollowUpRemindersInputSchema = z.object({
  agentHistory: z
    .string()
    .describe('The historical data of the real estate agent, including past requests and actions.'),
  requestStatus: z
    .string()
    .describe('The current status of the site requests assigned to the agent.'),
});

export type GenerateFollowUpRemindersInput = z.infer<
  typeof GenerateFollowUpRemindersInputSchema
>;

const GenerateFollowUpRemindersOutputSchema = z.object({
  reminders: z
    .string()
    .describe('Personalized follow-up reminders for the real estate agent.'),
});

export type GenerateFollowUpRemindersOutput = z.infer<
  typeof GenerateFollowUpRemindersOutputSchema
>;

export async function generateFollowUpReminders(
  input: GenerateFollowUpRemindersInput
): Promise<GenerateFollowUpRemindersOutput> {
  return generateFollowUpRemindersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFollowUpRemindersPrompt',
  input: {schema: GenerateFollowUpRemindersInputSchema},
  output: {schema: GenerateFollowUpRemindersOutputSchema},
  prompt: `You are an AI assistant designed to help real estate agents stay organized. Based on the agent's history and the current status of their site requests, generate personalized follow-up reminders.

Agent History: {{{agentHistory}}}
Request Status: {{{requestStatus}}}

Reminders:`,
});

const generateFollowUpRemindersFlow = ai.defineFlow(
  {
    name: 'generateFollowUpRemindersFlow',
    inputSchema: GenerateFollowUpRemindersInputSchema,
    outputSchema: GenerateFollowUpRemindersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
