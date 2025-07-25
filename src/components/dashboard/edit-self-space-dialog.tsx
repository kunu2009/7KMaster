
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
import { Edit, Wand2, Loader2 } from "lucide-react";
import type { SelfSpaceItem } from "@/lib/types";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { generateJournalImage } from "@/ai/flows/generate-journal-image-flow";

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
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
        setArea(item.area);
        setStatus(item.status);
        setGoal(item.goal);
        setImagePreview(item.imageUrl);
        setImageFile(null);
        setAiPrompt('');
    }
  }, [open, item]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setImageFile(file);
        setAiPrompt(''); // Clear AI prompt
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = async () => {
    if (!aiPrompt) {
        toast({ title: 'Please enter a prompt for the AI.', variant: 'destructive' });
        return;
    }
    setIsGenerating(true);
    setImageFile(null); // Clear file upload
    try {
        const result = await generateJournalImage({ prompt: aiPrompt });
        setImagePreview(result.imageUrl);
        toast({ title: 'Image Generated!', description: 'The AI has created a new image for your journal entry.' });
    } catch (error) {
        console.error("Error generating image:", error);
        toast({ title: 'Error', description: 'Could not generate AI image. Please try again.', variant: 'destructive' });
    } finally {
        setIsGenerating(false);
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
      let newImageUrl = imagePreview;
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
           <div className="col-span-4 space-y-2 rounded-lg border p-3">
              <Label className="text-xs text-muted-foreground">Update Image</Label>
              {imagePreview && (
                    <div className="relative h-24 w-full rounded-md overflow-hidden">
                        <Image src={imagePreview} alt="Image preview" layout="fill" objectFit="cover" />
                    </div>
                )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ai-prompt-edit" className="text-right text-sm">
                  AI Prompt
                </Label>
                 <Input id="ai-prompt-edit" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} className="col-span-3" placeholder="e.g., peaceful library" disabled={isGenerating || !!imageFile} />
              </div>
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={handleGenerateImage} disabled={isGenerating || !aiPrompt || !!imageFile}>
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Wand2 className="mr-2 h-4 w-4" />}
                    Generate
                </Button>
              </div>
              <div className="flex items-center col-span-4">
                    <div className="flex-grow border-t"></div>
                    <span className="flex-shrink mx-4 text-sm text-muted-foreground">OR</span>
                    <div className="flex-grow border-t"></div>
                </div>
              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image-edit" className="text-right">
                      Upload
                  </Label>
                  <Input id="image-edit" type="file" onChange={handleImageChange} className="col-span-3" accept="image/*" disabled={isGenerating || !!aiPrompt}/>
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
