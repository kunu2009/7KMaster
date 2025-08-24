
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
import { PlusCircle, Wand2, Loader2 } from "lucide-react";
import type { SelfSpaceItem } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { generateJournalImage } from "@/ai/flows/generate-journal-image-flow";

interface NewSelfSpaceDialogProps {
    onAddItem: (item: Omit<SelfSpaceItem, 'id' | 'userId'>) => void;
}

export function NewSelfSpaceDialog({ onAddItem }: NewSelfSpaceDialogProps) {
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('');
  const [goal, setGoal] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setImageFile(e.target.files[0]);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(e.target.files[0]);
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

  const handleGenerateImage = async () => {
    if (!aiPrompt) {
        toast({ title: 'Please enter a prompt for the AI.', variant: 'destructive' });
        return;
    }
    setIsGenerating(true);
    setImageFile(null); // Clear file upload if generating
    try {
        const result = await generateJournalImage({ prompt: aiPrompt });
        setImageUrl(result.imageUrl);
        toast({ title: 'Image Generated!', description: 'The AI has created an image for your journal entry.' });
    } catch (error) {
        console.error("Error generating image:", error);
        toast({ title: 'Error', description: 'Could not generate AI image. Please try again.', variant: 'destructive' });
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = async () => {
    if (area && status && goal) {
      let finalImageUrl = imageUrl;
      if (imageFile && !imageUrl) { // Only convert if no URL is already set (from AI or previous upload)
        finalImageUrl = await fileToDataUri(imageFile);
      }
      onAddItem({ area, status, goal, imageUrl: finalImageUrl });
      setOpen(false);
      // Reset fields
      setArea('');
      setStatus('');
      setGoal('');
      setImageFile(null);
      setImageUrl(undefined);
      setAiPrompt('');
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
           <div className="col-span-4 space-y-2 rounded-lg border p-3">
              <Label className="text-xs text-muted-foreground">Add an Image</Label>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ai-prompt" className="text-right text-sm">
                  AI Prompt
                </Label>
                 <Input id="ai-prompt" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} className="col-span-3" placeholder="e.g., minimalist desk" disabled={isGenerating || !!imageFile} />
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
                  <Label htmlFor="image" className="text-right">
                      Upload
                  </Label>
                  <Input id="image" type="file" onChange={handleImageChange} className="col-span-3" accept="image/*" disabled={isGenerating || !!aiPrompt}/>
              </div>
           </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Area</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
