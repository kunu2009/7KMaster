
"use client";

import { useState, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { initialHabits, initialHabitLogs } from '@/lib/data';
import type { Habit, HabitLog } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { eachDayOfInterval, format, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus, Sparkles, TrendingUp, Edit, Trash2 } from 'lucide-react';
import { NewHabitDialog } from './new-habit-dialog';
import { EditHabitDialog } from './edit-habit-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import * as Icons from 'lucide-react';


export function HabitTrackerTab() {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', initialHabits);
  const [habitLogs, setHabitLogs] = useLocalStorage<HabitLog>('habitLogs', initialHabitLogs);
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekDays = useMemo(() => eachDayOfInterval({ start: startOfWeek(currentDate, { weekStartsOn: 1 }), end: endOfWeek(currentDate, { weekStartsOn: 1 }) }), [currentDate]);

  const addHabit = (newHabit: Omit<Habit, 'id'>) => {
    setHabits(prev => [...prev, { ...newHabit, id: `${Date.now()}` }]);
  };
  
  const updateHabit = (updatedHabit: Habit) => {
    setHabits(prev => prev.map(h => h.id === updatedHabit.id ? updatedHabit : h));
  };
  
  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(h => h.id !== habitId));
    // Also clean up logs for the deleted habit
    const newLogs = { ...habitLogs };
    delete newLogs[habitId];
    setHabitLogs(newLogs);
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
    const logs = (habitLogs[habitId] || []).map(d => new Date(d)).sort((a, b) => b.getTime() - a.getTime());
    if (logs.length === 0) return 0;
  
    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date
  
    // Check if today or yesterday is the latest log
    const latestLog = new Date(logs[0]);
    latestLog.setHours(0, 0, 0, 0);
  
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((today.getTime() - latestLog.getTime()) / oneDay));
  
    if (diffDays > 1) {
      // Streak is broken if the last log was more than a day ago
      return 0;
    }
  
    let currentDate = latestLog;
    for (const log of logs) {
      const logDate = new Date(log);
      logDate.setHours(0, 0, 0, 0);
  
      const dayDiff = Math.round((currentDate.getTime() - logDate.getTime()) / oneDay);
  
      if (dayDiff === 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (dayDiff > 0) {
        // Break in streak
        break;
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
            <table className="w-full border-collapse min-w-[700px]">
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
                        <th className="p-2 text-center font-semibold text-sm">Actions</th>
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
                             <td className="p-2 text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <EditHabitDialog habit={habit} onUpdateHabit={updateHabit} />
                                     <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will permanently delete the "{habit.name}" habit and all its logs. This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteHabit(habit.id)}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
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
