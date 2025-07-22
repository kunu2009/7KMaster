
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
import type { Skill } from "@/lib/types";

interface EditSkillDialogProps {
    skill: Skill;
    onUpdateSkill: (skill: Skill) => void;
}

export function EditSkillDialog({ skill, onUpdateSkill }: EditSkillDialogProps) {
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState(skill.area);
  const [level, setLevel] = useState(skill.level);
  const [weeklyGoal, setWeeklyGoal] = useState(skill.weeklyGoal);
  const [maxProgress, setMaxProgress] = useState(skill.maxProgress);

  useEffect(() => {
    if (open) {
        setArea(skill.area);
        setLevel(skill.level);
        setWeeklyGoal(skill.weeklyGoal);
        setMaxProgress(skill.maxProgress);
    }
  }, [open, skill]);

  const handleSubmit = () => {
    if (area && weeklyGoal && maxProgress > 0) {
      onUpdateSkill({
        ...skill,
        area,
        level,
        weeklyGoal,
        maxProgress: Number(maxProgress)
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
          <DialogTitle>Edit Skill</DialogTitle>
          <DialogDescription>
            Update the details for your tracked skill.
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
            <Label htmlFor="level" className="text-right">
              Level
            </Label>
            <Input id="level" value={level} onChange={(e) => setLevel(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weekly-goal" className="text-right">
              Weekly Goal
            </Label>
            <Input id="weekly-goal" value={weeklyGoal} onChange={(e) => setWeeklyGoal(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="max-progress" className="text-right">
                Goal Steps
            </Label>
            <Input id="max-progress" type="number" min="1" value={maxProgress} onChange={(e) => setMaxProgress(Number(e.target.value))} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
