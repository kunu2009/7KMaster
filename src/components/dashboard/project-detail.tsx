
"use client";

import { useState, useEffect } from 'react';
import type { Project, Todo, WorkLogEntry } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Edit, Save, PlusCircle, Trash2, Wand2, Loader } from 'lucide-react';
import { Badge } from '../ui/badge';
import { runAssistant } from '@/ai/flows/assistant-flow';
import { useToast } from '@/hooks/use-toast';
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


interface ProjectDetailProps {
  project: Project;
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onBack: () => void;
}

export function ProjectDetail({ project, onUpdateProject, onDeleteProject, onBack }: ProjectDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project>(project);
  const [newTodo, setNewTodo] = useState('');
  const [newLogEntry, setNewLogEntry] = useState('');
  const [isGeneratingTodos, setIsGeneratingTodos] = useState(false);
  const { toast } = useToast();


  useEffect(() => {
    setEditedProject(project);
  }, [project]);

  const handleSave = () => {
    const updatedProjectWithDate = {
        ...editedProject,
        lastWorked: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    };
    onUpdateProject(updatedProjectWithDate);
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    onDeleteProject(project.id);
    // onBack will be called by the parent component after deletion
  }

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const todo: Todo = { id: `${Date.now()}`, text: newTodo.trim(), completed: false };
      const updatedProject = { ...editedProject, todos: [...(editedProject.todos || []), todo] };
      setEditedProject(updatedProject)
      onUpdateProject(updatedProject);
      setNewTodo('');
    }
  };
  
  const handleGenerateTodos = async () => {
    setIsGeneratingTodos(true);
    try {
        const response = await runAssistant({
            message: `Generate 5 todos for my project called "${project.name}". The overall goal is "${project.nextAction}".`,
        });

        const action = response.toolAction;
        if (action?.toolName === 'generateProjectTodos' && action.result?.todos) {
            const result = action.result;
            const existingTodoTexts = new Set((project.todos || []).map(t => t.text));
            const newTodos = result.todos.filter((t: Todo) => !existingTodoTexts.has(t.text));

            if (newTodos.length < result.todos.length) {
                toast({ title: "Duplicate tasks skipped", description: "Some suggested tasks already existed."});
            }

            if (newTodos.length > 0) {
                 const updatedProject = {
                    ...project,
                    todos: [...(project.todos || []), ...newTodos],
                };
                onUpdateProject(updatedProject);
                 toast({ title: "AI Todos Added!", description: `${newTodos.length} new tasks were added to your project.` });
            } else {
                 toast({ title: "No new tasks", description: "The AI didn't generate any new unique tasks."});
            }
        } else {
             toast({ title: "Error", description: "The AI assistant couldn't generate tasks for this project.", variant: 'destructive' });
        }
    } catch (e) {
        console.error("Failed to generate todos:", e);
        toast({ title: "Error", description: "Could not generate AI tasks. Please try again.", variant: 'destructive' });
    } finally {
        setIsGeneratingTodos(false);
    }
  };


  const handleToggleTodo = (todoId: string) => {
    const updatedTodos = (editedProject.todos || []).map(t => 
        t.id === todoId ? { ...t, completed: !t.completed } : t
    );
    const updatedProject = { ...editedProject, todos: updatedTodos };
    setEditedProject(updatedProject); // Keep edited state in sync
    onUpdateProject(updatedProject); // Persist change immediately
  };
  
  const handleDeleteTodo = (todoId: string) => {
      const updatedProject = {
          ...project,
          todos: (project.todos || []).filter(t => t.id !== todoId),
      };
      onUpdateProject(updatedProject);
  };

  const handleEditTodo = (todoId: string, newText: string) => {
    const updatedProject = {
        ...project,
        todos: (project.todos || []).map(t => t.id === todoId ? { ...t, text: newText } : t),
    }
    onUpdateProject(updatedProject);
    setEditedProject(updatedProject);
  };

  const handleAddLog = () => {
    if (newLogEntry.trim() !== '') {
      const log: WorkLogEntry = {
        id: `${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
        description: newLogEntry.trim(),
      };
      const updatedProject = { ...editedProject, workLog: [log, ...(editedProject.workLog || [])] };
      setEditedProject(updatedProject);
      onUpdateProject(updatedProject);
      setNewLogEntry('');
    }
  };
  
  const currentProject = isEditing ? editedProject : project;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className='flex items-center gap-2 sm:gap-4'>
                 <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex flex-col gap-1">
                    <CardTitle className="text-xl sm:text-2xl">{project.name}</CardTitle>
                    <CardDescription className='flex flex-wrap gap-x-2 gap-y-1 items-center'>
                      <span>Status: <Badge variant="outline">{project.status}</Badge></span>
                      <span className='hidden sm:inline'>|</span>
                      <span>Last Worked: {project.lastWorked}</span>
                    </CardDescription>
                </div>
            </div>
             <div className='flex gap-2 w-full sm:w-auto shrink-0'>
                <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="w-full sm:w-auto">
                    {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {isEditing ? 'Save' : 'Edit'}
                </Button>
                 {isEditing && (
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="w-full sm:w-auto">
                        Cancel
                    </Button>
                 )}
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditing && (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                <h3 className="font-semibold text-lg">Edit Project Details</h3>
                 <div className="space-y-4">
                    <div>
                        <Label htmlFor="next-action">Next Action</Label>
                        <Input
                            id="next-action"
                            value={editedProject.nextAction}
                            onChange={(e) => setEditedProject({ ...editedProject, nextAction: e.target.value })}
                        />
                    </div>
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="destructive" size="sm">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Project
                         </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the <strong>{project.name}</strong> project and all of its data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>Delete Project</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        )}

        {/* TODO List */}
        <div className="space-y-4">
            <div className='flex justify-between items-center flex-wrap gap-2'>
                <h3 className="font-semibold text-lg">To-Do List</h3>
                <Button variant="outline" size="sm" onClick={handleGenerateTodos} disabled={isGeneratingTodos}>
                    {isGeneratingTodos ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    AI Generate Tasks
                </Button>
            </div>
          <div className="space-y-2">
            {(currentProject.todos || []).map(todo => (
              <div key={todo.id} className="flex items-center gap-3">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => handleToggleTodo(todo.id)}
                />
                {isEditing ? (
                  <Input 
                    value={todo.text}
                    onChange={(e) => handleEditTodo(todo.id, e.target.value)}
                    className="flex-1 h-9"
                  />
                ) : (
                  <label htmlFor={`todo-${todo.id}`} className={`flex-1 text-sm ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {todo.text}
                  </label>
                )}
                {isEditing && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon" className="shrink-0">
                            <Trash2 className="h-4 w-4 text-destructive" />
                         </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this to-do item.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteTodo(todo.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new to-do item..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
              />
              <Button onClick={handleAddTodo}><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>
            </div>
          )}
        </div>
        
        {/* Work Log */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg">Work Log</h3>
           {isEditing && (
            <div className="flex flex-col gap-2">
                <Textarea
                    value={newLogEntry}
                    onChange={(e) => setNewLogEntry(e.target.value)}
                    placeholder="Log what you did today..."
                    rows={3}
                />
                <Button onClick={handleAddLog} className='self-end'><PlusCircle className="mr-2 h-4 w-4" /> Log Entry</Button>
            </div>
          )}
          <div className="space-y-4">
            {(currentProject.workLog || []).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(log => (
              <div key={log.id} className="p-3 border-l-2 pl-4 rounded-r-md bg-muted/20">
                <p className="font-semibold text-sm">{log.date}</p>
                <p className="text-muted-foreground text-sm">{log.description}</p>
              </div>
            ))}
             {(currentProject.workLog || []).length === 0 && !isEditing && (
                 <p className="text-sm text-muted-foreground text-center py-4">No work has been logged yet.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
