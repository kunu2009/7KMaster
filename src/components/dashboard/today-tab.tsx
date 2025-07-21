"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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


  const allTasksCompleted = tasks.every(task => task.done);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Today's Plan</CardTitle>
              <CardDescription>
                A checklist for your daily reset, focus blocks, and reviews.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
                {allTasksCompleted && <Badge color="green">All Done! 🎉</Badge>}
                <Button onClick={handleGeneratePlan} disabled={isGenerating} size="sm" variant="outline">
                  {isGenerating ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  Refresh Plan
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Time Block</TableHead>
                <TableHead>Task</TableHead>
                <TableHead className="w-[80px] text-center">Done ✔️</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className={task.done ? "text-muted-foreground" : ""}>
                  <TableCell className="font-medium">{task.timeBlock}</TableCell>
                  <TableCell>{task.task}</TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.done}
                      onCheckedChange={(checked) => handleCheckedChange(task.id, !!checked)}
                      aria-label={`Mark ${task.task} as done`}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <PomodoroTimer />
    </>
  );
}
