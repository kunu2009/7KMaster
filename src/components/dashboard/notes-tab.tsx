
"use client";

import { useState, useEffect } from 'react';
import { initialNotes } from "@/lib/data";
import type { Note, NoteBlock } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewNoteDialog } from "./new-note-dialog";
import { NoteDetail } from "./note-detail";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/auth-context';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

interface NotesTabProps {
  selectedNote: Note | null;
  onSelectNote: (note: Note | null) => void;
}

export function NotesTab({ selectedNote, onSelectNote }: NotesTabProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      setNotes([]);
      return;
    }
    setIsLoading(true);
    const q = query(collection(db, "notes"), where("userId", "==", user.uid), orderBy("modifiedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userNotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Note));
      setNotes(userNotes);
      setIsLoading(false);
    }, (error) => {
        console.error(error);
        toast({ title: 'Error', description: 'Could not fetch notes.', variant: 'destructive' });
        setIsLoading(false);
    });
    return () => unsubscribe();
  }, [user, toast]);

  const addNote = async (newNoteData: Omit<Note, 'id' | 'createdAt' | 'modifiedAt' | 'content' | 'userId'>) => {
    if (!user) return;
    const now = new Date();
    const fullNote: Omit<Note, 'id'> = {
      ...newNoteData,
      userId: user.uid,
      content: [{ id: `${now.getTime()}-initial`, type: 'paragraph', content: '' }],
      createdAt: now.toISOString(),
      modifiedAt: now.toISOString(),
    };
    try {
      const docRef = await addDoc(collection(db, 'notes'), fullNote);
      onSelectNote({ ...fullNote, id: docRef.id });
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Could not create new note.', variant: 'destructive' });
    }
  }

  const handleUpdateNote = async (updatedNote: Note) => {
    if (!user) return;
    const { id, ...noteData } = updatedNote;
    const noteToUpdate = { ...noteData, modifiedAt: new Date().toISOString() };
    try {
      await updateDoc(doc(db, 'notes', id), noteToUpdate);
      onSelectNote({ ...noteToUpdate, id });
    } catch(e) {
      console.error(e);
      toast({ title: 'Error', description: 'Could not save note.', variant: 'destructive' });
    }
  };
  
  const handleDeleteNote = async (noteId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'notes', noteId));
      onSelectNote(null);
      toast({
          title: "Note Deleted",
          description: "The note has been successfully removed.",
      });
    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "Could not delete note.", variant: "destructive" });
    }
  }

  const handleBackToList = () => {
    onSelectNote(null);
  }
  
  const getNotePreview = (content: NoteBlock[]) => {
    if (!Array.isArray(content) || content.length === 0) {
      return "No content yet...";
    }
    const firstTextualBlock = content.find(block => block.content && block.content.trim() !== '');
    if (firstTextualBlock) {
        return firstTextualBlock.content;
    }
    return "No content yet...";
  }

  if (selectedNote) {
    const currentNote = notes.find(n => n.id === selectedNote.id);
     if (!currentNote) {
        handleBackToList();
        return null;
    }
    return <NoteDetail 
              note={currentNote} 
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
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>You haven't created any notes yet.</p>
            <p>Click "New Note" to get started.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notes.map((note) => (
              <Card key={note.id} className="flex flex-col cursor-pointer hover:border-primary" onClick={() => onSelectNote(note)}>
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
                        Last modified: {new Date(note.modifiedAt).toLocaleString()}
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
