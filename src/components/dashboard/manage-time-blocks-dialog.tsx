
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Plus, Trash2 } from "lucide-react";
import type { TimeBlock } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "../ui/scroll-area";
import { useAuth } from "@/context/auth-context";
import { db } from "@/lib/firebase";
import { collection, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';


interface ManageTimeBlocksDialogProps {
    timeBlocks: TimeBlock[];
    setTimeBlocks: (value: TimeBlock[] | ((val: TimeBlock[]) => TimeBlock[])) => void;
}

export function ManageTimeBlocksDialog({ timeBlocks, setTimeBlocks }: ManageTimeBlocksDialogProps) {
  const [open, setOpen] = useState(false);
  const [newBlockName, setNewBlockName] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const handleAddBlock = async () => {
    if (!newBlockName.trim()) {
        toast({ title: 'Block name cannot be empty', variant: 'destructive'});
        return;
    }

    if(!user) {
        const newBlock = { id: `${Date.now()}`, name: newBlockName.trim() };
        setTimeBlocks(prev => [...prev, newBlock].sort((a,b) => a.name.localeCompare(b.name)));
        setNewBlockName("");
        toast({ title: 'Time Block Added! (Guest Mode)' });
        return;
    }

    const newBlock = { name: newBlockName.trim(), userId: user.uid };
    try {
        await addDoc(collection(db, 'timeBlocks'), newBlock);
        setNewBlockName("");
        toast({ title: 'Time Block Added!' });
    } catch(e) {
        console.error(e);
        toast({ title: 'Error', description: 'Could not add time block.', variant: 'destructive'});
    }
  };

  const handleUpdateBlock = async (id: string, newName: string) => {
    if(!user) {
        setTimeBlocks(prev => prev.map(b => b.id === id ? {...b, name: newName} : b));
        return;
    }
    try {
        await updateDoc(doc(db, 'timeBlocks', id), { name: newName });
    } catch(e) {
        console.error(e);
        toast({ title: 'Error', description: 'Could not update time block.', variant: 'destructive'});
    }
  };

  const handleDeleteBlock = async (id: string) => {
     if(!user) {
        setTimeBlocks(prev => prev.filter(b => b.id !== id));
        toast({ title: 'Time Block Removed (Guest Mode)' });
        return;
    }
    try {
        await deleteDoc(doc(db, 'timeBlocks', id));
        toast({ title: 'Time Block Removed' });
    } catch(e) {
        console.error(e);
        toast({ title: 'Error', description: 'Could not remove time block.', variant: 'destructive'});
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Manage Blocks
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Time Blocks</DialogTitle>
          <DialogDescription>
            Add, edit, or remove the time blocks for your daily plan.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <ScrollArea className="h-60 pr-4">
                <div className="space-y-2">
                    {timeBlocks.map((block) => (
                        <div key={block.id} className="flex items-center gap-2">
                            <Input
                                value={block.name}
                                onChange={(e) => handleUpdateBlock(block.id, e.target.value)}
                                className="flex-1"
                            />
                             <Button variant="ghost" size="icon" onClick={() => handleDeleteBlock(block.id)} className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </ScrollArea>
             <div className="flex items-center gap-2 border-t pt-4">
              <Input
                placeholder="Add new block (e.g., 18:00 Dinner)"
                value={newBlockName}
                onChange={(e) => setNewBlockName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddBlock()}
              />
              <Button onClick={handleAddBlock} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
