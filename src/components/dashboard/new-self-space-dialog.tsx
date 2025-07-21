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
import { PlusCircle } from "lucide-react";
import type { SelfSpaceItem } from "@/lib/types";

interface NewSelfSpaceDialogProps {
    onAddItem: (item: Omit<SelfSpaceItem, 'id'>) => void;
}

export function NewSelfSpaceDialog({ onAddItem }: NewSelfSpaceDialogProps) {
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = () => {
    if (area && status && goal) {
      onAddItem({ area, status, goal });
      setOpen(false);
      // Reset fields
      setArea('');
      setStatus('');
      setGoal('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Area
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Self & Space Area</DialogTitle>
          <DialogDescription>
            Define a new area for personal improvement.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right">
              Area
            </Label>
            <Input id="area" value={area} onChange={(e) => setArea(e.target.value)} className="col-span-3" placeholder="e.g., Fitness" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Input id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="col-span-3" placeholder="e.g., Inconsistent"/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="goal" className="text-right">
              Goal
            </Label>
            <Input id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} className="col-span-3" placeholder="e.g., Workout 3x/week"/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Area</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
