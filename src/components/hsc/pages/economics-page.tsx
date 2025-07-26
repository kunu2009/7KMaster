
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export function EconomicsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Economics</h1>
                <p className="text-muted-foreground">
                    Study materials for 12th Std Economics.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp />
                        Coming Soon
                    </CardTitle>
                    <CardDescription>
                        This section is under construction.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Detailed chapters, notes, and practice questions for Economics will be available here shortly.</p>
                </CardContent>
            </Card>
        </div>
    );
}
