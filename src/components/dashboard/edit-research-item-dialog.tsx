
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";
import type { ResearchItem, ResearchType } from "@/lib/types";

interface EditResearchItemDialogProps {
    item: ResearchItem;
    onUpdateItem: (item: ResearchItem) => void;
}

export function EditResearchItemDialog({ item, onUpdateItem }: EditResearchItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(item.name);
  const [type, setType] = useState<ResearchType>(item.type);
  const [url, setUrl] = useState(item.url);
  const [description, setDescription] = useState(item.description);
  const [attachmentName, setAttachmentName] = useState(item.attachment);
  const [newAttachment, setNewAttachment] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
        setName(item.name);
        setType(item.type);
        setUrl(item.url);
        setDescription(item.description);
        setAttachmentName(item.attachment);
        setNewAttachment(null);
    }
  }, [open, item]);

  const handleSubmit = () => {
    if (name && url && description) {
      const updatedItem = {
        ...item,
        name,
        type,
        url,
        description,
        attachment: newAttachment ? newAttachment.name : attachmentName,
      };
      onUpdateItem(updatedItem);
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
          <DialogTitle>Edit Research Item</DialogTitle>
          <DialogDescription>
            Update the details for your saved item.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select onValueChange={(value: ResearchType) => setType(value)} value={type}>
                <SelectTrigger className="col-span-3">
                    <SelectValue />
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
            <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} className="col-span-3"/>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="attachment" className="text-right">
              Attachment
            </Label>
            <div className="col-span-3">
                {attachmentName && !newAttachment && (
                    <div className="text-sm text-muted-foreground mb-2">Current: {attachmentName}</div>
                )}
                <Input id="attachment" type="file" onChange={(e) => setNewAttachment(e.target.files?.[0] || null)} className="col-span-3" />
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
