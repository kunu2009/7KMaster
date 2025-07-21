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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import type { ResearchItem, ResearchType } from "@/lib/types";

interface NewResearchItemDialogProps {
    onAddItem: (item: Omit<ResearchItem, 'id'>) => void;
}

export function NewResearchItemDialog({ onAddItem }: NewResearchItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<ResearchType>('Tool');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (name && url && description) {
      onAddItem({ name, type, url, description });
      setOpen(false);
      // Reset fields
      setName('');
      setType('Tool');
      setUrl('');
      setDescription('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Research Item</DialogTitle>
          <DialogDescription>
            Save a new tool, website, or resource for later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="e.g., Genkit" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select onValueChange={(value: ResearchType) => setType(value)} defaultValue={type}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Tool">Tool</SelectItem>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                    <SelectItem value="Course">Course</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL
            </Label>
            <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} className="col-span-3" placeholder="https://..."/>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" placeholder="What is it for?"/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
