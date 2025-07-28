
"use client"

import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialResearchItems } from "@/lib/data";
import type { ResearchItem, ResearchType, Todo } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Trash2, Paperclip, Edit } from "lucide-react";
import { NewResearchItemDialog } from "./new-research-item-dialog";
import { EditResearchItemDialog } from "./edit-research-item-dialog";
import { ResearchItemDetail } from "./research-item-detail";

const typeColors: Record<ResearchType, string> = {
  Tool: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  Website: "bg-purple-500/20 text-purple-500 border-purple-500/30",
  Article: "bg-green-500/20 text-green-500 border-green-500/30",
  Video: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  Course: "bg-red-500/20 text-red-500 border-red-500/30",
};

export function ResearchTab() {
  const [items, setItems] = useLocalStorage<ResearchItem[]>(
    "researchItems",
    initialResearchItems
  );
  const [filter, setFilter] = useState<ResearchType | 'All'>('All');
  const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);

  const addItem = (newItem: Omit<ResearchItem, 'id' | 'todos'>) => {
    setItems(prev => [...prev, { ...newItem, id: `${Date.now()}`, todos: [] }]);
  };
  
  const updateItem = (updatedItem: ResearchItem) => {
    setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    if (selectedItem && selectedItem.id === updatedItem.id) {
        setSelectedItem(updatedItem);
    }
  };
  
  const deleteItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    if (selectedItem && selectedItem.id === itemId) {
        setSelectedItem(null);
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
         {filteredItems.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
                <p>No items found for this filter.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
