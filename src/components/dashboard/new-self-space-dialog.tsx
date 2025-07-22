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
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setImageFile(e.target.files[0]);
    }
  };
  
  const fileToDataUri = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });

  const handleSubmit = async () => {
    if (area && status && goal) {
      let imageUrl: string | undefined = undefined;
      if (imageFile) {
        imageUrl = await fileToDataUri(imageFile);
      }
      onAddItem({ area, status, goal, imageUrl });
      setOpen(false);
      // Reset fields
      setArea('');
      setStatus('');
      setGoal('');
      setImageFile(null);
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
                Image
            </Label>
            <Input id="image" type="file" onChange={handleImageChange} className="col-span-3" accept="image/*" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Area</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
