
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { historicalFigures } from "@/lib/itihas-data";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function ItihasFigures() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Historical Figures</h1>
        <p className="text-muted-foreground">Learn about the people who shaped India's past.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {historicalFigures.map((figure) => (
          <Card key={figure.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="relative h-20 w-20 rounded-full overflow-hidden shrink-0">
                <Image
                  src={figure.imageUrl}
                  alt={figure.name}
                  fill
                  className="object-cover"
                  data-ai-hint={figure.aiHint}
                />
              </div>
              <div className="flex-1">
                <CardTitle>{figure.name}</CardTitle>
                <Badge variant="outline">{figure.era}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{figure.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
