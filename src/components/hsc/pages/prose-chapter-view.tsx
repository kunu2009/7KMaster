
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookText, Users, Lightbulb, ListOrdered, GraduationCap } from "lucide-react";
import type { HscProseChapter } from "@/lib/types";

interface ProseChapterViewProps {
  chapter: HscProseChapter;
  onBack: () => void;
}

export function ProseChapterView({ chapter, onBack }: ProseChapterViewProps) {
  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" className="h-8 w-8" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
             </Button>
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{chapter.title}</h1>
                <p className="text-muted-foreground">by {chapter.author}</p>
            </div>
        </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="h-auto flex-wrap justify-start">
          <TabsTrigger value="summary"><BookText className="mr-2 h-4 w-4"/>Summary</TabsTrigger>
          <TabsTrigger value="characters"><Users className="mr-2 h-4 w-4"/>Characters</TabsTrigger>
          <TabsTrigger value="theme"><Lightbulb className="mr-2 h-4 w-4"/>Theme</TabsTrigger>
          <TabsTrigger value="glossary"><GraduationCap className="mr-2 h-4 w-4"/>Glossary</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-2">Short Summary</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{chapter.summaries.short}</p>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2">Detailed Summary</h3>
                    <p className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">{chapter.summaries.detailed}</p>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="characters" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Character Sketches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {chapter.characters.map((char) => (
                <div key={char.name}>
                  <h3 className="font-semibold">{char.name}</h3>
                  <p className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">{char.sketch}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="theme" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme & Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">{chapter.theme}</p>
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="glossary" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Glossary</CardTitle>
              <CardDescription>Difficult words and their meanings from the chapter.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {chapter.glossary.map((item) => (
                        <li key={item.word} className="text-sm">
                            <span className="font-semibold">{item.word}:</span>{' '}
                            <span className="text-muted-foreground">{item.meaning}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
