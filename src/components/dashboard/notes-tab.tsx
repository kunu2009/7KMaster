
"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Note, NoteBlock } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewNoteDialog } from "./new-note-dialog";
import { NoteDetail } from "./note-detail";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/auth-context';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { initialNotes } from '@/lib/data';

interface NotesTabProps {
  selectedNote: Note | null;
  onSelectNote: (note: Note | null) => void;
}

export function NotesTab({ selectedNote, onSelectNote }: NotesTabProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [localNotes, setLocalNotes] = useLocalStorage<Note[]>('notes_guest', initialNotes);
  const [firestoreNotes, setFirestoreNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const notes = user ? firestoreNotes : localNotes;
  const setNotes = user ? setFirestoreNotes : setLocalNotes;

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const q = query(collection(db, "notes"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userNotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Note));
      setFirestoreNotes(userNotes);
      setIsLoading(false);
    }, (error) => {
        console.error(error);
        toast({ title: 'Error', description: 'Could not fetch notes.', variant: 'destructive' });
        setIsLoading(false);
    });
    return () => unsubscribe();
  }, [user, toast]);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime());
  }, [notes]);

  const addNote = async (newNoteData: Omit<Note, 'id' | 'createdAt' | 'modifiedAt' | 'content' | 'userId'>) => {
    const now = new Date();
    const fullNote: Omit<Note, 'id' | 'userId'> = {
      ...newNoteData,
      content: [{ id: `${now.getTime()}-initial`, type: 'paragraph', content: '' }],
      createdAt: now.toISOString(),
      modifiedAt: now.toISOString(),
    };
    if (!user) {
        const noteWithId = {...fullNote, id: `${Date.now()}`};
        setLocalNotes(prev => [noteWithId, ...prev]);
        onSelectNote(noteWithId);
        return;
    }
    try {
      const docRef = await addDoc(collection(db, 'notes'), {...fullNote, userId: user.uid });
      onSelectNote({ ...fullNote, id: docRef.id, userId: user.uid });
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Could not create new note.', variant: 'destructive' });
    }
  }

  const handleUpdateNote = async (updatedNote: Note) => {
    const noteToUpdate = { ...updatedNote, modifiedAt: new Date().toISOString() };
    if (!user) {
        setLocalNotes(prev => prev.map(n => n.id === noteToUpdate.id ? noteToUpdate : n));
        onSelectNote(noteToUpdate);
        return;
    }
    const { id, ...noteData } = noteToUpdate;
    try {
      await updateDoc(doc(db, 'notes', id), noteData);
      onSelectNote(noteToUpdate);
    } catch(e) {
      console.error(e);
      toast({ title: 'Error', description: 'Could not save note.', variant: 'destructive' });
    }
  };
  
  const handleDeleteNote = async (noteId: string) => {
     if (!user) {
        setLocalNotes(prev => prev.filter(n => n.id !== noteId));
        onSelectNote(null);
        toast({ title: "Note Deleted" });
        return;
    }
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
        {isLoading && user ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : sortedNotes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>You haven't created any notes yet.</p>
            <p>Click "New Note" to get started.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedNotes.map((note) => (
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
