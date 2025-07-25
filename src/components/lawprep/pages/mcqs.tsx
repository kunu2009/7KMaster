
"use client";

import { useState, useEffect, useCallback } from 'react';
import { McqCard } from './mcq-card';
import { mcqs } from '@/lib/law-data';
import type { MCQ } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { format } from 'date-fns';

// More efficient shuffle algorithm (Fisher-Yates)
const shuffleMcqs = (array: MCQ[]): MCQ[] => {
  const newArray = [...array];
  let currentIndex = newArray.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }

  return newArray;
}

const getTodaysMcqs = (): MCQ[] => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const storageKey = `lawPrepDailyMCQ_${today}`;

  try {
    const storedMcqIdsJson = localStorage.getItem(storageKey);
    if (storedMcqIdsJson) {
      const storedMcqIds = JSON.parse(storedMcqIdsJson);
      if (Array.isArray(storedMcqIds) && storedMcqIds.length > 0) {
        const todaysMcqs = storedMcqIds.map((id: string) => mcqs.find(mcq => mcq.id === id)).filter((mcq): mcq is MCQ => !!mcq);
        if (todaysMcqs.length === 10) {
          return todaysMcqs;
        }
      }
    }
  } catch (error) {
    console.error("Failed to read from localStorage", error);
  }
  
  // If not found or invalid, generate new ones
  const shuffled = shuffleMcqs(mcqs);
  const newDailyMcqs = shuffled.slice(0, 10);
  
  try {
    localStorage.setItem(storageKey, JSON.stringify(newDailyMcqs.map(mcq => mcq.id)));
  } catch (error) {
    console.error("Failed to write to localStorage", error);
  }
  
  return newDailyMcqs;
};

export function LawMCQs() {
  const [dailyMcqs, setDailyMcqs] = useState<MCQ[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setDailyMcqs(getTodaysMcqs());
  }, []);

  const refreshMcqs = useCallback(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const storageKey = `lawPrepDailyMCQ_${today}`;
    try {
      localStorage.removeItem(storageKey); 
    } catch (error) {
      console.error("Failed to remove item from localStorage", error);
    }
    setDailyMcqs(getTodaysMcqs());
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Daily MCQs</h1>
          <p className="text-muted-foreground">Your daily set of 10 questions. A new set appears each day.</p>
        </div>
        <Button onClick={refreshMcqs} variant="outline" disabled={!isClient}>
          <RotateCw className="mr-2 h-4 w-4" />
          Get a New Set
        </Button>
      </div>

      {!isClient ? (
         <p className="text-muted-foreground">Loading questions...</p>
      ) : dailyMcqs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {dailyMcqs.map((mcq, index) => (
            <McqCard key={mcq.id} mcq={mcq} questionNumber={index + 1} />
          ))}
        </div>
      ) : (
         <p className="text-muted-foreground">No questions available.</p>
      )}
    </div>
  );
}
