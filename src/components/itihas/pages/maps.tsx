
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ItihasMaps() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Historical Maps</h1>
        <p className="text-muted-foreground">Visualize the changing boundaries of empires and kingdoms.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Feature Coming Soon</CardTitle>
          <CardDescription>Interactive historical maps are currently under development.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Imagine interactive maps of Mauryan or Mughal empires here!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
