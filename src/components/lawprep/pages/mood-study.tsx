
"use client";

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { suggestStudyActivity } from '@/ai/flows/suggest-study-activity';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Wand2, BrainCircuit, Bed, Coffee } from 'lucide-react';
import { marked } from 'marked';

const moods = [
  { label: "Energized", icon: Coffee, prompt: "I'm feeling energized and ready to tackle something challenging." },
  { label: "Bored", icon: Bed, prompt: "I'm feeling bored and need something engaging to study." },
  { label: "Tired", icon: BrainCircuit, prompt: "I'm feeling tired and need a low-effort way to revise." },
];

export function LawMoodStudy() {
  const [suggestion, setSuggestion] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleMoodSelect = (moodPrompt: string) => {
    setSuggestion('');

    startTransition(async () => {
      try {
        const response = await suggestStudyActivity({ mood: moodPrompt });
        if (response && response.suggestion) {
          const html = await marked(response.suggestion);
          setSuggestion(html);
        } else {
          throw new Error("Invalid response from AI.");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Failed to get a study suggestion. Please try again.",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mood-Based Study Suggestions</h1>
        <p className="text-muted-foreground">Tell us how you're feeling, and our AI will suggest the perfect study activity.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>How are you feeling?</CardTitle>
            <CardDescription>Select your current mood to get a personalized suggestion.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {moods.map((mood) => (
                <Button 
                  key={mood.label} 
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => handleMoodSelect(mood.prompt)}
                  disabled={isPending}
                >
                  <mood.icon className="h-6 w-6" />
                  <span>{mood.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/> AI Suggestion</CardTitle>
            <CardDescription>Your personalized study plan will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            {isPending ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span>Brewing a suggestion...</span>
              </div>
            ) : suggestion ? (
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: suggestion }}
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <Wand2 className="mx-auto h-8 w-8 mb-2" />
                <p>Select a mood to begin.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
