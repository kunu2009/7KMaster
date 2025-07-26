
"use client";

import type { Reel } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { icons, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReelCardProps {
  reel: Reel;
}

export function ReelCard({ reel }: ReelCardProps) {
  // A small set of default icons or a fallback is good practice
  const LucideIcon = icons[reel.icon as keyof typeof icons] || AlertTriangle;

  return (
    <div className="h-full w-full snap-start flex items-center justify-center p-4 sm:p-8">
      <Card className={cn(
        "w-full max-w-md h-full flex flex-col justify-between p-6 shadow-xl",
        "bg-gradient-to-br from-primary/10 via-background to-background",
        "animate-in fade-in-50 zoom-in-95 duration-500"
      )}>
        <div className="flex items-center gap-3 text-primary">
          <LucideIcon className="h-6 w-6 shrink-0" />
          <h2 className="text-xl font-bold">{reel.title}</h2>
        </div>
        <CardContent className="flex-1 flex items-center justify-center p-0 my-4">
          <p className="text-2xl font-medium text-center leading-relaxed">
            {reel.content}
          </p>
        </CardContent>
        <div className="text-center text-muted-foreground text-xs">
          7K Universe
        </div>
      </Card>
    </div>
  );
}
