
"use client";
import { LawFlashcard } from "@/components/dashboard/law-flashcard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { lawFlashcards } from "@/lib/law-data";
import type { LawFlashcard as LawFlashcardType } from "@/lib/types";

export function LawFlashcardsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Flashcards</h1>
        <p className="text-muted-foreground">
          Flip through key legal terms and concepts. Click a card to see the definition.
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto"
      >
        <CarouselContent>
          {lawFlashcards.map((flashcard: LawFlashcardType) => (
            <CarouselItem key={flashcard.id}>
              <div className="p-1">
                <LawFlashcard flashcard={flashcard} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12 sm:ml-8" />
        <CarouselNext className="mr-12 sm:mr-8" />
      </Carousel>
    </div>
  );
}
