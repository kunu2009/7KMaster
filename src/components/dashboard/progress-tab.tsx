
"use client"

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Rocket, Trophy, Archive, TrendingUp } from "lucide-react";
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import type { TodayTask } from '@/lib/types';


const weeklyBurnupData = [
  { date: 'Week 1', completed: 5, added: 8 },
  { date: 'Week 2', completed: 7, added: 6 },
  { date: 'Week 3', completed: 10, added: 12 },
  { date: 'Week 4', completed: 8, added: 7 },
];

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  added: {
    label: "Added",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ProgressTab() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<TodayTask[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!user) return;
    
    // Listen to tasks
    const tasksQuery = query(
        collection(db, 'todayTasks'), 
        where('userId', '==', user.uid)
    );
    const unsubTasks = onSnapshot(tasksQuery, (snapshot) => {
        setTasks(snapshot.docs.map(doc => doc.data() as TodayTask));
    });

    // Listen to user metrics for streak
    const metricsDocRef = doc(db, 'userMetrics', user.uid);
    const unsubMetrics = onSnapshot(metricsDocRef, (doc) => {
      if (doc.exists()) {
        setStreak(doc.data().dailyStreak || 0);
      }
    });

    return () => {
      unsubTasks();
      unsubMetrics();
    };

  }, [user]);

  const completedTasks = tasks.filter((task) => task.done);

  const handleExport = async () => {
    if(!user) return;
    try {
        const collectionsToExport = ['projects', 'skills', 'notes', 'todayTasks', 'timeBlocks', 'habits', 'habitLogs', 'selfSpace', 'researchItems'];
        const data: Record<string, any[]> = {};
        
        for (const collectionName of collectionsToExport) {
            const q = query(collection(db, collectionName), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            data[collectionName] = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        }
      
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(data, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = `7k-life-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    } catch (error) {
      console.error("Failed to export data", error);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
       <div className="lg:col-span-2 grid gap-6 md:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Daily Task Streak</CardTitle>
                <Rocket className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{streak} Days</div>
                <p className="text-xs text-muted-foreground">Keep it up! Complete a task to maintain.</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed Tasks Today</CardTitle>
                <Trophy className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{completedTasks.length}</div>
                <p className="text-xs text-muted-foreground">Total from current daily plan</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Weekly Burn-up</CardTitle>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+3 Tasks</div>
                <p className="text-xs text-muted-foreground">More tasks completed than added this week.</p>
            </CardContent>
        </Card>
      </div>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Weekly Burn-up Chart</CardTitle>
          <CardDescription>Mock data showing tasks added vs. completed.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={weeklyBurnupData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
               <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
              <Bar dataKey="added" fill="var(--color-added)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
       <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Data &amp; Backups</CardTitle>
          <CardDescription>Manage your application data.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border p-4 flex-wrap gap-4">
                <div>
                    <h3 className="font-medium">Export Progress</h3>
                    <p className="text-sm text-muted-foreground">Download all your data as a JSON file.</p>
                </div>
                <Button onClick={handleExport} size="sm" disabled={!user}>
                    <Download className="mr-2 h-4 w-4" /> Export
                </Button>
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4 flex-wrap gap-4">
                <div>
                    <h3 className="font-medium">Completed Task Archive</h3>
                    <p className="text-sm text-muted-foreground">View all your completed tasks.</p>
                </div>
                <Button size="sm" variant="outline" disabled>
                    <Archive className="mr-2 h-4 w-4" /> View Archive
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
