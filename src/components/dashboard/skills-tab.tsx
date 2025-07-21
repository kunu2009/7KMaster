"use client"

import { useState } from 'react';
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialSkills } from "@/lib/data";
import type { Skill } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { NewSkillDialog } from './new-skill-dialog';

export function SkillsTab() {
  const [skills, setSkills] = useLocalStorage<Skill[]>(
    "skills",
    initialSkills
  );
  const [focusMode, setFocusMode] = useState(false);

  const displayedSkills = focusMode ? skills.slice(0, 3) : skills;

  const addSkill = (newSkill: Omit<Skill, 'id'>) => {
    setSkills(prev => [...prev, { ...newSkill, id: `${Date.now()}` }]);
  }

  const updateProgress = (skillId: string, amount: number) => {
    setSkills(prev => prev.map(skill => {
        if (skill.id === skillId) {
            const newProgress = Math.max(0, Math.min(skill.progress + amount, skill.maxProgress));
            return { ...skill, progress: newProgress };
        }
        return skill;
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Skills Development</CardTitle>
            <CardDescription>
              Track your learning goals and progress in different areas.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2">
              <Switch 
                id="focus-mode" 
                checked={focusMode}
                onCheckedChange={setFocusMode}
              />
              <Label htmlFor="focus-mode">Focus Mode</Label>
            </div>
            <NewSkillDialog onAddSkill={addSkill} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Skill Area</TableHead>
                <TableHead>Current Level</TableHead>
                <TableHead>Weekly Goal</TableHead>
                <TableHead className="w-[250px]">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedSkills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell className="font-medium">{skill.area}</TableCell>
                  <TableCell>{skill.level}</TableCell>
                  <TableCell>{skill.weeklyGoal}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateProgress(skill.id, -1)}>
                            <Minus className="h-4 w-4" />
                       </Button>
                      <Progress value={(skill.progress / skill.maxProgress) * 100} className="w-full" />
                       <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateProgress(skill.id, 1)}>
                            <Plus className="h-4 w-4" />
                       </Button>
                      <span className="text-sm text-muted-foreground min-w-[40px] text-center">{skill.progress}/{skill.maxProgress}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
