
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { hscSanskritProse, hscSanskritPoetry } from "@/lib/hsc-sanskrit-data";
import type { HscProseChapter, HscPoetryChapter } from "@/lib/types";

interface SanskritPageProps {
    onSelectProseChapter: (chapter: HscProseChapter) => void;
    onSelectPoetryChapter: (poem: HscPoetryChapter) => void;
}

export function SanskritPage({ onSelectProseChapter, onSelectPoetryChapter }: SanskritPageProps) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Sanskrit Syllabus (HSC)</h1>
                <p className="text-muted-foreground">
                    Study materials for 12th Standard Sanskrit.
                </p>
            </div>

            <Tabs defaultValue="prose" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="prose">गद्यम् (Prose)</TabsTrigger>
                    <TabsTrigger value="poetry">पद्यम् (Poetry)</TabsTrigger>
                </TabsList>
                <TabsContent value="prose" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Prose Section</CardTitle>
                            <CardDescription>Lessons from Sanskrit literature.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {hscSanskritProse.map((chapter) => (
                                <Card key={chapter.id} className="flex flex-col">
                                    <CardHeader className="flex-grow">
                                        <CardTitle className="text-lg">{chapter.title}</CardTitle>
                                        {chapter.author && <CardDescription>from {chapter.author}</CardDescription>}
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
                            <CardTitle>Poetry Section</CardTitle>
                            <CardDescription>Verses from classical Sanskrit poets.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {hscSanskritPoetry.map((poem) => (
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
            </Tabs>
        </div>
    );
}
