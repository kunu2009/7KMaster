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
import type { Project, ProjectStatus } from "@/lib/types";

interface NewProjectDialogProps {
    onAddProject: (project: Omit<Project, 'id' | 'lastWorked' | 'attachments'>) => void;
}

export function NewProjectDialog({ onAddProject }: NewProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('Concept');
  const [nextAction, setNextAction] = useState('');

  const handleSubmit = () => {
      if(name && nextAction) {
        onAddProject({ name, status, nextAction, todos: [], workLog: [] });
        setOpen(false);
        // Reset fields
        setName('');
        setStatus('Concept');
        setNextAction('');
      }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Add a new project to your 7K ecosystem.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="Project name" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select onValueChange={(value: ProjectStatus) => setStatus(value)} defaultValue={status}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Concept">Concept</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="next-action" className="text-right">
              Next Action
            </Label>
            <Input id="next-action" value={nextAction} onChange={(e) => setNextAction(e.target.value)} className="col-span-3" placeholder="What's the next step?"/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
