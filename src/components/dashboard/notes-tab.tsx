
"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialNotes } from "@/lib/data";
import type { Note, NoteBlock } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewNoteDialog } from "./new-note-dialog";
import { NoteDetail } from "./note-detail";
import { useToast } from "@/hooks/use-toast";

export function NotesTab() {
  const [notes, setNotes] = useLocalStorage<Note[]>(
    "notes",
    initialNotes
  );
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { toast } = useToast();

  const addNote = (newNote: Omit<Note, 'id' | 'createdAt' | 'modifiedAt' | 'content'>) => {
    const createdDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const fullNote: Note = {
      ...newNote,
      id: `${Date.now()}`,
      content: [{ id: `${Date.now()}-initial`, type: 'paragraph', content: '' }], // Start with one empty paragraph
      createdAt: createdDate,
      modifiedAt: createdDate,
    };
    setNotes(prev => [fullNote, ...prev]);
    setSelectedNote(fullNote); // Automatically open the new note
  }

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(prevNotes => prevNotes.map(n => n.id === updatedNote.id ? updatedNote : n));
    setSelectedNote(updatedNote);
  };
  
  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
    setSelectedNote(null);
    toast({
        title: "Note Deleted",
        description: "The note has been successfully removed.",
    });
  }

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  }

  const handleBackToList = () => {
    setSelectedNote(null);
  }
  
  const getNotePreview = (content: NoteBlock[]) => {
    const firstTextualBlock = content.find(block => block.content.trim() !== '');
    if (firstTextualBlock) {
        return firstTextualBlock.content;
    }
    return "No content yet...";
  }


  if (selectedNote) {
    return <NoteDetail 
              note={selectedNote} 
              onUpdateNote={handleUpdateNote} 
              onDeleteNote={handleDeleteNote}
              onBack={handleBackToList} 
            />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Notepad</CardTitle>
            <CardDescription>
              Your personal notepad. Click a note to open the editor.
            </CardDescription>
          </div>
          <NewNoteDialog onAddNote={addNote} />
        </div>
      </CardHeader>
      <CardContent>
        {notes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>You haven't created any notes yet.</p>
            <p>Click "New Note" to get started.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notes.sort((a,b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()).map((note) => (
              <Card key={note.id} className="flex flex-col cursor-pointer hover:border-primary" onClick={() => handleSelectNote(note)}>
                <CardHeader>
                  <CardTitle className="text-lg truncate">{note.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                   <p className="text-sm text-muted-foreground line-clamp-3">
                     {getNotePreview(note.content)}
                   </p>
                </CardContent>
                <CardFooter>
                    <p className="text-xs text-muted-foreground">
                        Last modified: {note.modifiedAt}
                    </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
