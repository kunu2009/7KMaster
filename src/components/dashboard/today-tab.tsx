"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Loader } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialTodayTasks, initialProjects, initialSkills } from "@/lib/data";
import type { TodayTask, Project, Skill } from "@/lib/types";
import { generateDailyPlan } from "@/ai/flows/generate-daily-plan-flow";
import { PomodoroTimer } from "./pomodoro-timer";

export function TodayTab() {
  const [tasks, setTasks] = useLocalStorage<TodayTask[]>(
    "todayTasks",
    initialTodayTasks
  );
  const [projects] = useLocalStorage<Project[]>("projects", initialProjects);
  const [skills] = useLocalStorage<Skill[]>("skills", initialSkills);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCheckedChange = (taskId: string, checked: boolean) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, done: checked } : task))
    );
  };
  
  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    try {
      const simplifiedProjects = projects.map(p => ({ name: p.name, nextAction: p.nextAction }));
      const simplifiedSkills = skills.map(s => ({ area: s.area, weeklyGoal: s.weeklyGoal }));

      const result = await generateDailyPlan({
        projects: simplifiedProjects,
        skills: simplifiedSkills,
      });

      if (result && result.tasks) {
        setTasks(result.tasks);
      }
    } catch (e) {
      console.error("Failed to generate new plan:", e);
      // You could add a user-facing error toast here
    } finally {
      setIsGenerating(false);
    }
  };

  const { completedTasks, totalTasks, progress, allTasksCompleted, groupedTasks } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.done).length;
    const groups = tasks.reduce((acc, task) => {
      const { timeBlock } = task;
      if (!acc[timeBlock]) {
        acc[timeBlock] = [];
      }
      acc[timeBlock].push(task);
      return acc;
    }, {} as Record<string, TodayTask[]>);

    return {
        completedTasks: completed,
        totalTasks: total,
        progress: total > 0 ? (completed / total) * 100 : 0,
        allTasksCompleted: total > 0 && completed === total,
        groupedTasks: Object.entries(groups)
    }
  }, [tasks]);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
            <div>
              <CardTitle>Today's Plan</CardTitle>
              <CardDescription>
                A checklist for your daily reset, focus blocks, and reviews.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
                {allTasksCompleted && <Badge color="green">All Done! 🎉</Badge>}
                <Button onClick={handleGeneratePlan} disabled={isGenerating} size="sm" variant="outline">
                  {isGenerating ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">Refresh Plan</span>
                  <span className="sm:hidden">Refresh</span>
                </Button>
            </div>
          </div>
           <div className="pt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Daily Progress</span>
                  <span>{completedTasks} / {totalTasks} Tasks</span>
              </div>
              <Progress value={progress} />
           </div>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={groupedTasks.map(([timeBlock]) => timeBlock)} className="w-full">
            {groupedTasks.map(([timeBlock, tasksInGroup]) => (
                <AccordionItem value={timeBlock} key={timeBlock}>
                    <AccordionTrigger className="font-semibold text-base hover:no-underline">
                        {timeBlock}
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pl-1">
                            {tasksInGroup.map(task => (
                                <div key={task.id} className="flex items-center gap-4">
                                    <Checkbox
                                        id={`task-${task.id}`}
                                        checked={task.done}
                                        onCheckedChange={(checked) => handleCheckedChange(task.id, !!checked)}
                                        aria-label={`Mark ${task.task} as done`}
                                        className="h-5 w-5"
                                    />
                                    <label 
                                        htmlFor={`task-${task.id}`} 
                                        className={`flex-1 text-sm ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                        {task.task}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      <PomodoroTimer />
    </>
  );
}
