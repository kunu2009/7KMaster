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
import Image from "next/image";

interface EditSelfSpaceDialogProps {
    item: SelfSpaceItem;
    onUpdateItem: (item: SelfSpaceItem) => void;
}

export function EditSelfSpaceDialog({ item, onUpdateItem }: EditSelfSpaceDialogProps) {
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState(item.area);
  const [status, setStatus] = useState(item.status);
  const [goal, setGoal] = useState(item.goal);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(item.imageUrl);


  useEffect(() => {
    if (open) {
        setArea(item.area);
        setStatus(item.status);
        setGoal(item.goal);
        setImagePreview(item.imageUrl);
        setImageFile(null);
    }
  }, [open, item]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
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
       let newImageUrl = item.imageUrl;
      if (imageFile) {
        newImageUrl = await fileToDataUri(imageFile);
      }
      onUpdateItem({
        ...item,
        area,
        status,
        goal,
        imageUrl: newImageUrl
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
           <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="image" className="text-right pt-2">
                Image
            </Label>
            <div className="col-span-3 space-y-2">
                {imagePreview && (
                    <div className="relative h-24 w-full rounded-md overflow-hidden">
                        <Image src={imagePreview} alt="Image preview" layout="fill" objectFit="cover" />
                    </div>
                )}
                <Input id="image" type="file" onChange={handleImageChange} className="col-span-3" accept="image/*" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
