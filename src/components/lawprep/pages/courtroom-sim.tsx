
"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courtroomAgent } from "@/ai/flows/courtroom-agent";
import { User, Send, Loader2, Gavel, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { caseSimulations } from "@/lib/law-data";
import type { CaseSimulation } from "@/lib/types";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function LawCourtroomSim() {
  const [selectedCase, setSelectedCase] = useState<CaseSimulation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const startSimulation = (simCase: CaseSimulation) => {
    setSelectedCase(simCase);
    setMessages([
      {
        role: "assistant",
        content: `The court is now in session for the case: **${simCase.title}**. You are the **${simCase.playerRole}**. The AI will act as the Judge. Please present your opening argument.`,
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending || !selectedCase) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    startTransition(async () => {
      try {
        const response = await courtroomAgent({
          caseInfo: selectedCase,
          history: newMessages,
        });

        if (response && response.aiResponse) {
          const assistantMessage: Message = {
            role: "assistant",
            content: response.aiResponse,
          };
          setMessages((prev) => [...prev, assistantMessage]);
        } else {
          throw new Error("Invalid response from the AI judge.");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "The AI judge is currently unavailable. Please try again.",
        });
        setMessages((prev) => prev.slice(0, -1));
      }
    });
  };

  if (!selectedCase) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courtroom Simulation</h1>
          <p className="text-muted-foreground">Select a case to begin your mock trial against our AI Judge.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {caseSimulations.map((simCase) => (
            <Card key={simCase.id} className="hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Gavel/> {simCase.title}</CardTitle>
                <CardDescription>Your Role: {simCase.playerRole}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{simCase.scenario}</p>
                <Button onClick={() => startSimulation(simCase)}>Begin Simulation</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
       <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">{selectedCase.title}</h1>
        <p className="text-muted-foreground">The court is in session. Present your arguments to the AI Judge.</p>
      </div>
      <Card className="flex flex-col flex-1">
        <CardContent className="flex flex-col flex-1 p-4 gap-4">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div key={index} className={cn("flex items-start gap-4", message.role === "user" ? "justify-end" : "")}>
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8"><AvatarFallback><Scale size={20}/></AvatarFallback></Avatar>
                  )}
                  <div className={cn("max-w-xl rounded-lg px-4 py-3 text-sm", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8"><AvatarFallback><User size={20}/></AvatarFallback></Avatar>
                  )}
                </div>
              ))}
               {isPending && (
                  <div className="flex items-start gap-4">
                      <Avatar className="h-8 w-8"><AvatarFallback><Scale size={20}/></AvatarFallback></Avatar>
                      <div className="max-w-md rounded-lg px-4 py-3 text-sm bg-muted flex items-center">
                          <Loader2 className="h-5 w-5 animate-spin"/>
                      </div>
                  </div>
               )}
            </div>
          </ScrollArea>
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t pt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Your argument..."
              disabled={isPending}
            />
            <Button type="submit" disabled={isPending || !input.trim()}>
              {isPending ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4" />}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
