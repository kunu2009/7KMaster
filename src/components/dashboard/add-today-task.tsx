
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import type { TodayTask, TimeBlock } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialTimeBlocks } from "@/lib/data";

interface AddTodayTaskProps {
    onAddTask: (task: TodayTask) => void;
}

export function AddTodayTask({ onAddTask }: AddTodayTaskProps) {
  const [task, setTask] = useState("");
  const [timeBlock, setTimeBlock] = useState("");
  const [timeBlocks] = useLocalStorage<TimeBlock[]>("timeBlocks", initialTimeBlocks);
  const { toast } = useToast();

  const handleAddTask = () => {
    if (!task.trim() || !timeBlock) {
        toast({
            title: "Missing Information",
            description: "Please enter a task and select a time block.",
            variant: "destructive",
        });
      return;
    }

    const newTask: TodayTask = {
      id: `${Date.now()}`,
      task: task.trim(),
      timeBlock,
      done: false,
    };

    onAddTask(newTask);
    setTask("");
    setTimeBlock("");
    toast({
        title: "Task Added!",
        description: `"${newTask.task}" has been added to your plan.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a Task</CardTitle>
        <CardDescription>
          Quickly add a new task to your daily plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="task-description">Task</Label>
            <Input 
                id="task-description"
                placeholder="e.g., Finish the presentation slides"
                value={task}
                onChange={(e) => setTask(e.target.value)} 
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="time-block">Time Block</Label>
             <Select onValueChange={setTimeBlock} value={timeBlock}>
                <SelectTrigger id="time-block">
                    <SelectValue placeholder="Select a time block..." />
                </SelectTrigger>
                <SelectContent>
                    {timeBlocks.map(block => (
                         <SelectItem key={block.id} value={block.name}>{block.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddTask} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add to Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
