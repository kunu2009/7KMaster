
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { lawFlashcards, lawNotes, mcqs } from '@/lib/law-data';
import { Database, FileText, Layers3, Server } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, unit, description }: { title: string, value: string | number, icon: React.ElementType, unit?: string, description?: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">
                {value} {unit && <span className="text-base font-medium text-muted-foreground">{unit}</span>}
            </div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </CardContent>
    </Card>
);

export function LawDashboard() {
    const [dataSize, setDataSize] = useState(0);

    useEffect(() => {
        const allData = { mcqs, lawFlashcards, lawNotes };
        const sizeInBytes = new Blob([JSON.stringify(allData)]).size;
        setDataSize(sizeInBytes);
    }, []);

    const formattedSize = (dataSize / 1024).toFixed(2); // Convert to KB

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">An overview of your study materials.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total MCQs" value={mcqs.length} icon={Database} unit="questions" description="Across all topics" />
                <StatCard title="Total Flashcards" value={lawFlashcards.length} icon={Layers3} unit="cards" description="For quick revision" />
                <StatCard title="Note Topics" value={lawNotes.length} icon={FileText} unit="subjects" description="Covering key areas" />
                <StatCard title="Approx. Data Size" value={formattedSize} icon={Server} unit="KB" description="Loaded on client" />
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Content Breakdown</CardTitle>
                    <CardDescription>
                        Here is a summary of the study materials currently in the app.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
                        <li><span className="font-semibold text-foreground">{mcqs.length} Multiple Choice Questions</span> across various subjects to test your knowledge.</li>
                        <li><span className="font-semibold text-foreground">{lawFlashcards.length} Flashcards</span> for quick revision of key legal terms and maxims.</li>
                        <li>In-depth <span className="font-semibold text-foreground">{lawNotes.length} Topic Notes</span> covering Constitution, Legal Aptitude, and more.</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-4">
                        The total size of this data loaded in your browser is approximately <span className="font-semibold text-foreground">{formattedSize} KB</span>.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
