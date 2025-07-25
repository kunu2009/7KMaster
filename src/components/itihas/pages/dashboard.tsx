
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { historicalEras, historicalFigures, historicalEvents, quizQuestions } from '@/lib/itihas-data';
import { Landmark, Users, CalendarDays, HelpCircle } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, description }: { title: string, value: string | number, icon: React.ElementType, description?: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </CardContent>
    </Card>
);

export function ItihasDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Itihas Dashboard</h1>
                <p className="text-muted-foreground">An overview of the historical content available.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Historical Eras" value={historicalEras.length} icon={Landmark} description="Covering major periods" />
                <StatCard title="Key Figures" value={historicalFigures.length} icon={Users} description="Influential personalities" />
                <StatCard title="Significant Events" value={historicalEvents.length} icon={CalendarDays} description="Defining moments" />
                <StatCard title="Quiz Questions" value={quizQuestions.length} icon={HelpCircle} description="To test your knowledge" />
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Welcome to 7K Itihas</CardTitle>
                    <CardDescription>
                        Explore the rich tapestry of Indian history, from ancient civilizations to modern times.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        This module is designed to provide you with a comprehensive overview of key historical periods, influential figures, and pivotal events that have shaped the subcontinent. Use the navigation to dive into different eras, learn about historical personalities, or test your knowledge with a quiz.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
