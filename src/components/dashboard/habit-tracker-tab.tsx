
"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Habit, HabitLog } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { eachDayOfInterval, format, isSameDay, startOfWeek, endOfWeek, differenceInCalendarDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Edit, Trash2, Loader2 } from 'lucide-react';
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
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc, writeBatch, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { initialHabits, initialHabitLogs } from '@/lib/data';


export function HabitTrackerTab() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Local state for guests
  const [localHabits, setLocalHabits] = useLocalStorage<Habit[]>(`habits_guest`, initialHabits);
  const [localHabitLogs, setLocalHabitLogs] = useLocalStorage<Record<string, string[]>>(`habitLogs_guest`, initialHabitLogs);

  // Firestore state for logged-in users
  const [firestoreHabits, setFirestoreHabits] = useState<Habit[]>([]);
  const [firestoreHabitLogs, setFirestoreHabitLogs] = useState<Record<string, string[]>>({});
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  const habits = user ? firestoreHabits : localHabits;
  const habitLogs = user ? firestoreHabitLogs : localHabitLogs;
  const setHabits = user ? setFirestoreHabits : setLocalHabits;
  const setHabitLogs = user ? setFirestoreHabitLogs : setLocalHabitLogs;


  const weekDays = useMemo(() => eachDayOfInterval({ start: startOfWeek(currentDate, { weekStartsOn: 1 }), end: endOfWeek(currentDate, { weekStartsOn: 1 }) }), [currentDate]);

  useEffect(() => {
    if (!user) {
        setIsLoading(false);
        return;
    }
    
    setIsLoading(true);
    const habitsQuery = query(collection(db, "habits"), where("userId", "==", user.uid));
    const logsQuery = query(collection(db, "habitLogs"), where("userId", "==", user.uid));

    const unsubHabits = onSnapshot(habitsQuery, (snapshot) => {
        const userHabits = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Habit));
        setFirestoreHabits(userHabits);
        if(isLoading) setIsLoading(false);
    }, () => setIsLoading(false));

    const unsubLogs = onSnapshot(logsQuery, (snapshot) => {
        const userLogs: Record<string, string[]> = {};
        snapshot.forEach(doc => {
            const data = doc.data() as HabitLog;
            userLogs[data.habitId] = data.dates;
        });
        setFirestoreHabitLogs(userLogs);
    });

    return () => {
        unsubHabits();
        unsubLogs();
    };
  }, [user]);

  const addHabit = async (newHabit: Omit<Habit, 'id' | 'userId'>) => {
    if (!user) {
      const habitWithId = { ...newHabit, id: `${Date.now()}` };
      setLocalHabits(prev => [...prev, habitWithId]);
      toast({ title: "Habit Added (Guest Mode)"});
      return;
    }
    try {
        const habitDoc = await addDoc(collection(db, 'habits'), { ...newHabit, userId: user.uid });
        // Create an empty log document for the new habit
        await addDoc(collection(db, 'habitLogs'), { habitId: habitDoc.id, userId: user.uid, dates: [] });
        toast({ title: "Habit Added", description: `"${newHabit.name}" has been added.`});
    } catch(e) {
        console.error(e);
        toast({ title: "Error", description: "Could not add habit.", variant: "destructive" });
    }
  };
  
  const updateHabit = async (updatedHabit: Habit) => {
    if (!user) {
      setHabits(prev => prev.map(h => h.id === updatedHabit.id ? updatedHabit : h));
      toast({ title: "Habit Updated (Guest Mode)"});
      return;
    }
    const { id, ...habitData } = updatedHabit;
    try {
        await updateDoc(doc(db, 'habits', id), habitData);
        toast({ title: "Habit Updated", description: `"${habitData.name}" has been updated.`});
    } catch(e) {
        console.error(e);
        toast({ title: "Error", description: "Could not update habit.", variant: "destructive" });
    }
  };
  
  const deleteHabit = async (habitId: string) => {
    if (!user) {
       setHabits(prev => prev.filter(h => h.id !== habitId));
       setHabitLogs(prev => {
           const newLogs = {...prev};
           delete newLogs[habitId];
           return newLogs;
       });
       toast({ title: "Habit Deleted (Guest Mode)"});
       return;
    }
    try {
        const batch = writeBatch(db);
        batch.delete(doc(db, 'habits', habitId));
        
        const logsQuery = query(collection(db, 'habitLogs'), where('habitId', '==', habitId), where('userId', '==', user.uid));
        const logDocs = await getDocs(logsQuery);
        logDocs.forEach(logDoc => batch.delete(logDoc.ref));
        
        await batch.commit();

        toast({ title: "Habit Deleted", description: "The habit and all its logs have been removed." });
    } catch (e) {
        console.error(e);
        toast({ title: "Error", description: "Could not delete habit.", variant: "destructive" });
    }
  };

  const toggleHabit = async (habitId: string, date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const logs = habitLogs[habitId] || [];
    const newLogs = logs.includes(dateString)
      ? logs.filter(d => d !== dateString)
      : [...logs, dateString];

    if (!user) {
        setHabitLogs(prev => ({...prev, [habitId]: newLogs }));
        return;
    }
    
    try {
        const logsQuery = query(collection(db, 'habitLogs'), where('habitId', '==', habitId), where('userId', '==', user.uid));
        const logDocs = await getDocs(logsQuery);
        if (logDocs.empty) {
            await addDoc(collection(db, 'habitLogs'), { habitId, userId: user.uid, dates: newLogs });
        } else {
            const logDocRef = logDocs.docs[0].ref;
            await updateDoc(logDocRef, { dates: newLogs });
        }
    } catch (e) {
        console.error(e);
        toast({ title: "Error", description: "Could not update habit log.", variant: "destructive" });
    }
  };
  
  const getStreak = (habitId: string): number => {
    const logs = (habitLogs[habitId] || []).map(d => new Date(d)).sort((a, b) => b.getTime() - a.getTime());
    if (logs.length === 0) return 0;
  
    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const latestLog = new Date(logs[0]);
    latestLog.setHours(0, 0, 0, 0);
  
    const diffDays = differenceInCalendarDays(today, latestLog);
  
    if (diffDays > 1) {
      return 0;
    }
  
    let currentDate = today;
    if(diffDays === 0) { // Logged today
        streak = 1;
        currentDate = new Date(today.setDate(today.getDate() - 1));
    } else { // Logged yesterday
        streak = 1;
        currentDate = new Date(today.setDate(today.getDate() - 2));
    }


    for (let i = 1; i < logs.length; i++) {
      if (isSameDay(logs[i], currentDate)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
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
    if (!habit || habit.goal === 0) return 0;
    
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
        {isLoading && user ? (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        ) : (
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
        )}
        {habits.length === 0 && (!isLoading || !user) && (
            <div className="text-center py-12 text-muted-foreground">
                <p>No habits added yet. Click "New Habit" to start tracking.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
