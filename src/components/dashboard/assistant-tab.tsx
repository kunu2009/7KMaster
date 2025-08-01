
"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Bot, Loader, PlusCircle, Send, User, Sparkles, Zap, Brain, ChevronsUpDown, FolderKanban } from 'lucide-react';
import { runAssistant, type AssistantToolAction, type AssistantOutput } from '@/ai/flows/assistant-flow';
import { initialProjects, initialSkills, initialTodayTasks } from '@/lib/data';
import type { Project, Todo, Skill, TodayTask } from '@/lib/types';
import type { Message as GenkitMessage } from 'genkit';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '../ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolAction?: AssistantToolAction;
}

interface PendingTodoAction {
    messageId: number;
    args: any;
    result: any;
}

export function AssistantTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const { toast } = useToast();
  
  const [projects, setProjects] = useLocalStorage<Project[]>("projects", initialProjects);
  const [skills, setSkills] = useLocalStorage<Skill[]>("skills", initialSkills);
  const [todayTasks, setTodayTasks] = useLocalStorage<TodayTask[]>("todayTasks", initialTodayTasks);

  const [pendingTodoAction, setPendingTodoAction] = useState<PendingTodoAction | null>(null);
  const [selectedProjectContext, setSelectedProjectContext] = useState<string>('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  const handleAddProject = useCallback((args: any) => {
      setProjects(prev => [...prev, {
        id: `${Date.now()}`,
        name: args.name,
        status: args.status,
        nextAction: args.nextAction,
        lastWorked: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
        todos: [],
        workLog: [],
        attachments: [],
      }]);
      toast({ title: "Project Added!", description: `"${args.name}" has been added to your projects.` });
  }, [setProjects, toast]);

  const handleAddTodosToProject = useCallback((projectName: string, todos: Todo[]) => {
    if (!todos || todos.length === 0) {
        toast({ title: "Couldn't add todos", description: "The AI didn't generate any tasks.", variant: 'destructive'});
        return;
    }

    setProjects(prevProjects => {
      const projectExists = prevProjects.some(p => p.name.toLowerCase() === projectName.toLowerCase());
      if (!projectExists) {
        toast({ title: "Project not found", description: `Could not find a project named "${projectName}".`, variant: 'destructive'});
        return prevProjects;
      }
      return prevProjects.map(p => {
        if (p.name.toLowerCase() === projectName.toLowerCase()) {
          const existingTodoTexts = new Set((p.todos || []).map(t => t.text));
          const newTodos = todos.filter((t: Todo) => t.text && !existingTodoTexts.has(t.text));
          
          if (newTodos.length < todos.length) {
              toast({ title: "Duplicate tasks skipped", description: "Some suggested tasks already exist and were not added."});
          }

          if (newTodos.length === 0) return p;

          return { ...p, todos: [...(p.todos || []), ...newTodos] };
        }
        return p;
      });
    });
    toast({ title: "To-dos Added!", description: `${todos.length} tasks have been added to "${projectName}".` });
    setPendingTodoAction(null); // Clear the pending action

  }, [setProjects, toast]);
  
  const handleConfirmAddTodos = (projectName: string) => {
    if (pendingTodoAction && projectName) {
      handleAddTodosToProject(projectName, pendingTodoAction.result.todos);
    } else {
        toast({
            title: "Selection Required",
            description: "Please select a project from the list.",
            variant: "destructive"
        })
    }
  }

  const handleToolAction = (action: AssistantToolAction, messageId: number) => {
    switch (action.toolName) {
      case 'addProject':
        handleAddProject(action.args);
        break;
      case 'generateProjectTodos':
        if(action.result?.todos) {
            setPendingTodoAction({ messageId, args: action.args, result: action.result });
        } else {
            toast({ title: "Error", description: "The AI tool did not return any todos.", variant: "destructive" });
        }
        break;
      case 'summarizeArticle':
        // The summary is handled directly in the assistant's text response.
        // No client-side action needed here.
        break;
      default:
        console.warn('Unknown tool action:', action.toolName);
        toast({ title: "Unknown Action", description: "The AI suggested an action I don't know how to do.", variant: "destructive" });
    }
  };

  const processRequest = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setPendingTodoAction(null);

    try {
        const simplifiedProjects = projects.map(p => ({ name: p.name, nextAction: p.nextAction, status: p.status }));
        const simplifiedSkills = skills.map(s => ({ area: s.area, level: s.level, weeklyGoal: s.weeklyGoal, progress: s.progress, maxProgress: s.maxProgress }));
        const simplifiedTasks = todayTasks.map(t => ({ task: t.task, done: t.done }));


        const history: GenkitMessage[] = messages.map(m => ({
            role: m.role,
            content: [{ text: m.content }]
        }));

        const response : AssistantOutput = await runAssistant({
            message: messageText,
            projects: simplifiedProjects,
            skills: simplifiedSkills,
            todayTasks: simplifiedTasks,
            history: history,
        });
        
        const assistantMessage: Message = {
            role: 'assistant',
            content: response.text,
            toolAction: response.toolAction ?? undefined
        };
        const newMessageId = messages.length + 2; // ID for the new assistant message
        setMessages(prev => [...prev, assistantMessage]);

        if (response.toolAction) {
          handleToolAction(response.toolAction, newMessageId);
        }

    } catch (error) {
        console.error("Error running assistant:", error);
        const errorMessage: Message = { role: 'assistant', content: "Sorry, I encountered an error. Please try again." };
        setMessages(prev => [...prev, errorMessage]);
        toast({ title: "AI Error", description: "Could not get a response from the assistant.", variant: 'destructive' });
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalInput = input;
    if (selectedProjectContext && selectedProjectContext !== 'none') {
        finalInput = `For project "${selectedProjectContext}", ${input}`;
    }
    processRequest(finalInput);
  };

  const handleSmartPrompt = (prompt: string) => {
    processRequest(prompt);
    setIsActionsOpen(false);
  }

  const ProjectSelector = ({ onConfirm }: { onConfirm: (projectName: string) => void }) => {
    const [selectedProject, setSelectedProject] = useState('');
    return (
        <div className="mt-3 border-t pt-3 space-y-3">
            <p className="text-xs font-semibold">Select a project to add these tasks to:</p>
            <Select onValueChange={setSelectedProject} value={selectedProject}>
                <SelectTrigger>
                    <SelectValue placeholder="Choose project..." />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-40">
                    {projects.map(p => (
                        <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
            </Select>
            <Button size="sm" variant="outline" onClick={() => onConfirm(selectedProject)} className="w-full bg-background/80 hover:bg-background">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add to Project
            </Button>
        </div>
    );
};


  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
        <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Your smart dashboard companion. Ask me anything about your progress.</CardDescription>
        </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pr-4">
        <div className="space-y-6">
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Bot className="h-16 w-16 mb-4" />
                <h3 className="text-lg font-semibold">Welcome to your AI Assistant</h3>
                <p className="text-sm">Ask me to add a project, generate tasks, or summarize your progress!</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'assistant' && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                    </div>
                )}
                <div className={`rounded-lg p-3 max-w-sm ${message.role === 'user' ? 'bg-muted' : 'bg-accent text-accent-foreground'}`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {pendingTodoAction?.messageId === index + 1 && (
                        <ProjectSelector onConfirm={handleConfirmAddTodos} />
                    )}
                    {message.toolAction && message.toolAction.toolName === 'addProject' && (
                        <div className="mt-3 border-t pt-3">
                            <p className="text-xs font-semibold mb-2">AI has suggested an action:</p>
                            <Button size="sm" variant="outline" onClick={() => handleAddProject(message.toolAction?.args)} className="bg-background/80 hover:bg-background">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Confirm: Add Project
                            </Button>
                        </div>
                    )}
                </div>
                {message.role === 'user' && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted-foreground text-background">
                        <User className="h-5 w-5" />
                    </div>
                )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-4">
                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                </div>
                 <div className="rounded-lg p-3 bg-accent text-accent-foreground">
                    <Loader className="h-5 w-5 animate-spin" />
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <div className="p-4 border-t space-y-2">
        <Collapsible open={isActionsOpen} onOpenChange={setIsActionsOpen}>
            <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-center gap-2 text-muted-foreground">
                    <ChevronsUpDown className="h-4 w-4" />
                    Smart Actions
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-2">
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Smart Prompts</Label>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 lg:flex'>
                        <Button variant="outline" size="sm" onClick={() => handleSmartPrompt("Summarize my week's progress and identify potential wins and blockers.")} disabled={isLoading} className="flex-1">
                            <Sparkles className="mr-2 h-4 w-4" /> Summarize Week
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleSmartPrompt("Based on my projects and skills, suggest a plan for the next 3 days.")} disabled={isLoading} className="flex-1">
                            <Zap className="mr-2 h-4 w-4" /> Plan Next 3 Days
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleSmartPrompt("Generate a high-level vision statement based on my current projects and skills.")} disabled={isLoading} className="flex-1">
                            <Brain className="mr-2 h-4 w-4" /> Generate Vision
                        </Button>
                    </div>
                </div>
                <div>
                    <Label htmlFor="project-context" className="text-xs text-muted-foreground flex items-center gap-2">
                      <FolderKanban className="h-4 w-4" />
                      Project Context (Optional)
                    </Label>
                    <Select onValueChange={(value) => { setSelectedProjectContext(value === 'none' ? '' : value); if(value) {setIsActionsOpen(true)}}} value={selectedProjectContext || 'none'} disabled={isLoading}>
                        <SelectTrigger id="project-context" className="w-full">
                            <SelectValue placeholder="Select a project for context..." />
                        </SelectTrigger>
                        <SelectContent>
                            <ScrollArea className="h-40">
                                <SelectItem value="none">None</SelectItem>
                                {projects.map(p => (
                                    <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                                ))}
                            </ScrollArea>
                        </SelectContent>
                    </Select>
                </div>
            </CollapsibleContent>
        </Collapsible>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Add a project called 'Learn Genkit'"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader className="animate-spin" /> : <Send />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </Card>
  );
}
