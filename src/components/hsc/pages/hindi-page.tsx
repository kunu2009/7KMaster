
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { hscHindiProse, hscHindiPoetry } from "@/lib/hsc-hindi-data";
import type { HscProseChapter, HscPoetryChapter } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export function HindiPage() {
    const { toast } = useToast();

    const handleStudyClick = () => {
        toast({
            title: "Coming Soon!",
            description: "Detailed study materials for this chapter will be available shortly.",
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Hindi Syllabus (HSC)</h1>
                <p className="text-muted-foreground">
                    Yuvakbharati - 12th Standard Syllabus.
                </p>
            </div>

            <Tabs defaultValue="prose" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="prose">गद्य (Prose)</TabsTrigger>
                    <TabsTrigger value="poetry">पद्य (Poetry)</TabsTrigger>
                </TabsList>
                <TabsContent value="prose" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Prose Section</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {hscHindiProse.map((chapter) => (
                                <Card key={chapter.id} className="flex flex-col">
                                    <CardHeader className="flex-grow">
                                        <CardTitle className="text-lg">{chapter.title}</CardTitle>
                                        <CardDescription>by {chapter.author}</CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                        <Button 
                                            variant="outline" 
                                            className="w-full" 
                                            onClick={handleStudyClick}
                                            disabled={!chapter.contentAvailable}
                                        >
                                            <BookOpen className="mr-2 h-4 w-4" /> 
                                            {chapter.contentAvailable ? "Study" : "Coming Soon"}
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
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {hscHindiPoetry.map((poem) => (
                                <Card key={poem.id} className="flex flex-col">
                                    <CardHeader className="flex-grow">
                                        <CardTitle className="text-lg">{poem.title}</CardTitle>
                                        <CardDescription>by {poem.author}</CardDescription>
                                    </CardHeader>
                                    <CardFooter>
                                        <Button 
                                            variant="outline" 
                                            className="w-full" 
                                            onClick={handleStudyClick}
                                            disabled={!poem.contentAvailable}>
                                            <BookOpen className="mr-2 h-4 w-4" /> 
                                            {poem.contentAvailable ? "Study" : "Coming Soon"}
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
