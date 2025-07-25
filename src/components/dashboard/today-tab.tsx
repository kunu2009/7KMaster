
"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader, Wand2 } from 'lucide-react';
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  initialTodayTasks,
  initialProjects,
  initialSkills,
} from "@/lib/data";
import type { TodayTask, Project, Skill } from "@/lib/types";
import { generateDailyPlan } from "@/ai/flows/generate-daily-plan-flow";
import { generateBlockTasks } from "@/ai/flows/generate-block-tasks-flow";
import { useToast } from "@/hooks/use-toast";


// Group tasks by time block
const groupTasks = (tasks: TodayTask[]) => {
    return tasks.reduce((acc, task) => {
        const block = task.timeBlock;
        if (!acc[block]) {
            acc[block] = [];
        }
        acc[block].push(task);
        return acc;
    }, {} as Record<string, TodayTask[]>);
};

export function TodayTab() {
  const [tasks, setTasks] = useLocalStorage<TodayTask[]>("todayTasks", initialTodayTasks);
  const [projects] = useLocalStorage<Project[]>("projects", initialProjects);
  const [skills] = useLocalStorage<Skill[]>("skills", initialSkills);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generatingBlock, setGeneratingBlock] = useState<string | null>(null);
  const { toast } = useToast();

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };
  
  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const result = await generateDailyPlan({ 
        projects: projects.map(({ name, nextAction }) => ({ name, nextAction })),
        skills: skills.map(({ area, weeklyGoal }) => ({ area, weeklyGoal })),
      });
      if (result.tasks) {
        setTasks(result.tasks);
        toast({ title: 'Plan Generated!', description: 'Your daily plan has been created.' });
      }
    } catch (error) {
      console.error("Error generating daily plan:", error);
      toast({ title: 'Error', description: 'Could not generate plan from AI.', variant: 'destructive' });
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleGenerateBlockTasks = async (blockTitle: string) => {
    setGeneratingBlock(blockTitle);
    try {
        const existingTasks = tasks.filter(t => t.timeBlock === blockTitle).map(t => t.task);
        const result = await generateBlockTasks({
            blockTitle,
            existingTasks,
            projects: projects.map(({ name, nextAction }) => ({ name, nextAction })),
            skills: skills.map(({ area, weeklyGoal }) => ({ area, weeklyGoal })),
        });

        if (result.tasks && result.tasks.length > 0) {
            const newTasks: TodayTask[] = result.tasks.map(taskText => ({
                id: `${Date.now()}-${Math.random()}`,
                timeBlock: blockTitle,
                task: taskText,
                done: false
            }));
            setTasks(prev => [...prev, ...newTasks]);
            toast({ title: 'Tasks Added!', description: `${result.tasks.length} new tasks suggested for ${blockTitle}`});
        } else {
            toast({ title: 'No new tasks', description: 'The AI couldn\'t think of any new tasks for this block.'});
        }
    } catch (error) {
        console.error("Error generating block tasks:", error);
        toast({ title: 'Error', description: 'Could not generate tasks for this block.', variant: 'destructive' });
    } finally {
        setGeneratingBlock(null);
    }
  };


  const grouped = useMemo(() => groupTasks(tasks), [tasks]);
  const sortedBlocks = useMemo(() => Object.keys(grouped).sort((a, b) => a.localeCompare(b)), [grouped]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Today's Plan</CardTitle>
              <CardDescription>
                Your schedule for today. Check off items as you complete them.
              </CardDescription>
            </div>
            {tasks.length === 0 && (
                <Button onClick={handleGeneratePlan} disabled={isGeneratingPlan}>
                    {isGeneratingPlan ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    AI Generate Plan
                </Button>
            )}
        </div>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <div className="space-y-6">
            {sortedBlocks.map((block) => (
              <div key={block}>
                <div className="flex justify-between items-center mb-2 border-b pb-1">
                    <h3 className="font-semibold text-lg text-primary">{block}</h3>
                     <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleGenerateBlockTasks(block)} 
                        disabled={generatingBlock === block}
                        className="text-muted-foreground"
                    >
                       {generatingBlock === block ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                        Suggest Tasks
                    </Button>
                </div>
                <div className="space-y-2">
                  {grouped[block].map((task) => (
                    <div key={task.id} className="flex items-center gap-3">
                      <Checkbox
                        id={task.id}
                        checked={task.done}
                        onCheckedChange={() => handleToggleTask(task.id)}
                      />
                      <label
                        htmlFor={task.id}
                        className={`flex-1 text-sm ${
                          task.done ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {task.task}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
            <div className="text-center py-12 text-muted-foreground">
                <p>Your plan for today is empty.</p>
                <p>Click "AI Generate Plan" to get started!</p>
            </div>
        )}
      </CardContent>
      {tasks.length > 0 && (
        <CardFooter>
            <Button variant="destructive" onClick={() => setTasks([])}>Clear All Tasks</Button>
        </CardFooter>
      )}
    </Card>
  );
}
