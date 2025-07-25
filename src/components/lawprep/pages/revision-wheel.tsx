
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Disc3, Dices } from 'lucide-react';
import { mcqs, lawFlashcards, revisionTopics } from '@/lib/law-data';
import type { MCQ, LawFlashcard as LawFlashcardType } from '@/lib/types';
import { McqCard } from './mcq-card';
import { LawFlashcard } from '../law-flashcard';


type RevisionItem = (MCQ & { type: 'mcq' }) | (LawFlashcardType & { type: 'flashcard' });

export function LawRevision() {
  const [spunItem, setSpunItem] = useState<RevisionItem | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSpin = () => {
    setIsSpinning(true);
    setSpunItem(null);

    // Pick a random topic
    const topic = revisionTopics[Math.floor(Math.random() * revisionTopics.length)];
    setSelectedTopic(topic);

    // Find all items for that topic
    const topicMcqs = mcqs.filter(mcq => mcq.topic === topic).map(mcq => ({ ...mcq, type: 'mcq' as const }));
    const topicFlashcards = lawFlashcards.filter(fc => fc.topic.includes(topic)).map(fc => ({...fc, type: 'flashcard' as const}));
    const allItems = [...topicMcqs, ...topicFlashcards];

    setTimeout(() => {
      if (allItems.length > 0) {
        const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
        setSpunItem(randomItem);
      } else {
        // Fallback if no items for topic
        const randomMcq = mcqs[Math.floor(Math.random() * mcqs.length)];
        setSpunItem({ ...randomMcq, type: 'mcq' });
      }
      setIsSpinning(false);
    }, 1000); // Simulate spinning duration
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Revision Wheel</h1>
        <p className="text-muted-foreground">
          Spin the wheel for a random question or flashcard to test your knowledge.
        </p>
      </div>
      
      <div className="flex flex-col items-center gap-8">
        <div className="relative flex items-center justify-center">
            <Disc3 className={`h-64 w-64 text-primary/20 ${isSpinning ? 'animate-spin' : ''}`} />
            <Button 
                onClick={handleSpin} 
                disabled={isSpinning}
                className="absolute h-20 w-20 rounded-full text-lg font-bold shadow-lg"
            >
                {isSpinning ? <Dices className="h-8 w-8 animate-spin" /> : 'Spin!'}
            </Button>
        </div>
        
        {selectedTopic && (
          <div className="text-center">
            <p className="text-muted-foreground">The wheel landed on...</p>
            <h2 className="text-2xl font-bold text-primary">{selectedTopic}</h2>
          </div>
        )}

        {spunItem && (
          <div className="w-full max-w-2xl">
            <Card className="animate-in fade-in-50 zoom-in-95">
              <CardContent className="p-4 sm:p-6">
                {spunItem.type === 'mcq' ? (
                  <McqCard mcq={spunItem} questionNumber={1} />
                ) : (
                  <LawFlashcard flashcard={spunItem} />
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
