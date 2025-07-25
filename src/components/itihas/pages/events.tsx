
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { historicalEvents } from "@/lib/itihas-data";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function ItihasEvents() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Significant Events</h1>
        <p className="text-muted-foreground">Discover the pivotal moments that shaped history.</p>
      </div>
      <div className="relative border-l-2 pl-6 space-y-8">
        {historicalEvents.map((event) => (
          <div key={event.id} className="relative">
            <div className="absolute -left-[35px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-xs font-bold">{event.date.split(' ')[1]}</span>
            </div>
            <Card className="ml-4">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription>{event.date}</CardDescription>
                  </div>
                  <Badge variant="secondary">{event.era}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-[1fr_200px]">
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <div className="relative h-24 w-full rounded-md overflow-hidden">
                    <Image
                      src={event.imageUrl}
                      alt={event.name}
                      fill
                      className="object-cover"
                      data-ai-hint={event.aiHint}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
