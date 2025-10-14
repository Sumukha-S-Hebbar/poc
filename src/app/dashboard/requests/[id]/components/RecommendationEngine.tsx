'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { recommendPotentialSites } from '@/ai/flows/recommend-potential-sites';
import type { RecommendPotentialSitesOutput } from '@/ai/flows/recommend-potential-sites';
import type { SiteRequest } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell, Bot, CheckCircle, List, Loader2, MapPin, Terminal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  additionalNotes: z.string().optional(),
});

interface RecommendationEngineProps {
  request: SiteRequest;
}

export function RecommendationEngine({ request }: RecommendationEngineProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RecommendPotentialSitesOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);

    const fullSpecifications = `${request.specifications}\n\nAgent Notes: ${values.additionalNotes || 'None'}`;

    try {
      const response = await recommendPotentialSites({
        location: request.location,
        specifications: fullSpecifications,
        agentHistory: 'Agent has successfully closed 3 deals in the last quarter.',
        requestStatus: request.status,
      });
      setResult(response);
      toast({
        title: 'Recommendations Generated',
        description: 'AI has found potential sites for this request.',
        variant: 'default',
      });
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        title: 'Error Generating Recommendations',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center">
            <Bot className="mr-2 h-6 w-6" />
            AI Site Recommender
        </CardTitle>
        <CardDescription>Generate potential sites and follow-up actions using AI.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes for AI</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Prioritize sites with easy road access."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Recommendations'
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          {loading && (
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-8 w-1/4 mt-4" />
                <Skeleton className="h-4 w-full" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {result && (
            <div className="space-y-6 animate-in fade-in-50">
              <div>
                <h3 className="font-semibold flex items-center mb-3">
                  <List className="mr-2 h-5 w-5 text-primary" />
                  Recommended Sites
                </h3>
                <ul className="space-y-3 list-disc pl-5 text-sm">
                  {result.sites.map((site, index) => (
                    <li key={index} className="text-muted-foreground"><span className="font-medium text-foreground">{site}</span></li>
                  ))}
                </ul>
              </div>
              <Alert className="bg-accent/30">
                <Bell className="h-4 w-4" />
                <AlertTitle className="font-semibold flex items-center">
                    AI-Generated Follow-Up
                </AlertTitle>
                <AlertDescription className="mt-2">
                  {result.followUpReminder}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
