
"use client";

import { useState, useMemo, useEffect } from "react";
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
import { Loader, Wand2, PlusCircle, BrainCircuit, GanttChartSquare, Scale, ScrollText, BookCopy, Languages, TrendingUp, Vote, BookText as EnglishIcon, Settings, Trash2, Loader2 } from 'lucide-react';
import type { TodayTask, Project, Skill, AggregatedTodo, TimeBlock } from "@/lib/types";
import { generateDailyPlan } from "@/ai/flows/generate-daily-plan-flow";
import { generateBlockTasks, type GenerateBlockTasksInput } from "@/ai/flows/generate-block-tasks-flow";
import { useToast } from "@/hooks/use-toast";
import { PomodoroTimer } from "./pomodoro-timer";
import { AddTodayTask } from "./add-today-task";
import { ScrollArea } from "../ui/scroll-area";
import { ManageTimeBlocksDialog } from "./manage-time-blocks-dialog";
import { useAuth } from "@/context/auth-context";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
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
} from "@/components/ui/alert-dialog"
import { hscEnglishPoetry, hscEnglishProse } from "@/lib/hsc-data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialProjects, initialSkills, initialTimeBlocks, initialTodayTasks } from "@/lib/data";


export function TodayTab() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [localTasks, setLocalTasks] = useLocalStorage<TodayTask[]>('todayTasks_guest', initialTodayTasks);
  const [firestoreTasks, setFirestoreTasks] = useState<TodayTask[]>([]);
  
  const [localTimeBlocks, setLocalTimeBlocks] = useLocalStorage<TimeBlock[]>('timeBlocks_guest', initialTimeBlocks);
  const [firestoreTimeBlocks, setFirestoreTimeBlocks] = useState<TimeBlock[]>([]);
  
  const [localProjects] = useLocalStorage<Project[]>("projects_guest", initialProjects);
  const [localSkills] = useLocalStorage<Skill[]>("skills_guest", initialSkills);
  
  const [firestoreProjects, setFirestoreProjects] = useState<Project[]>([]);
  const [firestoreSkills, setFirestoreSkills] = useState<Skill[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generatingBlock, setGeneratingBlock] = useState<string | null>(null);
  const [focusedTask, setFocusedTask] = useState<AggregatedTodo | null>(null);

  const tasks = user ? firestoreTasks : localTasks;
  const setTasks = user ? setFirestoreTasks : setLocalTasks;
  const timeBlocks = user ? firestoreTimeBlocks : localTimeBlocks;
  const setTimeBlocks = user ? setFirestoreTimeBlocks : setLocalTimeBlocks;
  const projects = user ? firestoreProjects : localProjects;
  const skills = user ? firestoreSkills : localSkills;


  useEffect(() => {
    if (!user) {
        setIsLoading(false);
        return;
    };

    setIsLoading(true);
    const unsubs: (() => void)[] = [];
    const collectionsToSync = [
        { name: 'todayTasks', setter: setFirestoreTasks },
        { name: 'timeBlocks', setter: setFirestoreTimeBlocks },
        { name: 'projects', setter: setFirestoreProjects },
        { name: 'skills', setter: setFirestoreSkills },
    ];

    collectionsToSync.forEach(({ name, setter }) => {
        const q = query(collection(db, name), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (name === 'timeBlocks') {
                setter(items.sort((a:any, b:any) => a.name.localeCompare(b.name)) as any);
            } else {
                setter(items as any);
            }
        }, (error) => {
            console.error(`Error fetching ${name}:`, error);
        });
        unsubs.push(unsubscribe);
    });

    // Seed initial time blocks if they don't exist for the user
    const blocksQuery = query(collection(db, 'timeBlocks'), where('userId', '==', user.uid));
    const unsubBlocks = onSnapshot(blocksQuery, (snapshot) => {
        if (snapshot.empty) {
            const batch = writeBatch(db);
            initialTimeBlocks.forEach(block => {
                const docRef = doc(collection(db, 'timeBlocks'));
                const { id, ...rest } = block;
                batch.set(docRef, { ...rest, userId: user.uid });
            });
            batch.commit();
        }
    });
    unsubs.push(unsubBlocks);

    setIsLoading(false);

    return () => {
        unsubs.forEach(unsub => unsub());
    };
  }, [user]);

  const aggregatedTasks = useMemo<AggregatedTodo[]>(() => {
    const projectNextActions: AggregatedTodo[] = projects
        .filter(p => p.status === 'In Progress' || p.status === 'Not Started')
        .map(p => ({
            id: `proj-${p.id}`,
            text: p.nextAction,
            source: 'Project Next Actions', // Use a consistent group name
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
  
  const handleToggleTask = async (id: string) => {
    if (id.startsWith('proj-')) return;
    
    if (!user) {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
        return;
    }
    
    const taskToUpdate = tasks.find(t => t.id === id);
    if (taskToUpdate) {
        const taskRef = doc(db, 'todayTasks', id);
        try {
            await updateDoc(taskRef, { done: !taskToUpdate.done });
        } catch(e) {
            console.error(e);
            toast({ title: 'Error', description: 'Could not update task status.', variant: 'destructive'});
        }
    }
  };
  
  const handleDeleteTask = async (id: string) => {
    if (!user) {
        setTasks(prev => prev.filter(t => t.id !== id));
        toast({ title: 'Task Removed (Guest Mode)' });
        return;
    }
    try {
        await deleteDoc(doc(db, 'todayTasks', id));
        toast({ title: 'Task Removed', description: 'The task has been deleted from your daily plan.' });
    } catch(e) {
        console.error(e);
        toast({ title: 'Error', description: 'Could not delete task.', variant: 'destructive'});
    }
  }

  const handleAddTask = async (task: Omit<TodayTask, 'id' | 'userId'>) => {
    if (!user) {
        const newTask = { ...task, id: `${Date.now()}` };
        setTasks(prev => [...prev, newTask]);
        return;
    }
    try {
        await addDoc(collection(db, 'todayTasks'), { ...task, userId: user.uid });
    } catch(e) {
        console.error(e);
        toast({ title: 'Error', description: 'Could not add new task.', variant: 'destructive'});
    }
  };
  
  const handleGeneratePlan = async () => {
    const planProjects = projects.map(p => ({name: p.name, nextAction: p.nextAction}));
    const planSkills = skills.map(s => ({area: s.area, weeklyGoal: s.weeklyGoal}));

    setIsGeneratingPlan(true);
    try {
      const result = await generateDailyPlan({ 
        projects: planProjects,
        skills: planSkills,
        timeBlocks: timeBlocks,
      });
      if (result.tasks && result.tasks.length > 0) {
        if(!user) {
            setTasks(result.tasks.map(t => ({...t, id: `${Date.now()}-${t.id}`})));
        } else {
            const batch = writeBatch(db);
            tasks.forEach(task => {
                batch.delete(doc(db, 'todayTasks', task.id));
            });
            result.tasks.forEach(task => {
                const docRef = doc(collection(db, 'todayTasks'));
                batch.set(docRef, { ...task, userId: user.uid });
            });
            await batch.commit();
        }
        toast({ title: 'Plan Generated!', description: 'Your daily plan has been created.' });
      }
    } catch (error) {
      console.error("Error generating daily plan:", error);
      toast({ title: 'Error', description: 'Could not generate plan from AI.', variant: 'destructive' });
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleGenerateBlockTasks = async (taskType: GenerateBlockTasksInput['taskType'], blockTitle: string) => {
    setGeneratingBlock(blockTitle);
    try {
        const existingTasks = tasks.filter(t => t.timeBlock === blockTitle).map(t => t.task);
        
        const input: GenerateBlockTasksInput = {
            blockTitle,
            taskType,
            existingTasks,
            projects: projects.map(({ name, nextAction }) => ({ name, nextAction })),
            skills: skills.map(({ area, weeklyGoal }) => ({ area, weeklyGoal })),
        };
        
        if (taskType === 'HSC English') {
            input.hscEnglish = [...hscEnglishProse.map(p => p.title), ...hscEnglishPoetry.map(p => p.title)];
        }
        
        const result = await generateBlockTasks(input);

        if (result.tasks && result.tasks.length > 0) {
            if(!user) {
                const newTasks: TodayTask[] = result.tasks.map(t => ({ id: `${Date.now()}-${t}`, task: t, timeBlock: blockTitle, done: false }));
                setTasks(prev => [...prev, ...newTasks]);
            } else {
                const batch = writeBatch(db);
                result.tasks.forEach(taskText => {
                    const docRef = doc(collection(db, 'todayTasks'));
                    const newTask: Omit<TodayTask, 'id'> = {
                        timeBlock: blockTitle,
                        task: taskText,
                        done: false,
                        userId: user.uid
                    };
                    batch.set(docRef, newTask);
                });
                await batch.commit();
            }
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
        handleToggleTask(task.id);
        toast({title: "Pomodoro Complete!", description: `Task "${task.text}" marked as done.`})
     }
  }

  const clearDailyPlan = async () => {
    if (!user) {
        setTasks([]);
        toast({title: 'Plan Cleared', description: 'Your daily tasks have been removed.'});
        return;
    }
    if (tasks.length === 0) return;
    const batch = writeBatch(db);
    tasks.forEach(task => {
        batch.delete(doc(db, 'todayTasks', task.id));
    });
    await batch.commit();
    toast({title: 'Plan Cleared', description: 'Your daily tasks have been removed.'})
  };

  const groupedTasks = useMemo(() => {
    return aggregatedTasks.reduce((acc, task) => {
        const group = task.source;
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(task);
        return acc;
    }, {} as Record<string, AggregatedTodo[]>);
  }, [aggregatedTasks]);

  const sortedGroups = useMemo(() => {
    const projectActionsGroup = "Project Next Actions";
    const timeBlockGroupNames = timeBlocks
        .map(tb => tb.name)
        .filter(name => groupedTasks[name]);
    
    const otherGroupNames = Object.keys(groupedTasks)
        .filter(g => g !== projectActionsGroup && !timeBlocks.some(tb => tb.name === g));
        
    const allGroups = [
        ...timeBlockGroupNames,
        ...otherGroupNames
    ];

    if (groupedTasks[projectActionsGroup]) {
        allGroups.push(projectActionsGroup);
    }
    
    return [...new Set(allGroups)];
  }, [groupedTasks, timeBlocks]);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle>Today's Command Center</CardTitle>
                      <CardDescription>
                        Your aggregated tasks for today from all sources.
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                      <ManageTimeBlocksDialog timeBlocks={timeBlocks} setTimeBlocks={setTimeBlocks} />
                      {tasks.length === 0 && (
                          <Button onClick={handleGeneratePlan} disabled={isGeneratingPlan} className="flex-grow sm:flex-grow-0">
                              {isGeneratingPlan ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                              AI Generate Daily Plan
                          </Button>
                      )}
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-22rem)] pr-4">
                  {isLoading && user ? (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : aggregatedTasks.length > 0 ? (
                    <div className="space-y-6">
                      {sortedGroups.map((groupName, index) => (
                        <div key={`${groupName}-${index}`}>
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
                                      <DropdownMenuItem onClick={() => handleGenerateBlockTasks('Project-related', groupName)}>
                                        <GanttChartSquare className="mr-2 h-4 w-4"/>
                                        <span>Project Task</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleGenerateBlockTasks('Skill-related', groupName)}>
                                        <BrainCircuit className="mr-2 h-4 w-4"/>
                                        <span>Skill Task</span>
                                      </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => handleGenerateBlockTasks('LawPrep Study', groupName)}>
                                        <Scale className="mr-2 h-4 w-4"/>
                                        <span>LawPrep Study</span>
                                      </DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => handleGenerateBlockTasks('Itihas Study', groupName)}>
                                        <ScrollText className="mr-2 h-4 w-4"/>
                                        <span>Itihas Study</span>
                                      </DropdownMenuItem>
                                      <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <BookCopy className="mr-2 h-4 w-4"/>
                                            <span>HSC Study</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem onClick={() => handleGenerateBlockTasks('HSC English', groupName)}><EnglishIcon className="mr-2 h-4 w-4"/>English</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleGenerateBlockTasks('HSC Sanskrit', groupName)}><Languages className="mr-2 h-4 w-4"/>Sanskrit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleGenerateBlockTasks('HSC Hindi', groupName)}><Languages className="mr-2 h-4 w-4"/>Hindi</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleGenerateBlockTasks('HSC Economics', groupName)}><TrendingUp className="mr-2 h-4 w-4"/>Economics</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleGenerateBlockTasks('HSC Political Science', groupName)}><Vote className="mr-2 h-4 w-4"/>Political Science</DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                      </DropdownMenuSub>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                               )}
                          </div>
                          <div className="space-y-2">
                            {groupedTasks[groupName].map((task) => (
                              <div key={task.id} className="group flex flex-wrap items-center justify-between gap-2 p-2 rounded-md hover:bg-muted/50">
                                <div className="flex items-center gap-3">
                                  <Checkbox
                                    id={task.id}
                                    checked={task.completed}
                                    onCheckedChange={() => handleToggleTask(task.id)}
                                    disabled={task.id.startsWith('proj-')}
                                  />
                                  <label
                                    htmlFor={task.id}
                                    className={`text-sm ${
                                      task.completed ? "line-through text-muted-foreground" : ""
                                    }`}
                                  >
                                    {task.text}
                                  </label>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button 
                                      size="sm" 
                                      variant={focusedTask?.id === task.id ? "default" : "ghost"}
                                      onClick={() => setFocusedTask(task)}
                                  >
                                      Focus
                                  </Button>
                                  {!task.id.startsWith('proj-') && (
                                     <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive">
                                              <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                              <AlertDialogDescription>
                                                  This action cannot be undone. This will permanently delete this task.
                                              </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                                              <AlertDialogAction onClick={() => handleDeleteTask(task.id)}>Delete</AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                  )}
                                </div>
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
               {tasks.length > 0 && (!isLoading || !user) && (
                <CardFooter>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">Clear Daily Plan</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete all tasks from your daily plan.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={clearDailyPlan}>Delete All</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
              )}
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <AddTodayTask onAddTask={handleAddTask} timeBlocks={timeBlocks} />
            <PomodoroTimer focusedTask={focusedTask} onPomodoroComplete={handlePomodoroComplete} />
        </div>
    </div>
  );
}
