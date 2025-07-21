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
import { Minus, Plus, Wand2, Loader } from "lucide-react";
import { NewSkillDialog } from './new-skill-dialog';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { generateFocusSuggestions } from '@/ai/flows/generate-focus-suggestions-flow';
import { useToast } from '@/hooks/use-toast';

export function SkillsTab() {
  const [skills, setSkills] = useLocalStorage<Skill[]>(
    "skills",
    initialSkills
  );
  const [focusMode, setFocusMode] = useState(false);
  const [isGeneratingFocus, setIsGeneratingFocus] = useState(false);
  const [focusSkillIds, setFocusSkillIds] = useState<string[]>([]);
  const [focusReasoning, setFocusReasoning] = useState('');
  const { toast } = useToast();

  const handleFocusModeChange = async (checked: boolean) => {
    setFocusMode(checked);
    if (checked) {
        setIsGeneratingFocus(true);
        setFocusReasoning('');
        try {
            const result = await generateFocusSuggestions({
                skills: skills.map(({ id, area, level, weeklyGoal }) => ({ id, area, level, weeklyGoal }))
            });
            setFocusSkillIds(result.focusSkillIds);
            setFocusReasoning(result.reasoning);
        } catch (error) {
            console.error("Error generating focus suggestions:", error);
            toast({
                title: 'Error',
                description: 'Could not generate AI focus suggestions. Showing top 3 skills.',
                variant: 'destructive',
            });
            // Fallback to showing first 3 skills
            setFocusSkillIds(skills.slice(0, 3).map(s => s.id));
        } finally {
            setIsGeneratingFocus(false);
        }
    } else {
        setFocusSkillIds([]);
        setFocusReasoning('');
    }
  };

  const displayedSkills = focusMode ? skills.filter(s => focusSkillIds.includes(s.id)) : skills;

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
          <div className="flex items-center space-x-4 self-end sm:self-center">
             <div className="flex items-center space-x-2">
              <Switch 
                id="focus-mode" 
                checked={focusMode}
                onCheckedChange={handleFocusModeChange}
              />
              <Label htmlFor="focus-mode" className="flex items-center gap-1">
                <Wand2 className="h-4 w-4" />
                <span>AI Focus</span>
              </Label>
            </div>
            <NewSkillDialog onAddSkill={addSkill} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {focusMode && (isGeneratingFocus || focusReasoning) && (
            <Alert className="mb-6 bg-primary/5 border-primary/20">
                {isGeneratingFocus ? <Loader className="h-4 w-4 animate-spin mr-2" /> : <Wand2 className="h-4 w-4" />}
                <AlertTitle>{isGeneratingFocus ? "Generating Suggestions..." : "AI Focus Suggestions"}</AlertTitle>
                <AlertDescription>
                    {isGeneratingFocus ? "The AI is analyzing your skills to suggest what to focus on." : focusReasoning}
                </AlertDescription>
            </Alert>
        )}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Skill Area</TableHead>
                <TableHead className="hidden sm:table-cell">Current Level</TableHead>
                <TableHead>Weekly Goal</TableHead>
                <TableHead className="w-[200px] sm:w-[250px]">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedSkills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell className="font-medium">{skill.area}</TableCell>
                  <TableCell className="hidden sm:table-cell">{skill.level}</TableCell>
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
        {skills.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
                <p>No skills added yet. Click "New Skill" to start tracking your progress!</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
