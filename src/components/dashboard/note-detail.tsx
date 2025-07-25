
"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Note, NoteBlock } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Trash2, Plus, Type, CheckSquare } from 'lucide-react';
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
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';


interface NoteDetailProps {
  note: Note;
  onUpdateNote: (note: Note) => void;
  onDeleteNote: (noteId: string) => void;
  onBack: () => void;
}

export function NoteDetail({ note, onUpdateNote, onDeleteNote, onBack }: NoteDetailProps) {
  const [currentNote, setCurrentNote] = useState<Note>(note);
  const { toast } = useToast();

  useEffect(() => {
    setCurrentNote(note);
  }, [note]);
  
  const safeContent = useMemo(() => {
    if (Array.isArray(currentNote.content)) {
        return currentNote.content;
    }
    // If content is a string (old format), convert it to the new block format
    const contentAsString = typeof currentNote.content === 'string' ? currentNote.content : '';
    return [{ id: `${Date.now()}-migrated`, type: 'paragraph', content: contentAsString }];
  }, [currentNote.content]);


  const updateNote = (updatedContent: NoteBlock[]) => {
    const updatedNote = {
        ...currentNote,
        content: updatedContent,
        modifiedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    };
    setCurrentNote(updatedNote);
    onUpdateNote(updatedNote);
  };

  const handleUpdateBlock = (blockId: string, newContent: string) => {
    const updatedBlocks = safeContent.map(block => 
      block.id === blockId ? { ...block, content: newContent } : block
    );
    updateNote(updatedBlocks);
  };
  
  const handleToggleTodo = (blockId: string, checked: boolean) => {
    const updatedBlocks = safeContent.map(block => 
        block.id === blockId ? { ...block, checked: checked } : block
    );
    updateNote(updatedBlocks);
  };

  const addBlock = (type: 'paragraph' | 'todo') => {
    const newBlock: NoteBlock = {
      id: `${Date.now()}`,
      type: type,
      content: '',
      checked: type === 'todo' ? false : undefined,
    };
    const updatedBlocks = [...safeContent, newBlock];
    updateNote(updatedBlocks);
  };
  
  const deleteBlock = (blockId: string) => {
    const updatedBlocks = safeContent.filter(block => block.id !== blockId);
    updateNote(updatedBlocks);
  };
  
  const handleTitleChange = (newTitle: string) => {
    const updatedNote = { ...currentNote, title: newTitle };
    setCurrentNote(updatedNote);
    onUpdateNote(updatedNote);
  }

  const handleDeleteNote = () => {
    onDeleteNote(note.id);
  }

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className='flex items-center gap-2 sm:gap-4'>
                 <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex flex-col gap-1 w-full">
                    <Input
                        id="title"
                        value={currentNote.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="text-xl sm:text-2xl font-bold border-0 shadow-none focus-visible:ring-0 p-0 h-auto"
                        placeholder="Untitled Note"
                    />
                    <CardDescription>
                      Last modified: {currentNote.modifiedAt}
                    </CardDescription>
                </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                 <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Note
                 </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the <strong>{note.title}</strong> note.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteNote}>Delete Note</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-y-auto pr-2">
          <div className="space-y-3">
              {safeContent.map(block => (
                  <div key={block.id} className="group flex items-start gap-2">
                      {block.type === 'paragraph' && (
                          <Textarea
                              value={block.content}
                              onChange={(e) => handleUpdateBlock(block.id, e.target.value)}
                              placeholder="Type something..."
                              className="w-full border-0 resize-none text-base focus-visible:ring-0 shadow-none p-0"
                              rows={1}
                          />
                      )}
                      {block.type === 'todo' && (
                          <div className="flex-1 flex items-center gap-2">
                             <Checkbox
                                id={block.id}
                                checked={block.checked}
                                onCheckedChange={(checked) => handleToggleTodo(block.id, !!checked)}
                                className="mt-1 h-5 w-5"
                              />
                              <Input
                                  value={block.content}
                                  onChange={(e) => handleUpdateBlock(block.id, e.target.value)}
                                  placeholder="To-do item"
                                  className={`w-full border-0 shadow-none focus-visible:ring-0 p-0 text-base h-auto ${block.checked ? 'line-through text-muted-foreground' : ''}`}
                              />
                          </div>
                      )}
                      <Button variant="ghost" size="icon" className="invisible group-hover:visible" onClick={() => deleteBlock(block.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                  </div>
              ))}
          </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex-col sm:flex-row items-center gap-2">
          <span className="text-sm text-muted-foreground">Add new block:</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => addBlock('paragraph')}>
                <Type className="mr-2 h-4 w-4" /> Paragraph
            </Button>
            <Button variant="outline" size="sm" onClick={() => addBlock('todo')}>
                <CheckSquare className="mr-2 h-4 w-4" /> To-do
            </Button>
          </div>
      </CardFooter>
    </Card>
  );
}
