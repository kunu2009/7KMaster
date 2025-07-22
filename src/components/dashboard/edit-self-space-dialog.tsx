"use client";

import { useState, useEffect } from "react";
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
import { Edit } from "lucide-react";
import type { SelfSpaceItem } from "@/lib/types";

interface EditSelfSpaceDialogProps {
    item: SelfSpaceItem;
    onUpdateItem: (item: SelfSpaceItem) => void;
}

export function EditSelfSpaceDialog({ item, onUpdateItem }: EditSelfSpaceDialogProps) {
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState(item.area);
  const [status, setStatus] = useState(item.status);
  const [goal, setGoal] = useState(item.goal);

  useEffect(() => {
    if (open) {
        setArea(item.area);
        setStatus(item.status);
        setGoal(item.goal);
    }
  }, [open, item]);

  const handleSubmit = () => {
    if (area && status && goal) {
      onUpdateItem({
        ...item,
        area,
        status,
        goal,
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Self & Space Area</DialogTitle>
          <DialogDescription>
            Update the details for your personal area.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right">
              Area
            </Label>
            <Input id="area" value={area} onChange={(e) => setArea(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Input id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="goal" className="text-right">
              Goal
            </Label>
            <Input id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
