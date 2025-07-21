"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Play, Pause, RotateCw } from 'lucide-react';

export function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const toggle = () => {
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
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        } else {
          // Timer finished
          if (typeof window.Notification !== 'undefined' && Notification.permission === 'granted') {
            new Notification(isBreak ? 'Break is over!' : 'Time for a break!');
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
  }, [isActive, seconds, minutes, isBreak]);

  useEffect(() => {
    reset();
  }, [isBreak, reset]);
  
  useEffect(() => {
    if (typeof window.Notification !== 'undefined' && Notification.permission === "default") {
        Notification.requestPermission();
    }
  }, []);

  return (
    <Card className="text-center mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
            <Timer className="h-6 w-6" />
            <span>{isBreak ? 'Break Time' : 'Pomodoro Timer'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-6xl font-bold mb-4">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
        <div className="flex justify-center gap-4">
          <Button onClick={toggle} size="lg">
            {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={reset} size="lg" variant="outline">
            <RotateCw className="mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
