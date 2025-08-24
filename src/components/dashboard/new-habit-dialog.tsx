
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import type { Habit } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import * as Icons from 'lucide-react';
import { ScrollArea } from "../ui/scroll-area";

interface NewHabitDialogProps {
  onAddHabit: (habit: Omit<Habit, 'id' | 'userId'>) => void;
}

// A curated list of icons to avoid dynamic import issues.
const iconList = [
    "Activity", "AlarmClock", "Apple", "Award", "Bed", "Bike", "BookOpen", "BrainCircuit",
    "Briefcase", "Brush", "Calendar", "Camera", "CheckCircle", "ClipboardCheck", "Clock",
    "Cloud", "Coffee", "CreditCard", "Dumbbell", "Edit", "Eye", "Feather", "Film", "Flame",
    "Flower", "Folder", "Footprints", "Gamepad2", "GitFork", "Globe", "GraduationCap",
    "Guitar", "HandHeart", "Headphones", "Heart", "Home", "Image", "Leaf", "Lightbulb",
    "Mail", "MapPin", "MessageCircle", "Mic", "Moon", "MousePointer", "Music", "PenSquare",
    "Phone", "Plane", "Puzzle", "Recycle", "Rocket", "Run", "Save", "School", "Scissors",
    "Settings", "Shield", "ShoppingBag", "Smile", "Sparkles", "Star", "Sunrise", "Sunset",
    "Target", "Trophy", "Users", "Video", "Wallet", "Watch", "Wind", "Zap"
];

export function NewHabitDialog({ onAddHabit }: NewHabitDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('Activity');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a name for the habit.",
        variant: "destructive",
      });
      return;
    }

    onAddHabit({
      name,
      icon,
      frequency: 'daily',
      goal: 7,
    });

    toast({
        title: "Habit Added!",
        description: `"${name}" has been added to your tracker.`,
    });

    setOpen(false);
    // Reset fields
    setName('');
    setIcon('Activity');
  };

  const LucideIcon = ({ name }: { name: string }) => {
    const Icon = (Icons as any)[name];
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
          <DialogDescription>
            What new good habit do you want to track?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="e.g., Read for 15 mins" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="icon" className="text-right">
              Icon
            </Label>
            <Select onValueChange={setIcon} defaultValue={icon}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                    <ScrollArea className="h-60">
                        {iconList.map(iconName => (
                            <SelectItem key={iconName} value={iconName}>
                                <div className="flex items-center gap-2">
                                    <LucideIcon name={iconName} />
                                    <span>{iconName}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </ScrollArea>
                </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Habit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
