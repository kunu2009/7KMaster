
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader, Sparkles, MessageSquareQuote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeMood, type MoodMirrorOutput } from '@/ai/flows/mood-mirror-flow';
import { Badge } from '../ui/badge';

export function MoodMirror() {
  const [journalEntry, setJournalEntry] = useState('');
  const [reflection, setReflection] = useState<MoodMirrorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleReflect = async () => {
    if (!journalEntry.trim()) {
        toast({ title: "Please write something first.", variant: "destructive" });
        return;
    }
    setIsLoading(true);
    setReflection(null);
    try {
        const result = await analyzeMood({ journalEntry });
        setReflection(result);
    } catch (error) {
        console.error("Error analyzing mood:", error);
        toast({ title: "Error", description: "Could not get a reflection from the AI.", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Mood Mirror</CardTitle>
        <CardDescription>Describe your day or how you're feeling, and the AI will offer a reflection.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-4">
            <Textarea 
                placeholder="Today was..." 
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                rows={4}
                disabled={isLoading}
            />
             <Button onClick={handleReflect} disabled={isLoading}>
                {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Reflect
            </Button>
        </div>
      </CardContent>
      {reflection && (
        <CardFooter>
            <div className="w-full space-y-4 rounded-lg border bg-muted/50 p-4">
                <div className='flex items-center gap-3'>
                     <h3 className="font-semibold text-lg">Your Reflection:</h3>
                     <Badge style={{ backgroundColor: reflection.color, color: 'white' }} className="text-md">
                        {reflection.mood}
                    </Badge>
                </div>
                <div className="flex items-start gap-3 text-sm">
                    <MessageSquareQuote className="h-5 w-5 mt-1 text-primary shrink-0"/>
                    <p className="text-muted-foreground">{reflection.insight}</p>
                </div>
            </div>
        </CardFooter>
      )}
    </Card>
  );
}
