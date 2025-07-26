
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Languages } from "lucide-react";

export function HindiPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Hindi</h1>
                <p className="text-muted-foreground">
                    Study materials for 12th Std Hindi.
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
                    <p>Detailed chapters, grammar exercises, and writing practice for Hindi will be available here shortly.</p>
                </CardContent>
            </Card>
        </div>
    );
}
