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
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className={task.done ? "text-muted-foreground" : ""}>
                    <TableCell className="font-medium w-1/3 sm:w-[150px] pr-2">{task.timeBlock}</TableCell>
                    <TableCell>{task.task}</TableCell>
                    <TableCell className="w-[50px] text-center pl-2">
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
          </div>
        </CardContent>
      </Card>
      <PomodoroTimer />
    </>
  );
}
