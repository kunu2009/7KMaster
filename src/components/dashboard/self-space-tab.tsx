"use client"

import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialSelfSpace } from "@/lib/data";
import type { SelfSpaceItem } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NewSelfSpaceDialog } from "./new-self-space-dialog";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
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
} from "@/components/ui/alert-dialog"

export function SelfSpaceTab() {
  const [items, setItems] = useLocalStorage<SelfSpaceItem[]>(
    "selfSpace",
    initialSelfSpace
  );

  const addItem = (newItem: Omit<SelfSpaceItem, 'id'>) => {
    setItems(prev => [...prev, { ...newItem, id: `${Date.now()}`}]);
  };

  const updateItem = (updatedItem: SelfSpaceItem) => {
    setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };
  
  const deleteItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Self & Space</CardTitle>
            <CardDescription>
              Cultivate your well-being and personal environment.
            </CardDescription>
          </div>
           <NewSelfSpaceDialog onAddItem={addItem} />
        </div>
      </CardHeader>
      <CardContent>
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
         {items.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
                <p>No areas added yet. Click "New Area" to start tracking.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
