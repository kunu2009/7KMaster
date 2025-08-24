
"use client"

import { useState, useEffect } from "react";
import type { ResearchItem, ResearchType } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Paperclip, Loader2 } from "lucide-react";
import { NewResearchItemDialog } from "./new-research-item-dialog";
import { ResearchItemDetail } from "./research-item-detail";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from "@/lib/firebase";

const typeColors: Record<ResearchType, string> = {
  Tool: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  Website: "bg-purple-500/20 text-purple-500 border-purple-500/30",
  Article: "bg-green-500/20 text-green-500 border-green-500/30",
  Video: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  Course: "bg-red-500/20 text-red-500 border-red-500/30",
};

export function ResearchTab() {
  const [items, setItems] = useState<ResearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState<ResearchType | 'All'>('All');
  const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);
  
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      setItems([]);
      return;
    }
    setIsLoading(true);
    const q = query(collection(db, 'researchItems'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const userItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ResearchItem));
        setItems(userItems);
        setIsLoading(false);
    }, (error) => {
        console.error(error);
        toast({ title: 'Error', description: 'Could not fetch research items.', variant: 'destructive' });
        setIsLoading(false);
    });
    return () => unsubscribe();
  }, [user, toast]);

  const addItem = async (newItem: Omit<ResearchItem, 'id' | 'todos' | 'userId'>) => {
    if (!user) return;
    try {
        await addDoc(collection(db, 'researchItems'), { ...newItem, userId: user.uid, todos: [] });
        toast({ title: 'Item Added!', description: `"${newItem.name}" has been saved.` });
    } catch(e) {
        console.error(e);
        toast({ title: 'Error', description: 'Could not save new item.', variant: 'destructive' });
    }
  };
  
  const updateItem = async (updatedItem: ResearchItem) => {
    if (!user) return;
    const { id, ...itemData } = updatedItem;
    try {
        await updateDoc(doc(db, 'researchItems', id), itemData);
        if (selectedItem && selectedItem.id === updatedItem.id) {
            setSelectedItem(updatedItem);
        }
    } catch(e) {
        console.error(e);
        toast({ title: 'Error', description: 'Could not update item.', variant: 'destructive' });
    }
  };
  
  const deleteItem = async (itemId: string) => {
    if (!user) return;
    try {
        await deleteDoc(doc(db, 'researchItems', itemId));
        if (selectedItem && selectedItem.id === itemId) {
            setSelectedItem(null);
        }
        toast({ title: 'Item Deleted', description: 'The item has been removed.' });
    } catch(e) {
        console.error(e);
        toast({ title: 'Error', description: 'Could not delete item.', variant: 'destructive' });
    }
  };

  const filteredItems = filter === 'All' ? items : items.filter(item => item.type === filter);
  const allTypes: ResearchType[] = ['Tool', 'Website', 'Article', 'Video', 'Course'];

  if(selectedItem) {
      const currentItem = items.find(i => i.id === selectedItem.id);
      if (!currentItem) {
        setSelectedItem(null);
        return null;
      }
      return <ResearchItemDetail 
                item={currentItem} 
                onUpdateItem={updateItem} 
                onDeleteItem={deleteItem}
                onBack={() => setSelectedItem(null)} 
            />
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Research & Discovery</CardTitle>
            <CardDescription>
              A collection of tools, websites, articles, and more.
            </CardDescription>
          </div>
          <NewResearchItemDialog onAddItem={addItem} />
        </div>
        <div className="flex flex-wrap gap-2 pt-4">
          <Button
            variant={filter === 'All' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('All')}
          >
            All
          </Button>
          {allTypes.map(type => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(type)}
              className="capitalize"
            >
              {type}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
             <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        ) : filteredItems.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map(item => (
                <Card key={item.id} className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex justify-between items-start gap-2">
                        <span className="text-lg">{item.name}</span>
                        <Badge variant="outline" className={`${typeColors[item.type]} whitespace-nowrap`}>
                        {item.type}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    {item.attachment && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                        <Paperclip className="h-4 w-4" />
                        <span>{item.attachment}</span>
                    </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={() => setSelectedItem(item)} className="w-full" variant="outline">View Details</Button>
                </CardFooter>
                </Card>
            ))}
            </div>
        ) : (
            <div className="text-center py-12 text-muted-foreground">
                <p>No items found{filter !== 'All' ? ` for the "${filter}" filter` : ''}.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
