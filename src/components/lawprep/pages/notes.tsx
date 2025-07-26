
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { lawNotes } from "@/lib/law-data";
import type { LawNote } from "@/lib/types";
import { Link as LinkIcon } from "lucide-react";
import Link from 'next/link';

// Group notes by category for the dropdown
const groupedNotes = lawNotes.reduce((acc, note) => {
  const category = note.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(note);
  return acc;
}, {} as Record<string, LawNote[]>);


export function LawNotes() {
  const [selectedTopic, setSelectedTopic] = useState<string>(lawNotes[0].topic);

  const selectedNote = lawNotes.find(note => note.topic === selectedTopic);

  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Topic Notes</h1>
        <p className="text-muted-foreground">Select a topic from the dropdown to see detailed reference notes.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-4">
           <h3 className="text-lg font-semibold">Select Topic</h3>
           <Select onValueChange={handleTopicChange} defaultValue={selectedTopic}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a topic..." />
            </SelectTrigger>
            <SelectContent className="max-h-[70vh]">
              {Object.entries(groupedNotes).map(([category, notesInCategory]) => (
                <SelectGroup key={category}>
                  <SelectLabel>{category}</SelectLabel>
                  {notesInCategory.map(note => (
                    <SelectItem key={note.topic} value={note.topic}>{note.topic}</SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          {selectedNote ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedNote.topic}</CardTitle>
                <CardDescription>A brief overview of important concepts in {selectedNote.category}.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="leading-relaxed whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-none">
                  {selectedNote.content}
                </div>
                {selectedNote.links.length > 0 && (
                   <div>
                     <h3 className="font-semibold mb-2 flex items-center gap-2"><LinkIcon className="h-4 w-4"/> Useful Links</h3>
                     <ul className="list-disc list-inside space-y-1">
                        {selectedNote.links.map(link => (
                            <li key={link.url}>
                                <Link href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                     </ul>
                   </div>
                )}
              </CardContent>
            </Card>
          ) : (
             <div className="flex items-center justify-center h-full min-h-[400px] text-center text-muted-foreground border rounded-lg">
                <p>Please select a topic to view the notes.</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
