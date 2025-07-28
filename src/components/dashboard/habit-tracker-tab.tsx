
"use client";

import { useState, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { initialHabits, initialHabitLogs } from '@/lib/data';
import type { Habit, HabitLog } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { eachDayOfInterval, format, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { NewHabitDialog } from './new-habit-dialog';
import * as Icons from 'lucide-react';


export function HabitTrackerTab() {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', initialHabits);
  const [habitLogs, setHabitLogs] = useLocalStorage<HabitLog>('habitLogs', initialHabitLogs);
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekDays = useMemo(() => eachDayOfInterval({ start: startOfWeek(currentDate, { weekStartsOn: 1 }), end: endOfWeek(currentDate, { weekStartsOn: 1 }) }), [currentDate]);

  const addHabit = (newHabit: Omit<Habit, 'id'>) => {
    setHabits(prev => [...prev, { ...newHabit, id: `${Date.now()}` }]);
  };

  const toggleHabit = (habitId: string, date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const newLogs = { ...habitLogs };
    if (!newLogs[habitId]) {
      newLogs[habitId] = [];
    }

    const logIndex = newLogs[habitId].findIndex(d => d === dateString);

    if (logIndex > -1) {
      newLogs[habitId].splice(logIndex, 1);
    } else {
      newLogs[habitId].push(dateString);
    }
    setHabitLogs(newLogs);
  };
  
  const getStreak = (habitId: string): number => {
    const logs = habitLogs[habitId] || [];
    if (logs.length === 0) return 0;
    
    let streak = 0;
    let today = new Date();

    const sortedLogs = logs.map(d => new Date(d)).sort((a,b) => b.getTime() - a.getTime());

    // Check if today is completed
    if (sortedLogs.some(d => isSameDay(d, today))) {
        streak++;
    } else {
        // if not completed today, check if yesterday was completed
        today.setDate(today.getDate() - 1);
        if(!sortedLogs.some(d => isSameDay(d, today))) {
            return 0; // Streak is broken if yesterday wasn't completed
        }
        streak++;
    }

    // Continue checking for consecutive days
    for (let i = 1; i < sortedLogs.length; i++) {
        const expectedDate = new Date(today);
        expectedDate.setDate(expectedDate.getDate() - 1);
        
        const actualDate = sortedLogs.find(d => isSameDay(d, expectedDate));

        if (actualDate) {
            streak++;
            today = actualDate;
        } else {
            break; // Streak broken
        }
    }
    return streak;
  };

  const getWeeklyProgress = (habitId: string) => {
    const logs = habitLogs[habitId] || [];
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

    const completions = logs.filter(d => {
        const logDate = new Date(d);
        return logDate >= weekStart && logDate <= weekEnd;
    }).length;

    const habit = habits.find(h => h.id === habitId);
    if (!habit) return 0;
    
    return Math.round((completions / habit.goal) * 100);
  };

  const changeWeek = (direction: 'prev' | 'next') => {
      const newDate = new Date(currentDate);
      const amount = direction === 'prev' ? -7 : 7;
      newDate.setDate(newDate.getDate() + amount);
      setCurrentDate(newDate);
  }
  
  const LucideIcon = ({ name }: { name: string }) => {
    const Icon = (Icons as any)[name];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
                <CardTitle>Habit Tracker</CardTitle>
                <CardDescription>Monitor your daily habits and streaks.</CardDescription>
            </div>
             <NewHabitDialog onAddHabit={addHabit} />
        </div>
        <div className="flex items-center justify-center gap-4 pt-4">
            <Button variant="ghost" size="icon" onClick={() => changeWeek('prev')}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-center w-48">
                {format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'MMM d')} - {format(endOfWeek(currentDate, { weekStartsOn: 1 }), 'MMM d, yyyy')}
            </span>
            <Button variant="ghost" size="icon" onClick={() => changeWeek('next')}>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
                <thead>
                    <tr className="bg-muted/50">
                        <th className="p-2 text-left font-semibold text-sm w-1/3 sm:w-1/4">Habit</th>
                        {weekDays.map(day => (
                            <th key={day.toISOString()} className="p-2 text-center font-semibold text-sm">
                                <div className="flex flex-col items-center">
                                    <span>{format(day, 'E')}</span>
                                    <span className="text-xs text-muted-foreground">{format(day, 'd')}</span>
                                </div>
                            </th>
                        ))}
                        <th className="p-2 text-center font-semibold text-sm">Streak</th>
                        <th className="p-2 text-center font-semibold text-sm">Weekly</th>
                    </tr>
                </thead>
                <tbody>
                    {habits.map(habit => (
                        <tr key={habit.id} className="border-b">
                            <td className="p-2 font-medium flex items-center gap-2">
                                <LucideIcon name={habit.icon} />
                                {habit.name}
                            </td>
                            {weekDays.map(day => (
                                <td key={day.toISOString()} className="p-2 text-center">
                                    <Checkbox
                                        checked={(habitLogs[habit.id] || []).some(d => isSameDay(new Date(d), day))}
                                        onCheckedChange={() => toggleHabit(habit.id, day)}
                                        className="h-5 w-5"
                                        aria-label={`Mark ${habit.name} for ${format(day, 'PPPP')}`}
                                    />
                                </td>
                            ))}
                            <td className="p-2 text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <Sparkles className="h-4 w-4 text-amber-500"/>
                                    <span>{getStreak(habit.id)}</span>
                                </div>
                            </td>
                            <td className="p-2 text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <TrendingUp className="h-4 w-4 text-green-500"/>
                                    <span>{getWeeklyProgress(habit.id)}%</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {habits.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
                <p>No habits added yet. Click "New Habit" to start tracking.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
