
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { hscEnglishProse, hscEnglishPoetry } from "@/lib/hsc-data";
import type { HscProseChapter, HscPoetryChapter } from "@/lib/types";


const writingSkills = [
    "View and Counter-view",
    "Blog Writing",
    "Speech Writing",
    "Interview",
    "Group Discussion",
    "E-mails",
    "Report Writing",
    "Review Writing",
    "Statement of Purpose (SOP)",
    "Appeal Writing",
    "Expansion of Ideas",
    "Grammar & Vocabulary"
];

interface EnglishPageProps {
    onSelectProseChapter: (chapter: HscProseChapter) => void;
    onSelectPoetryChapter: (poem: HscPoetryChapter) => void;
}

export function EnglishPage({ onSelectProseChapter, onSelectPoetryChapter }: EnglishPageProps) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">English Syllabus (HSC)</h1>
                <p className="text-muted-foreground">
                    Maharashtra Board 2024-25 syllabus.
                </p>
            </div>

            <Tabs defaultValue="prose" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="prose">Prose</TabsTrigger>
                    <TabsTrigger value="poetry">Poetry</TabsTrigger>
                    <TabsTrigger value="writing-skills">Writing Skills</TabsTrigger>
                </TabsList>
                <TabsContent value="prose" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Section One: Prose</CardTitle>
                            <CardDescription>Analysis and appreciation of prose texts.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {hscEnglishProse.map((chapter) => (
                                <Card key={chapter.id} className="flex flex-col">
                                    <CardHeader className="flex-grow">
                                        <CardTitle className="text-lg">{chapter.title}</CardTitle>
                                        {chapter.author && <CardDescription>by {chapter.author}</CardDescription>}
                                    </CardHeader>
                                    <CardFooter>
                                        <Button 
                                            variant="outline" 
                                            className="w-full" 
                                            onClick={() => onSelectProseChapter(chapter)}
                                            disabled={!chapter.contentAvailable}
                                        >
                                            <BookOpen className="mr-2 h-4 w-4" /> Study
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="poetry" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Section Two: Poetry</CardTitle>
                            <CardDescription>Appreciation and analysis of poems.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {hscEnglishPoetry.map((poem) => (
                                <Card key={poem.id} className="flex flex-col">
                                    <CardHeader className="flex-grow">
                                        <CardTitle className="text-lg">{poem.title}</CardTitle>
                                        <CardDescription>by {poem.author}</CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                        <Button 
                                            variant="outline" 
                                            className="w-full" 
                                            onClick={() => onSelectPoetryChapter(poem)}
                                            disabled={!poem.contentAvailable}>
                                            <BookOpen className="mr-2 h-4 w-4" /> Study
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="writing-skills" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Section Three: Writing Skills & Grammar</CardTitle>
                            <CardDescription>Practical skills for composition and language use.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4">
                                {writingSkills.map((skill) => (
                                    <li key={skill} className="font-medium text-card-foreground/80">{skill}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
