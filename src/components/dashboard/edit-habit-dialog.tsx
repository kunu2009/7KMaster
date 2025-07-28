
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";
import type { Habit } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import * as Icons from 'lucide-react';
import { ScrollArea } from "../ui/scroll-area";

interface EditHabitDialogProps {
  habit: Habit;
  onUpdateHabit: (habit: Habit) => void;
}

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


export function EditHabitDialog({ habit, onUpdateHabit }: EditHabitDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(habit.name);
  const [icon, setIcon] = useState(habit.icon);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
        setName(habit.name);
        setIcon(habit.icon);
    }
  }, [open, habit]);

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a name for the habit.",
        variant: "destructive",
      });
      return;
    }

    onUpdateHabit({
      ...habit,
      name,
      icon,
    });

    toast({
        title: "Habit Updated!",
        description: `"${name}" has been successfully updated.`,
    });

    setOpen(false);
  };
  
  const LucideIcon = ({ name }: { name: string }) => {
    const Icon = (Icons as any)[name];
    return Icon ? <Icon className="h-4 w-4" /> : null;
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
          <DialogTitle>Edit Habit</DialogTitle>
          <DialogDescription>
            Update the details for your habit.
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
            <Label htmlFor="icon" className="text-right">
              Icon
            </Label>
            <Select onValueChange={setIcon} value={icon}>
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
          <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
