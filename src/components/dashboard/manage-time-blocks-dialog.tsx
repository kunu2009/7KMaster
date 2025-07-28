
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

interface ManageTimeBlocksDialogProps {
    timeBlocks: TimeBlock[];
    setTimeBlocks: (blocks: TimeBlock[]) => void;
}

export function ManageTimeBlocksDialog({ timeBlocks, setTimeBlocks }: ManageTimeBlocksDialogProps) {
  const [open, setOpen] = useState(false);
  const [newBlockName, setNewBlockName] = useState("");
  const { toast } = useToast();

  const handleAddBlock = () => {
    if (newBlockName.trim() === "") {
        toast({ title: 'Block name cannot be empty', variant: 'destructive'});
        return;
    }
    const newBlock: TimeBlock = { id: `tb-${Date.now()}`, name: newBlockName.trim() };
    setTimeBlocks([...timeBlocks, newBlock]);
    setNewBlockName("");
    toast({ title: 'Time Block Added!' });
  };

  const handleUpdateBlock = (id: string, newName: string) => {
    setTimeBlocks(timeBlocks.map(block => block.id === id ? { ...block, name: newName } : block));
  };

  const handleDeleteBlock = (id: string) => {
    setTimeBlocks(timeBlocks.filter(block => block.id !== id));
    toast({ title: 'Time Block Removed' });
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
                placeholder="Add new block (e.g., 18:00 - 19:00 Dinner)"
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
