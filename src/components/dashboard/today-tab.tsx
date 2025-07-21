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
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialTodayTasks } from "@/lib/data";
import type { TodayTask } from "@/lib/types";

export function TodayTab() {
  const [tasks, setTasks] = useLocalStorage<TodayTask[]>(
    "todayTasks",
    initialTodayTasks
  );

  const handleCheckedChange = (taskId: string, checked: boolean) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, done: checked } : task))
    );
  };

  const allTasksCompleted = tasks.every(task => task.done);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Today's Plan</CardTitle>
            <CardDescription>
              A checklist for your daily reset, focus blocks, and reviews.
            </CardDescription>
          </div>
          {allTasksCompleted && <Badge color="green">All Done! 🎉</Badge>}
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
        <p className="text-xs text-muted-foreground mt-4 italic text-center">⏳ You could add a Pomodoro Timer here.</p>
      </CardContent>
    </Card>
  );
}
