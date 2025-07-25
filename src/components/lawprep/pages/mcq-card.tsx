
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, CheckCircle2, XCircle } from 'lucide-react';
import type { MCQ } from '@/lib/types';
import { cn } from '@/lib/utils';
// Note: This component does not use the ProgressContext as it's part of a separate module now.
// A more advanced integration might share a context.

interface McqCardProps {
  mcq: MCQ;
  questionNumber: number;
}

export function McqCard({ mcq, questionNumber }: McqCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsRevealed(true);
  };

  const getOptionLabelClass = (index: number) => {
    if (!isRevealed) return '';
    if (index === mcq.correctAnswerIndex) return 'text-green-600 dark:text-green-500 font-semibold';
    if (index === selectedOption && index !== mcq.correctAnswerIndex) return 'text-red-600 dark:text-red-500 font-semibold';
    return '';
  };
  
  const alertVariant = isRevealed ? (selectedOption === mcq.correctAnswerIndex ? 'correct' : 'incorrect') : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Question {questionNumber}: <span className="font-normal">{mcq.question}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedOption?.toString()}
          onValueChange={(value) => setSelectedOption(parseInt(value))}
          disabled={isRevealed}
          className="space-y-2"
        >
          {mcq.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`${mcq.id}-option-${index}`} />
              <Label htmlFor={`${mcq.id}-option-${index}`} className={cn("cursor-pointer", getOptionLabelClass(index))}>
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        {!isRevealed && (
          <Button onClick={handleCheckAnswer} disabled={selectedOption === null}>
            Check Answer
          </Button>
        )}

        {alertVariant === 'correct' && (
          <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
            <AlertTitle className="text-green-700 dark:text-green-400">Correct!</AlertTitle>
            <AlertDescription className="text-green-700/80 dark:text-green-400/80">{mcq.explanation}</AlertDescription>
          </Alert>
        )}
        
        {alertVariant === 'incorrect' && (
           <Alert variant="destructive" className="border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-700">
            <XCircle className="h-4 w-4 text-red-600 dark:text-red-500" />
            <AlertTitle className="text-red-700 dark:text-red-400">Incorrect</AlertTitle>
            <AlertDescription className="text-red-700/80 dark:text-red-400/80">
              <span className="font-semibold">Correct answer:</span> {mcq.options[mcq.correctAnswerIndex]}
              <br/>
              {mcq.explanation}
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
