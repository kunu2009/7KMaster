
"use client";

import { useState } from 'react';
import type { ItihasChapter } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
  onBack: () => void;
}

export function ItihasChapterView({ chapter, onBack }: ItihasChapterViewProps) {
  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" className="h-8 w-8" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
             </Button>
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Chapter {chapter.id}: {chapter.title}</h1>
                <p className="text-muted-foreground">{chapter.description}</p>
            </div>
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
               <Carousel
                    opts={{ align: "start" }}
                    className="w-full max-w-sm sm:max-w-md md:max-w-2xl mx-auto"
                >
                    <CarouselContent>
                    {chapter.mcqs.map((mcq, index) => (
                        <CarouselItem key={mcq.id}>
                        <div className="p-1">
                            <McqCard mcq={mcq} questionNumber={index + 1} />
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
        <TabsContent value="flashcards" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Flashcards</CardTitle></CardHeader>
            <CardContent>
                <Carousel
                    opts={{ align: "start" }}
                    className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto"
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
         <TabsContent value="reels" className="mt-4 h-full">
           <div className="h-[calc(100vh-17rem)] w-full flex flex-col -m-4 sm:-m-6">
                <div className="flex-1 relative">
                    <div className="absolute inset-0 h-full w-full overflow-y-auto snap-y snap-mandatory rounded-lg">
                        {chapter.reels.map((reel) => (
                            <ReelCard key={reel.id} reel={reel} />
                        ))}
                    </div>
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    