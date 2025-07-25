
"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { answerLawQuestion } from "@/ai/flows/answer-law-questions";
import { User, Bot, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function ChatInterface() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    startTransition(async () => {
      const response = await answerLawQuestion({ question: input });
      if (response && response.answer) {
        const assistantMessage: Message = {
          role: "assistant",
          content: response.answer,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Failed to get a response from the assistant.",
        });
         setMessages((prev) => prev.slice(0, -1));
      }
    });
  };

  return (
    <Card className="flex flex-col flex-1 h-full">
      <CardContent className="flex flex-col flex-1 p-4 gap-4">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.length === 0 ? (
                <div className="text-center text-muted-foreground pt-10">
                    <Bot className="mx-auto h-10 w-10 mb-2"/>
                    <p>Ready to assist. What's your question?</p>
                </div>
            ) : (
                messages.map((message, index) => (
                    <div
                        key={index}
                        className={cn(
                        "flex items-start gap-4",
                        message.role === "user" ? "justify-end" : ""
                        )}
                    >
                        {message.role === "assistant" && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot size={20}/></AvatarFallback>
                        </Avatar>
                        )}
                        <div
                        className={cn(
                            "max-w-md rounded-lg px-4 py-3 text-sm",
                            message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                        >
                        {message.content}
                        </div>
                        {message.role === "user" && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><User size={20}/></AvatarFallback>
                        </Avatar>
                        )}
                    </div>
                ))
            )}
             {isPending && (
                <div className="flex items-start gap-4">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot size={20}/></AvatarFallback>
                    </Avatar>
                    <div className="max-w-md rounded-lg px-4 py-3 text-sm bg-muted flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin"/>
                    </div>
                </div>
             )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your legal question here..."
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending || !input.trim()}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function LawAssistant() {
    return (
        <div className="h-full flex flex-col">
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">AI Doubt Assistant</h1>
                <p className="text-muted-foreground">Ask any law-related question and get instant help from our AI assistant.</p>
            </div>
            <ChatInterface />
        </div>
    );
}

