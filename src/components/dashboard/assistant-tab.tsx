
"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Bot, Loader, PlusCircle, Send, User } from 'lucide-react';
import { runAssistant, type AssistantToolAction, type AssistantOutput } from '@/ai/flows/assistant-flow';
import { initialProjects } from '@/lib/data';
import type { Project, Todo } from '@/lib/types';
import type { Message as GenkitMessage } from 'genkit';


interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolAction?: AssistantToolAction;
}

export function AssistantTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [projects, setProjects] = useLocalStorage<Project[]>("projects", initialProjects);
  
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
      }]);
      toast({ title: "Project Added!", description: `"${args.name}" has been added to your projects.` });
  }, [setProjects, toast]);

  const handleAddTodosToProject = useCallback((args: any, result: any) => {
    const { projectName } = args;
    const { todos } = result;

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
          // Filter out duplicate todos based on text
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

  }, [setProjects, toast]);

  const handleToolAction = (action: AssistantToolAction) => {
    switch (action.toolName) {
      case 'addProject':
        handleAddProject(action.args);
        break;
      case 'generateProjectTodos':
        if(action.result) {
            handleAddTodosToProject(action.args, action.result);
        } else {
            toast({ title: "Error", description: "The AI tool did not return any todos.", variant: "destructive" });
        }
        break;
      default:
        console.warn('Unknown tool action:', action.toolName);
        toast({ title: "Unknown Action", description: "The AI suggested an action I don't know how to do.", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const simplifiedProjects = projects.map(p => ({ name: p.name, nextAction: p.nextAction }));

        const history: GenkitMessage[] = messages.map(m => ({
            role: m.role,
            content: [{ text: m.content }]
        }));

        const response : AssistantOutput = await runAssistant({
            message: input,
            projects: simplifiedProjects,
            history: history,
        });
        
        const assistantMessage: Message = {
            role: 'assistant',
            content: response.text,
            toolAction: response.toolAction ?? undefined
        };
        setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
        console.error("Error running assistant:", error);
        const errorMessage: Message = { role: 'assistant', content: "Sorry, I encountered an error. Please try again." };
        setMessages(prev => [...prev, errorMessage]);
        toast({ title: "AI Error", description: "Could not get a response from the assistant.", variant: 'destructive' });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
        <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Ask me to add projects, generate ideas, and more.</CardDescription>
        </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pr-4">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'assistant' && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                    </div>
                )}
                <div className={`rounded-lg p-3 max-w-sm ${message.role === 'user' ? 'bg-muted' : 'bg-accent text-accent-foreground'}`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.toolAction && (
                        <div className="mt-3 border-t pt-3">
                            <p className="text-xs font-semibold mb-2">AI has suggested an action:</p>
                             <Button size="sm" variant="outline" onClick={() => handleToolAction(message.toolAction!)} className="bg-background/80 hover:bg-background">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                {message.toolAction.toolName === 'addProject' && `Confirm: Add Project`}
                                {message.toolAction.toolName === 'generateProjectTodos' && `Confirm: Add Todos`}
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
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
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
