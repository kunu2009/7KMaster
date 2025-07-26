
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
import { Loader, Wand2, PlusCircle, BrainCircuit, GanttChartSquare, Scale, ScrollText } from 'lucide-react';
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  initialTodayTasks,
  initialProjects,
  initialSkills,
} from "@/lib/data";
import type { TodayTask, Project, Skill, AggregatedTodo } from "@/lib/types";
import { generateDailyPlan } from "@/ai/flows/generate-daily-plan-flow";
import { generateBlockTasks } from "@/ai/flows/generate-block-tasks-flow";
import { useToast } from "@/hooks/use-toast";
import { PomodoroTimer } from "./pomodoro-timer";
import { AddTodayTask } from "./add-today-task";
import { ScrollArea } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function TodayTab() {
  const [tasks, setTasks] = useLocalStorage<TodayTask[]>("todayTasks", initialTodayTasks);
  const [projects, setProjects] = useLocalStorage<Project[]>("projects", initialProjects);
  const [skills] = useLocalStorage<Skill[]>("skills", initialSkills);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generatingBlock, setGeneratingBlock] = useState<string | null>(null);
  const [focusedTask, setFocusedTask] = useState<AggregatedTodo | null>(null);
  const { toast } = useToast();

  const aggregatedTasks = useMemo<AggregatedTodo[]>(() => {
    const projectNextActions: AggregatedTodo[] = projects
        .filter(p => p.status === 'In Progress' || p.status === 'Not Started')
        .map(p => ({
            id: `proj-${p.id}`,
            text: p.nextAction,
            source: p.name,
            completed: false // Not trackable here
        }));

    const dailyPlanTasks: AggregatedTodo[] = tasks.map(t => ({
        id: t.id,
        text: t.task,
        source: t.timeBlock,
        completed: t.done,
    }));
    
    return [...dailyPlanTasks, ...projectNextActions];
  }, [tasks, projects]);
  
  const handleToggleTask = (id: string, source: string) => {
    // Only daily plan tasks can be toggled
    if (id.startsWith('proj-')) return;
    
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };
  
  const handleAddTask = (newTask: TodayTask) => {
    setTasks(prev => [...prev, newTask]);
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

  const handleGenerateBlockTasks = async (blockTitle: string, taskType: 'Project-related' | 'Skill-related' | 'LawPrep Study' | 'Itihas Study') => {
    setGeneratingBlock(blockTitle);
    try {
        const existingTasks = tasks.filter(t => t.timeBlock === blockTitle).map(t => t.task);
        const result = await generateBlockTasks({
            blockTitle,
            taskType,
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
  
  const handlePomodoroComplete = (task: AggregatedTodo) => {
     if (task.id.startsWith('proj-')) {
         toast({title: "Pomodoro Complete!", description: `Great focus session on "${task.text}"!`})
     } else {
        handleToggleTask(task.id, task.source);
        toast({title: "Pomodoro Complete!", description: `Task "${task.text}" marked as done.`})
     }
  }

  const groupedTasks = useMemo(() => {
    return aggregatedTasks.reduce((acc, task) => {
        const group = task.id.startsWith('proj-') ? "Project Next Actions" : task.source;
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(task);
        return acc;
    }, {} as Record<string, AggregatedTodo[]>);
  }, [aggregatedTasks]);

  const sortedGroups = useMemo(() => {
      const allGroups = Object.keys(groupedTasks);
      const projectActionsGroup = allGroups.filter(g => g === "Project Next Actions");
      const timeBlockGroups = allGroups.filter(g => g !== "Project Next Actions").sort();
      return [...timeBlockGroups, ...projectActionsGroup];
  }, [groupedTasks]);


  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <CardTitle>Today's Command Center</CardTitle>
                      <CardDescription>
                        Your aggregated tasks for today from all sources.
                      </CardDescription>
                    </div>
                    {tasks.length === 0 && (
                        <Button onClick={handleGeneratePlan} disabled={isGeneratingPlan}>
                            {isGeneratingPlan ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                            AI Generate Daily Plan
                        </Button>
                    )}
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-22rem)] pr-4">
                  {aggregatedTasks.length > 0 ? (
                    <div className="space-y-6">
                      {sortedGroups.map((groupName) => (
                        <div key={groupName}>
                          <div className="flex justify-between items-center mb-2 border-b pb-1">
                              <h3 className="font-semibold text-lg text-primary">{groupName}</h3>
                               {groupName !== "Project Next Actions" && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          disabled={generatingBlock === groupName}
                                          className="text-muted-foreground"
                                      >
                                        {generatingBlock === groupName ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                                          AI Suggest
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem onClick={() => handleGenerateBlockTasks(groupName, 'Project-related')}>
                                        <GanttChartSquare className="mr-2 h-4 w-4"/>
                                        <span>Project Task</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleGenerateBlockTasks(groupName, 'Skill-related')}>
                                        <BrainCircuit className="mr-2 h-4 w-4"/>
                                        <span>Skill Task</span>
                                      </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => handleGenerateBlockTasks(groupName, 'LawPrep Study')}>
                                        <Scale className="mr-2 h-4 w-4"/>
                                        <span>LawPrep Study</span>
                                      </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => handleGenerateBlockTasks(groupName, 'Itihas Study')}>
                                        <ScrollText className="mr-2 h-4 w-4"/>
                                        <span>Itihas Study</span>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                               )}
                          </div>
                          <div className="space-y-2">
                            {groupedTasks[groupName].map((task) => (
                              <div key={task.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
                                <Checkbox
                                  id={task.id}
                                  checked={task.completed}
                                  onCheckedChange={() => handleToggleTask(task.id, task.source)}
                                  disabled={task.id.startsWith('proj-')}
                                />
                                <label
                                  htmlFor={task.id}
                                  className={`flex-1 text-sm ${
                                    task.completed ? "line-through text-muted-foreground" : ""
                                  }`}
                                >
                                  {task.text}
                                </label>
                                 <Button 
                                    size="sm" 
                                    variant={focusedTask?.id === task.id ? "default" : "ghost"}
                                    onClick={() => setFocusedTask(task)}
                                    className="ml-auto"
                                >
                                    Focus
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                      <div className="text-center py-12 text-muted-foreground">
                          <p>Your plan for today is empty.</p>
                          <p>Click "AI Generate Daily Plan" to get started!</p>
                      </div>
                  )}
                </ScrollArea>
              </CardContent>
               {tasks.length > 0 && (
                <CardFooter>
                    <Button variant="destructive" size="sm" onClick={() => setTasks([])}>Clear Daily Plan</Button>
                </CardFooter>
              )}
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <AddTodayTask onAddTask={handleAddTask} />
            <PomodoroTimer focusedTask={focusedTask} onPomodoroComplete={handlePomodoroComplete} />
        </div>
    </div>
  );
}
