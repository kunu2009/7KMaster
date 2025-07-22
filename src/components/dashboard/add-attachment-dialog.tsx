
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
import type { Attachment } from "@/lib/types";

interface AddAttachmentDialogProps {
    onAddAttachment: (attachment: Omit<Attachment, 'id'>) => void;
}

export function AddAttachmentDialog({ onAddAttachment }: AddAttachmentDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
      if(name && (url || file)) {
        // In a real app, file would be uploaded and a URL returned.
        // For local storage, we'll just use the file name as the URL for now.
        const attachmentUrl = url || file!.name;
        onAddAttachment({ name, url: attachmentUrl });
        setOpen(false);
        // Reset fields
        setName('');
        setUrl('');
        setFile(null);
      }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Attachment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Attachment</DialogTitle>
          <DialogDescription>
            Add a new link or file to this project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="e.g., Design Mockups" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL
            </Label>
            <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} className="col-span-3" placeholder="https://..." disabled={!!file}/>
          </div>
           <div className="flex items-center col-span-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-sm text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              File
            </Label>
            <Input id="file" type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="col-span-3" disabled={!!url} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Add Attachment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
