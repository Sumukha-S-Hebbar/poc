'use server';

/**
 * @fileOverview This file defines a Genkit flow for real estate agents to recommend potential sites for towercos.
 *
 * The flow takes a location and specifications as input, and returns a list of potential sites that can accommodate a tower.
 *
 * @exports recommendPotentialSites - The main function to trigger the flow.
 * @exports RecommendPotentialSitesInput - The input type for the recommendPotentialSites function.
 * @exports RecommendPotentialSitesOutput - The output type for the recommendPotentialSites function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendPotentialSitesInputSchema = z.object({
  location: z.string().describe('The desired location for the tower site.'),
  specifications: z
    .string()
    .describe('The specifications for the tower site, including size and other requirements.'),
  agentHistory: z
    .string()
    .optional()
    .describe('The agent history'),
  requestStatus: z
    .string()
    .optional()
    .describe('Status of the request'),
});
export type RecommendPotentialSitesInput = z.infer<typeof RecommendPotentialSitesInputSchema>;

const RecommendPotentialSitesOutputSchema = z.object({
  sites: z
    .array(z.string())
    .describe('A list of potential sites near the requested location that can accommodate a tower.'),
  followUpReminder: z
    .string()
    .describe('A personalized follow up reminder for the agent based on the status of various requests and the agents history'),
});
export type RecommendPotentialSitesOutput = z.infer<typeof RecommendPotentialSitesOutputSchema>;

export async function recommendPotentialSites(
  input: RecommendPotentialSitesInput
): Promise<RecommendPotentialSitesOutput> {
  return recommendPotentialSitesFlow(input);
}

const recommendPotentialSitesPrompt = ai.definePrompt({
  name: 'recommendPotentialSitesPrompt',
  input: {schema: RecommendPotentialSitesInputSchema},
  output: {schema: RecommendPotentialSitesOutputSchema},
  prompt: `You are an expert real estate agent specializing in finding suitable sites for tower companies (towercos).

  Based on the towerco's requested location and specifications, you will identify potential sites nearby that can accommodate a tower.

  Location: {{{location}}}
  Specifications: {{{specifications}}}
  Agent History: {{{agentHistory}}}
  Request Status: {{{requestStatus}}}

  Provide a list of potential sites and a personalized follow up reminder for the agent. Follow up reminder will remind the agent to follow up on this particular location.
  Sites: 
  Follow Up Reminder: 
  `,
});

const recommendPotentialSitesFlow = ai.defineFlow(
  {
    name: 'recommendPotentialSitesFlow',
    inputSchema: RecommendPotentialSitesInputSchema,
    outputSchema: RecommendPotentialSitesOutputSchema,
  },
  async input => {
    const {output} = await recommendPotentialSitesPrompt(input);
    return output!;
  }
);
