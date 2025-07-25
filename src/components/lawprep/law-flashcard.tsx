
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LawFlashcard as LawFlashcardType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LawFlashcardProps {
  flashcard: LawFlashcardType;
}

export function LawFlashcard({ flashcard }: LawFlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group h-64 w-full [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-xl shadow-lg transition-all duration-500 [transform-style:preserve-3d]",
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        )}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 [backface-visibility:hidden]">
          <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
            <Badge variant="secondary" className="absolute top-4 right-4">{flashcard.topic}</Badge>
            <h2 className="text-xl font-bold md:text-2xl">{flashcard.term}</h2>
          </CardContent>
        </Card>
        {/* Back of card */}
        <Card className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
           <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
            <Badge variant="secondary" className="absolute top-4 right-4">{flashcard.topic}</Badge>
             <p className="text-muted-foreground">{flashcard.definition}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
