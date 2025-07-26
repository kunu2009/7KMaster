
"use client";

import { useState } from 'react';
import type { ItihasChapter } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';
import { McqCard } from '@/components/lawprep/pages/mcq-card';
import { LawFlashcard } from '@/components/lawprep/law-flashcard';
import { ReelCard } from '@/components/lawprep/reel-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ItihasChapterViewProps {
  chapter: ItihasChapter;
}

export function ItihasChapterView({ chapter }: ItihasChapterViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Chapter {chapter.id}: {chapter.title}</h1>
        <p className="text-muted-foreground">{chapter.description}</p>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="mcqs">MCQs</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="reels">Reels</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Chapter Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{chapter.summary}</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="mcqs" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Multiple Choice Questions</CardTitle></CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <div className="space-y-4 pr-4">
                  {chapter.mcqs.map((mcq, index) => (
                    <McqCard key={mcq.id} mcq={mcq} questionNumber={index + 1} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="flashcards" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Flashcards</CardTitle></CardHeader>
            <CardContent>
                <Carousel
                    opts={{ align: "start" }}
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto"
                >
                    <CarouselContent>
                    {chapter.flashcards.map((flashcard) => (
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
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reels" className="mt-4 -m-4 sm:-m-6">
           <div className="h-[calc(100vh-13rem)] w-full overflow-y-auto snap-y snap-mandatory rounded-lg bg-muted/20">
              {chapter.reels.map((reel) => (
                <ReelCard key={reel.id} reel={reel} />
              ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
