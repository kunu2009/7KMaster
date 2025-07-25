
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { historicalEras } from "@/lib/itihas-data";
import Image from "next/image";

export function ItihasEras() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Historical Eras</h1>
        <p className="text-muted-foreground">Explore the major periods of Indian history.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {historicalEras.map((era) => (
          <Card key={era.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full">
              <Image
                src={era.imageUrl}
                alt={era.name}
                fill
                className="object-cover"
                data-ai-hint={era.aiHint}
              />
            </div>
            <CardHeader>
              <CardTitle>{era.name}</CardTitle>
              <CardDescription>{era.period}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{era.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
