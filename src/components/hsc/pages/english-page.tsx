
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookText } from "lucide-react";

export function EnglishPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">English</h1>
                <p className="text-muted-foreground">
                    Study materials for 12th Std English.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookText />
                        Coming Soon
                    </CardTitle>
                    <CardDescription>
                        This section is under construction.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Detailed chapters, grammar exercises, and writing practice for English will be available here shortly.</p>
                </CardContent>
            </Card>
        </div>
    );
}
