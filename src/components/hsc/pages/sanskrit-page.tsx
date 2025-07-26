
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Languages } from "lucide-react";

export function SanskritPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Sanskrit</h1>
                <p className="text-muted-foreground">
                    Study materials for 12th Std Sanskrit.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Languages />
                        Coming Soon
                    </CardTitle>
                    <CardDescription>
                        This section is under construction.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Detailed chapters, grammar exercises, and translation practice for Sanskrit will be available here shortly.</p>
                </CardContent>
            </Card>
        </div>
    );
}
