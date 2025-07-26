
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { itihasChapters } from '@/lib/itihas-data';
import type { ItihasChapter } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ItihasDashboardProps {
    onSelectChapter: (chapter: ItihasChapter) => void;
}

export function ItihasDashboard({ onSelectChapter }: ItihasDashboardProps) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">History Chapters (HSC)</h1>
                <p className="text-muted-foreground">Maharashtra State Board Syllabus (2025-26)</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {itihasChapters.map((chapter) => (
                    <Card key={chapter.id} className="flex flex-col hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-lg">Chapter {chapter.id}: {chapter.title}</CardTitle>
                            <CardDescription>{chapter.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {chapter.summary}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => onSelectChapter(chapter)} className="w-full">
                                Study Chapter
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
