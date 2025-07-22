
"use client";

import { useState, useMemo, useCallback } from "react";
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
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Loader, Clock, Edit, Save, PlusCircle, Trash2, Wand2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialTodayTasks, initialProjects, initialSkills } from "@/lib/data";
import type { TodayTask, Project, Skill } from "@/lib/types";
import { generateDailyPlan } from "@/ai/flows/generate-daily-plan-flow";
import { generateBlockTasks } from "@/ai/flows/generate-block-tasks-flow";
import { PomodoroTimer } from "./pomodoro-timer";
import { useToast } from "@/hooks/use-toast";


export function TodayTab() {
  const [tasks, setTasks] = useLocalStorage<TodayTask[]>(
    "todayTasks",
    initialTodayTasks
  );
  const [projects] = useLocalStorage<Project[]>("projects", initialProjects);
  const [skills] = useLocalStorage<Skill[]>("skills", initialSkills);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [generatingBlock, setGeneratingBlock] = useState<string | null>(null);
  const { toast } = useToast();


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
      toast({ title: "Error", description: "Could not generate a new plan.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateBlockTasks = useCallback(async (timeBlock: string, blockTitle: string) => {
    setGeneratingBlock(timeBlock);
    try {
        const simplifiedProjects = projects.map(p => ({ name: p.name, nextAction: p.nextAction }));
        const simplifiedSkills = skills.map(s => ({ area: s.area, weeklyGoal: s.weeklyGoal }));
        const existingTasks = tasks.filter(t => t.timeBlock === timeBlock).map(t => t.task);

        const result = await generateBlockTasks({
            blockTitle,
            existingTasks,
            projects: simplifiedProjects,
            skills: simplifiedSkills,
        });

        if (result && result.tasks.length > 0) {
            const newTasks: TodayTask[] = result.tasks.map(taskText => ({
                id: `${Date.now()}-${Math.random()}`,
                timeBlock: timeBlock,
                task: taskText,
                done: false,
            }));
            setTasks(prev => [...prev, ...newTasks]);
            toast({ title: "Tasks Suggested", description: `${result.tasks.length} new tasks were added to this block.`});
        } else {
             toast({ title: "No new tasks", description: "The AI didn't suggest any new tasks for this block."});
        }
    } catch (e) {
        console.error("Failed to generate block tasks:", e);
        toast({ title: "Error", description: "Could not suggest tasks.", variant: "destructive" });
    } finally {
        setGeneratingBlock(null);
    }
  }, [projects, skills, tasks, setTasks, toast]);

  const { completedTasks, totalTasks, progress, allTasksCompleted, tasksByTimeBlock } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.done).length;
    
    // Group tasks by timeBlock
    const grouped = tasks.reduce((acc, task) => {
        (acc[task.timeBlock] = acc[task.timeBlock] || []).push(task);
        return acc;
    }, {} as Record<string, TodayTask[]>);

    // Sort the blocks by time
    const sortedTimeBlocks = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

    const finalGrouped = sortedTimeBlocks.map(timeBlock => ({
        timeBlock,
        tasks: grouped[timeBlock],
        title: grouped[timeBlock][0]?.task.split(':')[0] || 'Tasks' // Use first task for title guess
    }));


    return {
        completedTasks: completed,
        totalTasks: total,
        progress: total > 0 ? (completed / total) * 100 : 0,
        allTasksCompleted: total > 0 && completed === total,
        tasksByTimeBlock: finalGrouped,
    }
  }, [tasks]);

  const handleEditTask = (taskId: string, newText: string) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, task: newText } : task));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleAddTask = (timeBlock: string) => {
    if (newTask.trim()) {
        const newTaskObject: TodayTask = {
            id: `${Date.now()}`,
            timeBlock: timeBlock,
            task: newTask.trim(),
            done: false,
        };
        setTasks([...tasks, newTaskObject]);
        setNewTask(''); // Clear input after adding
    }
  };


  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
            <div>
              <CardTitle>Today's Plan</CardTitle>
              <CardDescription>
                Your AI-generated, time-blocked schedule for the day.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
                {allTasksCompleted && <Badge color="green">All Done! 🎉</Badge>}
                <Button onClick={() => setIsEditing(!isEditing)} size="sm" variant={isEditing ? 'default' : 'outline'}>
                    {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {isEditing ? 'Save' : 'Edit'}
                </Button>
                <Button onClick={handleGeneratePlan} disabled={isGenerating} size="sm" variant="outline">
                  {isGenerating ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">New Plan</span>
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
          <Accordion type="multiple" defaultValue={tasksByTimeBlock.map(g => g.timeBlock)} className="w-full">
            {tasksByTimeBlock.map(({ timeBlock, tasks: tasksInBlock, title }) => (
                <AccordionItem value={timeBlock} key={timeBlock}>
                    <AccordionTrigger className="font-semibold text-base hover:no-underline">
                       <div className="flex items-center justify-between w-full">
                         <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-primary" />
                            <span className="text-lg">{title}</span>
                         </div>
                         <Badge variant="outline" className="font-mono text-sm mr-2">{timeBlock}</Badge>
                       </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pl-4 border-l-2 ml-4">
                            {tasksInBlock.map(task => (
                                <div key={task.id} className="flex items-center gap-3">
                                    <Checkbox
                                        id={`task-${task.id}`}
                                        checked={task.done}
                                        onCheckedChange={(checked) => handleCheckedChange(task.id, !!checked)}
                                        aria-label={`Mark ${task.task} as done`}
                                        className="h-5 w-5"
                                        disabled={isEditing}
                                    />
                                    {isEditing ? (
                                        <Input 
                                            value={task.task}
                                            onChange={(e) => handleEditTask(task.id, e.target.value)}
                                            className="h-9 flex-1"
                                        />
                                    ) : (
                                        <label 
                                            htmlFor={`task-${task.id}`} 
                                            className={`flex-1 text-sm ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                            {task.task}
                                        </label>
                                    )}
                                    {isEditing && (
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                             {isEditing && (
                                <div className="space-y-3 pt-4 border-t mt-4">
                                  <div className="flex items-center gap-2">
                                      <Input 
                                          placeholder="Add a new task..."
                                          value={newTask}
                                          onChange={(e) => setNewTask(e.target.value)}
                                          onKeyDown={(e) => e.key === 'Enter' && handleAddTask(timeBlock)}
                                          className="h-9 flex-1"
                                      />
                                      <Button size="sm" onClick={() => handleAddTask(timeBlock)}>
                                          <PlusCircle className="h-4 w-4 mr-2" /> Add
                                      </Button>
                                  </div>
                                   <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="w-full" 
                                        onClick={() => handleGenerateBlockTasks(timeBlock, title)}
                                        disabled={generatingBlock === timeBlock}
                                    >
                                        {generatingBlock === timeBlock ? (
                                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <Wand2 className="mr-2 h-4 w-4" />
                                        )}
                                        AI Suggest Tasks
                                    </Button>
                                </div>
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
           {tasks.length === 0 && !isGenerating && (
                <div className="text-center py-10 text-muted-foreground">
                    <p>No tasks for today.</p>
                    <p>Click "New Plan" to generate a schedule.</p>
                </div>
            )}
        </CardContent>
      </Card>
      <PomodoroTimer />
    </>
  );
}
