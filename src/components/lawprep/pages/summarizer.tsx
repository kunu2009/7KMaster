
"use client";

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { summarizeLegalText } from '@/ai/flows/summarize-legal-text';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, X } from 'lucide-react';

export function LawSummarizer() {
  const [legalText, setLegalText] = useState('');
  const [summary, setSummary] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!legalText.trim()) return;

    setSummary('');

    startTransition(async () => {
      try {
        const response = await summarizeLegalText({ legalText });
        if (response && response.summary) {
          setSummary(response.summary);
        } else {
          throw new Error("Invalid response from summarizer.");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Failed to summarize the text. Please try again.",
        });
      }
    });
  };

  const handleClear = () => {
    setLegalText('');
    setSummary('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Legal Text Summarizer</h1>
        <p className="text-muted-foreground">Paste any legal text to get a concise summary from our AI.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Text</CardTitle>
            <CardDescription>Enter the legal document you want to summarize.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Textarea
                value={legalText}
                onChange={(e) => setLegalText(e.target.value)}
                placeholder="Paste your legal text here..."
                className="min-h-[300px] flex-1"
                disabled={isPending}
                required
              />
              <div className="flex flex-wrap gap-2">
                <Button type="submit" disabled={isPending || !legalText.trim()}>
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Summarize Text
                </Button>
                <Button type="button" variant="outline" onClick={handleClear} disabled={isPending}>
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>AI Summary</CardTitle>
            <CardDescription>This is the AI-generated summary of your text.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            {isPending && !summary && (
              <div className="flex flex-1 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
            {summary && (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {summary}
              </div>
            )}
            {!isPending && !summary && (
              <div className="flex flex-1 items-center justify-center text-center text-muted-foreground">
                <p>Your summary will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
