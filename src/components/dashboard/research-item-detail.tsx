
"use client";

import { useState } from 'react';
import type { ResearchItem, Todo } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Trash2, PlusCircle, ExternalLink, Paperclip } from 'lucide-react';
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
import { Badge } from '../ui/badge';
import { EditResearchItemDialog } from './edit-research-item-dialog';

interface ResearchItemDetailProps {
  item: ResearchItem;
  onUpdateItem: (item: ResearchItem) => void;
  onDeleteItem: (itemId: string) => void;
  onBack: () => void;
}

export function ResearchItemDetail({ item, onUpdateItem, onDeleteItem, onBack }: ResearchItemDetailProps) {
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const todo: Todo = { id: `${Date.now()}`, text: newTodo.trim(), completed: false };
      const updatedItem = { ...item, todos: [...(item.todos || []), todo] };
      onUpdateItem(updatedItem);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (todoId: string) => {
    const updatedTodos = (item.todos || []).map(t =>
      t.id === todoId ? { ...t, completed: !t.completed } : t
    );
    const updatedItem = { ...item, todos: updatedTodos };
    onUpdateItem(updatedItem);
  };

  const handleDeleteTodo = (todoId: string) => {
    const updatedTodos = (item.todos || []).filter(t => t.id !== todoId);
    const updatedItem = { ...item, todos: updatedTodos };
    onUpdateItem(updatedItem);
  };
  
  const handleEditTodo = (todoId: string, newText: string) => {
    const updatedTodos = (item.todos || []).map(t =>
      t.id === todoId ? { ...t, text: newText } : t
    );
    const updatedItem = { ...item, todos: updatedTodos };
    onUpdateItem(updatedItem);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className='flex items-center gap-2 sm:gap-4'>
            <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-xl sm:text-2xl">{item.name}</CardTitle>
              <CardDescription>
                <Badge variant="outline">{item.type}</Badge>
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2 self-end sm:self-center">
            <EditResearchItemDialog item={item} onUpdateItem={onUpdateItem} />
             <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete the research item "{item.name}".
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDeleteItem(item.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <h3 className="font-semibold text-lg">Details</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <div className="flex flex-wrap gap-4 items-center pt-2">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Link
                    </Button>
                </a>
                {item.attachment && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Paperclip className="h-4 w-4" />
                        <span>Attachment: {item.attachment}</span>
                    </div>
                )}
            </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Action Items / To-Do List</h3>
          <div className="space-y-2">
            {(item.todos || []).map(todo => (
              <div key={todo.id} className="group flex items-center gap-3">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => handleToggleTodo(todo.id)}
                />
                <Input
                  value={todo.text}
                  onChange={(e) => handleEditTodo(todo.id, e.target.value)}
                  className={`flex-1 h-9 border-0 shadow-none focus-visible:ring-0 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="shrink-0 opacity-50 group-hover:opacity-100">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this to-do item.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteTodo(todo.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new to-do item..."
              onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
            />
            <Button onClick={handleAddTodo}><PlusCircle className="mr-2 h-4 w-4" /> Add</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
