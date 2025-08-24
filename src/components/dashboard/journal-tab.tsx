
"use client"

import { useState, useEffect } from 'react';
import type { SelfSpaceItem } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NewSelfSpaceDialog } from "./new-self-space-dialog";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { EditSelfSpaceDialog } from "./edit-self-space-dialog";
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
import { MoodMirror } from "./mood-mirror";
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function JournalTab() {
  const [items, setItems] = useState<SelfSpaceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      setItems([]);
      return;
    }
    setIsLoading(true);
    const q = query(collection(db, 'selfSpace'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SelfSpaceItem));
      setItems(userItems);
      setIsLoading(false);
    }, (error) => {
      console.error(error);
      toast({ title: 'Error', description: 'Could not fetch journal entries.', variant: 'destructive' });
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [user, toast]);

  const addItem = async (newItem: Omit<SelfSpaceItem, 'id' | 'userId'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'selfSpace'), { ...newItem, userId: user.uid });
      toast({ title: 'Area Added!', description: `"${newItem.area}" has been added.` });
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Could not add new area.', variant: 'destructive' });
    }
  };

  const updateItem = async (updatedItem: SelfSpaceItem) => {
    if (!user) return;
    const { id, ...itemData } = updatedItem;
    try {
      await updateDoc(doc(db, 'selfSpace', id), itemData);
      toast({ title: 'Area Updated!', description: `"${itemData.area}" has been updated.` });
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Could not update area.', variant: 'destructive' });
    }
  };

  const deleteItem = async (itemId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'selfSpace', itemId));
      toast({ title: 'Area Deleted', description: 'The journal entry has been removed.' });
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Could not delete area.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <MoodMirror />
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Journal & Reflection</CardTitle>
              <CardDescription>
                Cultivate your well-being and personal environment.
              </CardDescription>
            </div>
            <NewSelfSpaceDialog onAddItem={addItem} />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : items.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Card key={item.id} className="flex flex-col">
                  <CardHeader>
                      <CardTitle className="flex justify-between items-start gap-2">
                          <span className="text-lg">{item.area}</span>
                          <Badge variant="secondary">{item.status}</Badge>
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <div className="aspect-video relative overflow-hidden rounded-md">
                      <Image 
                          src={item.imageUrl || `https://placehold.co/600x400.png`}
                          alt={item.area}
                          fill
                          className="object-cover"
                          data-ai-hint={`${item.area.toLowerCase()}`}
                        />
                    </div>
                    <div>
                      <p className="font-semibold">Goal:</p>
                      <p className="text-muted-foreground">{item.goal}</p>
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0 mt-auto flex justify-end items-center gap-1">
                    <EditSelfSpaceDialog item={item} onUpdateItem={updateItem} />
                      <AlertDialog>
                          <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                  <Trash2 className="h-4 w-4" />
                              </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                              <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                      This will permanently delete the "{item.area}" area. This action cannot be undone.
                                  </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteItem(item.id)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                          </AlertDialogContent>
                      </AlertDialog>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
                <p>No areas added yet. Click "New Area" to start tracking.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
