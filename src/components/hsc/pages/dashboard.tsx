
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookText, Languages, TrendingUp, Vote } from "lucide-react";

const subjects = [
    { name: 'English', icon: BookText, page: 'english' },
    { name: 'Sanskrit', icon: Languages, page: 'sanskrit' },
    { name: 'Hindi', icon: Languages, page: 'hindi' },
    { name: 'Economics', icon: TrendingUp, page: 'economics' },
    { name: 'Political Science', icon: Vote, page: 'political-science' },
];

interface HscDashboardProps {
    setActivePage: (page: string) => void;
}

export function HscDashboard({ setActivePage }: HscDashboardProps) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">HSC Board Studies</h1>
                <p className="text-muted-foreground">12th Standard Maharashtra Board Syllabus</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject) => (
                    <Card key={subject.name} className="flex flex-col hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <subject.icon className="h-5 w-5" />
                                {subject.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground">
                                Access notes, practice questions, and study materials for {subject.name}.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => setActivePage(subject.page)} className="w-full">
                                Study {subject.name}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
