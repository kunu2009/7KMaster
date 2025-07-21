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
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';

export function SkillsTab() {
  const [skills] = useLocalStorage<Skill[]>(
    "skills",
    initialSkills
  );
  const [focusMode, setFocusMode] = useState(false);

  const displayedSkills = focusMode ? skills.slice(0, 3) : skills;

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
            <Button size="sm" variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Skill
            </Button>
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
                <TableHead className="w-[200px]">Progress</TableHead>
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
                      <Progress value={(skill.progress / skill.maxProgress) * 100} className="w-[80%]" />
                      <span className="text-sm text-muted-foreground">{skill.progress}/{skill.maxProgress}</span>
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
