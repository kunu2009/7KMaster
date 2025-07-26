
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookText, Lightbulb, GraduationCap, FileText, Bot, Layers } from "lucide-react";
import type { HscPoetryChapter } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface PoetryChapterViewProps {
  poem: HscPoetryChapter;
  onBack: () => void;
}

export function PoetryChapterView({ poem, onBack }: PoetryChapterViewProps) {
  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" className="h-8 w-8" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
             </Button>
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{poem.title}</h1>
                <p className="text-muted-foreground">by {poem.author}</p>
            </div>
        </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="h-auto flex-wrap justify-start">
          <TabsTrigger value="text"><BookText className="mr-2 h-4 w-4"/>Poem Text</TabsTrigger>
          <TabsTrigger value="summary"><FileText className="mr-2 h-4 w-4"/>Summary</TabsTrigger>
          <TabsTrigger value="theme"><Lightbulb className="mr-2 h-4 w-4"/>Central Idea</TabsTrigger>
          <TabsTrigger value="devices"><Layers className="mr-2 h-4 w-4"/>Poetic Devices</TabsTrigger>
          <TabsTrigger value="appreciation"><GraduationCap className="mr-2 h-4 w-4"/>Appreciation</TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Poem Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="whitespace-pre-wrap leading-loose text-lg">
                {poem.poemText.join("\n")}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Summary & Stanza-wise Explanation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-2 text-lg">Overall Summary</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{poem.summaries.overall}</p>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2 text-lg">Stanza-wise Explanation</h3>
                    <p className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">{poem.summaries.stanzaWise}</p>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Central Idea / Theme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">{poem.centralIdea}</p>
            </CardContent>
          </Card>
        </TabsContent>

         <TabsContent value="devices" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Poetic Devices</CardTitle>
              <CardDescription>Figures of speech and sound devices used in the poem.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-2 text-lg">Rhyme Scheme</h3>
                    <p className="text-muted-foreground text-sm">{poem.poeticDevices.rhymeScheme}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-4 text-lg">Figures of Speech</h3>
                    <div className="space-y-3">
                        {poem.figuresOfSpeech.map((item, index) => (
                            <div key={index} className="text-sm">
                                <span className="font-bold text-primary">{item.name}:</span>{' '}
                                <span className="italic">"{item.line}"</span>
                                <p className="text-muted-foreground pl-4">{item.explanation}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appreciation" className="mt-4">
          <Card>
            <CardHeader>
                <CardTitle>Poetic Appreciation</CardTitle>
                <CardDescription>A complete appreciation of the poem as per the board format.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: marked.parse(poem.appreciation) }}/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
