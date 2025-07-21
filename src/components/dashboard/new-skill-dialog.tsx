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
import type { Skill } from "@/lib/types";

interface NewSkillDialogProps {
    onAddSkill: (skill: Omit<Skill, 'id'>) => void;
}

export function NewSkillDialog({ onAddSkill }: NewSkillDialogProps) {
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState('');
  const [level, setLevel] = useState('0');
  const [weeklyGoal, setWeeklyGoal] = useState('');
  const [maxProgress, setMaxProgress] = useState(1);

  const handleSubmit = () => {
    if (area && weeklyGoal && maxProgress > 0) {
      onAddSkill({
        area,
        level,
        weeklyGoal,
        progress: 0,
        maxProgress: Number(maxProgress)
      });
      setOpen(false);
      // Reset fields
      setArea('');
      setLevel('0');
      setWeeklyGoal('');
      setMaxProgress(1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Skill
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
          <DialogDescription>
            Expand your abilities by tracking a new skill.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="area" className="text-right">
              Area
            </Label>
            <Input id="area" value={area} onChange={(e) => setArea(e.target.value)} className="col-span-3" placeholder="e.g., Cooking" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="level" className="text-right">
              Level
            </Label>
            <Input id="level" value={level} onChange={(e) => setLevel(e.target.value)} className="col-span-3" placeholder="e.g., Novice"/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weekly-goal" className="text-right">
              Weekly Goal
            </Label>
            <Input id="weekly-goal" value={weeklyGoal} onChange={(e) => setWeeklyGoal(e.target.value)} className="col-span-3" placeholder="e.g., Cook 3 meals"/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="max-progress" className="text-right">
                Goal Steps
            </Label>
            <Input id="max-progress" type="number" min="1" value={maxProgress} onChange={(e) => setMaxProgress(Number(e.target.value))} className="col-span-3" placeholder="e.g., 3"/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Skill</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
