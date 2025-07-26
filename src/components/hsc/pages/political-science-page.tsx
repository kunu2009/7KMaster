
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Vote } from "lucide-react";

export function PoliticalSciencePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Political Science</h1>
                <p className="text-muted-foreground">
                    Study materials for 12th Std Political Science.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Vote />
                        Coming Soon
                    </CardTitle>
                    <CardDescription>
                        This section is under construction.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Detailed chapters, notes, and practice questions for Political Science will be available here shortly.</p>
                </CardContent>
            </Card>
        </div>
    );
}
