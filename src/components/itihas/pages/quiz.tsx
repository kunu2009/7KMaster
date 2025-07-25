
"use client";

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { quizQuestions } from '@/lib/itihas-data';
import type { QuizQuestion } from '@/lib/types';
import { CheckCircle2, XCircle, RotateCw } from 'lucide-react';
import { cn } from "@/lib/utils";

// Shuffle array and pick first N items
const getQuizSet = (count: number): QuizQuestion[] => {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export function ItihasQuiz() {
  const [questions, setQuestions] = useState(() => getQuizSet(5));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isQuizFinished = currentQuestionIndex === questions.length;

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;
    setIsAnswered(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(i => i + 1);
  };
  
  const restartQuiz = () => {
    setQuestions(getQuizSet(5));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
  }

  const getOptionClass = (option: string) => {
    if (!isAnswered) return '';
    if (option === currentQuestion.correctAnswer) return 'text-green-600 dark:text-green-500 font-bold';
    if (option === selectedAnswer) return 'text-red-600 dark:text-red-500 line-through';
    return '';
  };

  if (isQuizFinished) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Quiz Complete!</CardTitle>
                    <CardDescription>You have completed the history quiz.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">Your Score: {score} / {questions.length}</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={restartQuiz} className="w-full">
                        <RotateCw className="mr-2 h-4 w-4" />
                        Play Again
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">History Quiz</h1>
        <p className="text-muted-foreground">Test your knowledge of Indian history.</p>
      </div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Question {currentQuestionIndex + 1}/{questions.length}</CardTitle>
          <CardDescription>{currentQuestion.question}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswer ?? ''}
            onValueChange={setSelectedAnswer}
            disabled={isAnswered}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <Label key={index} htmlFor={`option-${index}`} className={cn("flex items-center gap-3 p-3 rounded-md border cursor-pointer hover:bg-muted/50", getOptionClass(option))}>
                <RadioGroupItem value={option} id={`option-${index}`} />
                <span>{option}</span>
                {isAnswered && option === currentQuestion.correctAnswer && <CheckCircle2 className="ml-auto h-5 w-5 text-green-500" />}
                {isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer && <XCircle className="ml-auto h-5 w-5 text-red-500" />}
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          {!isAnswered ? (
            <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>Submit Answer</Button>
          ) : (
            <Button onClick={handleNextQuestion}>Next Question</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
