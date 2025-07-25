
"use client";

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateVisualLaw } from '@/ai/flows/generate-visual-law';
import { useToast } from '@/hooks/use-toast';
import { revisionTopics } from '@/lib/law-data';
import { Loader2, Projector, Wand2 } from 'lucide-react';
import { marked } from 'marked';

interface GeneratedVisual {
  description: string;
  imageUrl: string;
}

export function LawVisual() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [generatedVisual, setGeneratedVisual] = useState<GeneratedVisual | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!selectedTopic) {
      toast({
        variant: 'destructive',
        title: 'Please select a topic first.',
      });
      return;
    }

    setGeneratedVisual(null);
    startTransition(async () => {
      try {
        const response = await generateVisualLaw({ topic: selectedTopic });
        if (response && response.imageUrl && response.description) {
          const htmlDescription = await marked(response.description);
          setGeneratedVisual({ ...response, description: htmlDescription });
        } else {
          throw new Error('Invalid response from AI.');
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: 'Failed to generate visual guide. Please try again.',
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Visual Law Generator</h1>
        <p className="text-muted-foreground">
          Select a topic and let our AI generate a mindmap or flowchart to help you learn.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Select a Topic</CardTitle>
            <CardDescription>Choose a legal concept to visualize.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={setSelectedTopic} value={selectedTopic}>
              <SelectTrigger>
                <SelectValue placeholder="Select a topic..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {revisionTopics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerate} disabled={isPending || !selectedTopic}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate Visual
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col min-h-[400px]">
          <CardHeader>
            <CardTitle>Generated Guide</CardTitle>
            <CardDescription>Your AI-generated diagram will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
            {isPending ? (
              <div className="text-center text-muted-foreground">
                <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                <p className="mt-2">Generating your visual guide...</p>
              </div>
            ) : generatedVisual ? (
              <div className="space-y-4 w-full">
                <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                    <Image
                        src={generatedVisual.imageUrl}
                        alt={`AI generated diagram for ${selectedTopic}`}
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none p-4 border rounded-lg bg-muted/50">
                    <h3 className="text-lg font-semibold">Diagram Description</h3>
                    <div dangerouslySetInnerHTML={{ __html: generatedVisual.description }} />
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Projector className="mx-auto h-12 w-12" />
                <p className="mt-2">Select a topic and click generate to begin.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
