
"use client"

import { useState, useEffect } from 'react';
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialSkills } from "@/lib/data";
import type { Skill } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Wand2, Loader, Edit, Trash2 } from "lucide-react";
import { NewSkillDialog } from './new-skill-dialog';
import { EditSkillDialog } from './edit-skill-dialog';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { generateFocusSuggestions } from '@/ai/flows/generate-focus-suggestions-flow';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { motion } from 'framer-motion';
import { EmptyState } from './empty-state';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export function SkillsTab() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const [focusMode, setFocusMode] = useState(false);
  const [isGeneratingFocus, setIsGeneratingFocus] = useState(false);
  const [focusSkillIds, setFocusSkillIds] = useState<string[]>([]);
  const [focusReasoning, setFocusReasoning] = useState('');

  useEffect(() => {
    if (!user) {
        setIsLoading(false);
        setSkills([]);
        return;
    };
    
    setIsLoading(true);
    const q = query(collection(db, "skills"), where("userId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userSkills: Skill[] = [];
        querySnapshot.forEach((doc) => {
            userSkills.push({ id: doc.id, ...doc.data() } as Skill);
        });
        setSkills(userSkills);
        setIsLoading(false);
    }, (error) => {
        console.error("Error fetching skills: ", error);
        toast({ title: "Error", description: "Could not fetch your skills.", variant: "destructive"});
        setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user, toast]);

  const handleFocusModeChange = async (checked: boolean) => {
    setFocusMode(checked);
    if (checked) {
        if (skills.length < 3) {
            toast({ title: "Not Enough Skills", description: "AI Focus mode requires at least 3 skills to provide suggestions."});
            setFocusMode(false);
            return;
        }
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

  const addSkill = async (newSkill: Omit<Skill, 'id'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'skills'), { ...newSkill, userId: user.uid });
      toast({ title: "Skill Added", description: `"${newSkill.area}" has been added.`});
    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "Could not add skill.", variant: "destructive"});
    }
  }

  const updateSkill = async (updatedSkill: Skill) => {
    if (!user) return;
    const { id, ...skillData } = updatedSkill;
    try {
      await updateDoc(doc(db, 'skills', id), skillData);
      toast({ title: "Skill Updated", description: `"${skillData.area}" has been updated.`});
    } catch(e) {
      console.error(e);
      toast({ title: "Error", description: "Could not update skill.", variant: "destructive"});
    }
  };
  
  const deleteSkill = async (skillId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'skills', skillId));
      toast({ title: "Skill Deleted", description: "The skill has been removed."});
    } catch (e) {
      console.error(e);
      toast({ title: "Error", description: "Could not delete skill.", variant: "destructive"});
    }
  }

  const updateProgress = async (skillId: string, amount: number) => {
    if (!user) return;
    const skillToUpdate = skills.find(s => s.id === skillId);
    if (!skillToUpdate) return;
    
    const newProgress = Math.max(0, Math.min(skillToUpdate.progress + amount, skillToUpdate.maxProgress));
    try {
      await updateDoc(doc(db, 'skills', skillId), { progress: newProgress });
    } catch(e) {
       console.error(e);
      toast({ title: "Error", description: "Could not update progress.", variant: "destructive"});
    }
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
                disabled={skills.length < 3}
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
      <CardContent className="space-y-6">
        {focusMode && (isGeneratingFocus || focusReasoning) && (
             <div className="mb-6">
                <Alert className="bg-primary/5 border-primary/20">
                    {isGeneratingFocus ? <Loader className="h-4 w-4 animate-spin mr-2" /> : <Wand2 className="h-4 w-4" />}
                    <AlertTitle>{isGeneratingFocus ? "Generating Suggestions..." : "AI Focus Suggestions"}</AlertTitle>
                    <AlertDescription>
                        {isGeneratingFocus ? "The AI is analyzing your skills to suggest what to focus on." : focusReasoning}
                    </AlertDescription>
                </Alert>
            </div>
        )}
        
        {isLoading ? (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        ) : skills.length === 0 ? (
            <EmptyState 
                title="No Skills Added"
                subtitle="Start your growth journey by adding a new skill to track."
            />
        ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayedSkills.map((skill, index) => (
                <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <Card className={`flex flex-col h-full hover:shadow-md transition-shadow ${focusMode && focusSkillIds.includes(skill.id) ? 'border-primary shadow-lg' : ''}`}>
                        <CardHeader>
                            <div className='flex justify-between items-start gap-2'>
                                <CardTitle className="text-lg">{skill.area}</CardTitle>
                                <Badge variant="outline">{skill.level}</Badge>
                            </div>
                            <CardDescription>{skill.weeklyGoal}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <div className="space-y-2">
                                <Progress value={(skill.progress / skill.maxProgress) * 100} />
                                <p className="text-right text-sm text-muted-foreground">{skill.progress} / {skill.maxProgress}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-wrap justify-between items-center gap-2">
                        <div className='flex gap-1'>
                            <EditSkillDialog skill={skill} onUpdateSkill={updateSkill} />
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently delete the "{skill.area}" skill. This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteSkill(skill.id)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateProgress(skill.id, -1)} disabled={skill.progress <= 0}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateProgress(skill.id, 1)} disabled={skill.progress >= skill.maxProgress}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
            </div>
        )}
      </CardContent>
    </Card>
  );
}
