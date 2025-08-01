
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Play, Pause, RotateCw, Target } from 'lucide-react';
import type { AggregatedTodo } from '@/lib/types';

interface PomodoroTimerProps {
    focusedTask: AggregatedTodo | null;
    onPomodoroComplete: (task: AggregatedTodo) => void;
}

export function PomodoroTimer({ focusedTask, onPomodoroComplete }: PomodoroTimerProps) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const toggle = () => {
    if (!focusedTask) return;
    setIsActive(!isActive);
  };

  const reset = useCallback(() => {
    setIsActive(false);
    if (isBreak) {
      setMinutes(5);
      setSeconds(0);
    } else {
      setMinutes(25);
      setSeconds(0);
    }
  }, [isBreak]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && focusedTask) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        } else {
          // Timer finished
          if (typeof window.Notification !== 'undefined' && Notification.permission === 'granted') {
            new Notification(isBreak ? 'Break is over! Time to focus again.' : 'Pomodoro session complete! Time for a break.');
          }
          if (!isBreak) {
              onPomodoroComplete(focusedTask);
          }
          setIsBreak(!isBreak);
          setIsActive(false);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, minutes, isBreak, focusedTask, onPomodoroComplete]);

  useEffect(() => {
    reset();
  }, [isBreak, reset]);
  
  useEffect(() => {
    if (typeof window.Notification !== 'undefined' && Notification.permission === "default") {
        Notification.requestPermission();
    }
  }, []);

  return (
    <Card className="text-center flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
            <Timer className="h-6 w-6" />
            <span>{isBreak ? 'Break Time' : 'Pomodoro Timer'}</span>
        </CardTitle>
        <CardDescription>
            {focusedTask ? `Focusing on your selected task.` : `Select a task to begin a focus session.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center">
        <div className="text-4xl sm:text-6xl font-bold mb-4" style={{ color: 'hsl(var(--primary))'}}>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button onClick={toggle} size="lg" disabled={!focusedTask}>
            {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={reset} size="lg" variant="outline">
            <RotateCw className="mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
       <CardFooter className="flex-col gap-2 text-center p-4 border-t">
          {focusedTask ? (
            <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-4 w-4 text-primary"/>
                    <span className="font-semibold">Focused Task:</span>
                </div>
                <p className="text-sm px-4 text-center">{focusedTask.text}</p>
            </>
          ) : (
             <p className="text-sm text-muted-foreground">No task selected for focus.</p>
          )}
       </CardFooter>
    </Card>
  );
}
