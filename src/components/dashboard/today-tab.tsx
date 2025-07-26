
"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { GanttChartSquare, FileText, Target, BookOpen, Focus } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialProjects, initialNotes, initialJournalEntry } from "@/lib/data";
import type { Project, Note, NoteBlock, Todo } from "@/lib/types";
import { PomodoroTimer } from "./pomodoro-timer";
import { Button } from "../ui/button";

// A unified type for todos from any source
export interface AggregatedTodo {
    id: string; // Unique ID of the todo item itself
    text: string;
    isCompleted: boolean;
    sourceType: 'Project' | 'Note';
    sourceName: string; // Name of the Project or Title of the Note
    sourceId: string; // ID of the source Project or Note
    blockId?: string; // Only for Note todos, to identify the block
}

export function TodayTab() {
  const [projects, setProjects] = useLocalStorage<Project[]>("projects", initialProjects);
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", initialNotes);
  const [journalEntry, setJournalEntry] = useLocalStorage<string>("journalEntry", initialJournalEntry);
  const [focusThing, setFocusThing] = useLocalStorage<string>("focusThing", "");
  const [focusedTask, setFocusedTask] = useState<AggregatedTodo | null>(null);

  const aggregatedTodos = useMemo((): AggregatedTodo[] => {
    const fromProjects = projects.flatMap(project =>
      (project.todos || []).map((todo: Todo) => ({
        id: todo.id,
        text: todo.text,
        isCompleted: todo.completed,
        sourceType: 'Project',
        sourceName: project.name,
        sourceId: project.id,
      }))
    );

    const fromNotes = notes.flatMap(note =>
        (Array.isArray(note.content) ? note.content : [])
        .filter((block: NoteBlock) => block.type === 'todo')
        .map((block: NoteBlock) => ({
            id: `${note.id}-${block.id}`,
            text: block.content,
            isCompleted: block.checked || false,
            sourceType: 'Note',
            sourceName: note.title,
            sourceId: note.id,
            blockId: block.id,
        }))
    );

    return [...fromProjects, ...fromNotes];
  }, [projects, notes]);

  const handleToggleTodo = (todo: AggregatedTodo) => {
    if (todo.sourceType === 'Project') {
        setProjects(prevProjects => 
            prevProjects.map(p => {
                if (p.id === todo.sourceId) {
                    const updatedTodos = (p.todos || []).map(t => 
                        t.id === todo.id ? { ...t, completed: !t.completed } : t
                    );
                    return { ...p, todos: updatedTodos };
                }
                return p;
            })
        );
    } else if (todo.sourceType === 'Note' && todo.blockId) {
        const blockId = todo.blockId;
        setNotes(prevNotes => 
            prevNotes.map(n => {
                if (n.id === todo.sourceId) {
                    const updatedContent = (Array.isArray(n.content) ? n.content : []).map(b => 
                        b.id === blockId ? { ...b, checked: !b.checked } : b
                    );
                    return { ...n, content: updatedContent };
                }
                return n;
            })
        );
    }
  };
  
  const onPomodoroComplete = (task: AggregatedTodo) => {
    const sessionMarker = "🍅";
     if (task.sourceType === 'Project') {
        setProjects(prevProjects => 
            prevProjects.map(p => {
                if (p.id === task.sourceId) {
                    const updatedTodos = (p.todos || []).map(t => 
                        t.id === task.id ? { ...t, text: t.text + ` ${sessionMarker}` } : t
                    );
                    return { ...p, todos: updatedTodos };
                }
                return p;
            })
        );
    } else if (task.sourceType === 'Note' && task.blockId) {
        const blockId = task.blockId;
        setNotes(prevNotes => 
            prevNotes.map(n => {
                if (n.id === task.sourceId) {
                    const updatedContent = (Array.isArray(n.content) ? n.content : []).map(b => 
                        b.id === blockId ? { ...b, content: b.content + ` ${sessionMarker}` } : b
                    );
                    return { ...n, content: updatedContent };
                }
                return n;
            })
        );
    }

    // Unset the focused task after completion
    setFocusedTask(null);
  };

  const { completedTasks, totalTasks, progress } = useMemo(() => {
    const total = aggregatedTodos.length;
    const completed = aggregatedTodos.filter(task => task.isCompleted).length;
    return {
        completedTasks: completed,
        totalTasks: total,
        progress: total > 0 ? (completed / total) * 100 : 0,
    }
  }, [aggregatedTodos]);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                  <CardTitle>Today's Inbox</CardTitle>
                  <CardDescription>
                    A unified view of all tasks from your projects and notes.
                  </CardDescription>
                </div>
              </div>
               <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Overall Progress</span>
                      <span>{completedTasks} / {totalTasks} Tasks Completed</span>
                  </div>
                  <Progress value={progress} />
               </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="focus-thing" className="flex items-center gap-2 text-muted-foreground">
                            <Target className="h-4 w-4" />
                            One Thing to Focus On Today
                        </Label>
                        <Input id="focus-thing" placeholder="e.g., Ship the new feature" value={focusThing} onChange={(e) => setFocusThing(e.target.value)} />
                    </div>
                </div>

                <div className="space-y-4">
                    {aggregatedTodos.length > 0 ? (
                        aggregatedTodos.map(todo => (
                            <div key={`${todo.sourceType}-${todo.id}`} className={`flex items-start gap-3 p-3 rounded-md border ${focusedTask?.id === todo.id ? "border-primary bg-primary/10" : "bg-muted/30"}`}>
                               <Checkbox
                                    id={todo.id}
                                    checked={todo.isCompleted}
                                    onCheckedChange={() => handleToggleTodo(todo)}
                                    className="h-5 w-5 mt-0.5"
                                />
                                <div className="flex-1">
                                    <label 
                                        htmlFor={todo.id} 
                                        className={`text-sm ${todo.isCompleted ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                        {todo.text}
                                    </label>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                        {todo.sourceType === 'Project' ? <GanttChartSquare className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                                        <span>{todo.sourceType}: {todo.sourceName}</span>
                                    </div>
                                </div>
                                 <Button 
                                     variant={focusedTask?.id === todo.id ? "default" : "ghost"} 
                                     size="sm" 
                                     onClick={() => setFocusedTask(todo)}
                                     disabled={todo.isCompleted}
                                     className="self-center"
                                >
                                    <Focus className="mr-2 h-4 w-4" />
                                    Focus
                                 </Button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            <p>No tasks found.</p>
                            <p>Add to-dos in your Projects or Notes to see them here.</p>
                        </div>
                    )}
                </div>

                <div className="space-y-2 pt-4 border-t">
                    <Label htmlFor="journal-entry" className="flex items-center gap-2 text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        Mini Journal (1-Line Reflection)
                    </Label>
                    <Input id="journal-entry" placeholder="Today I learned..." value={journalEntry} onChange={(e) => setJournalEntry(e.target.value)} />
                </div>
            </CardContent>
          </Card>
      </div>
      <PomodoroTimer focusedTask={focusedTask} onPomodoroComplete={onPomodoroComplete} />
    </div>
  );
}
