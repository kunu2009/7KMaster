
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { BookMarked, GraduationCap, Scale, Layers, Map } from "lucide-react";

interface StudyTabProps {
    onNavigate: (subTab: string) => void;
}

export function StudyTab({ onNavigate }: StudyTabProps) {
  return (
     <div className="space-y-6">
      <Card>
        <CardHeader>
            <CardTitle>Study Dashboard</CardTitle>
            <CardDescription>
                Your personal space for learning materials, notes, and resources.
            </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Scale className="h-8 w-8" />
                </div>
                <div>
                    <CardTitle>Law Topic Notes</CardTitle>
                    <CardDescription>
                       In-depth notes on key legal subjects.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full" onClick={() => onNavigate('law-notes')}>
                    <BookMarked className="mr-2 h-4 w-4" />
                    View Notes
                </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                 <div className="p-3 rounded-full bg-accent/10 text-accent">
                    <Layers className="h-8 w-8" />
                </div>
                <div>
                    <CardTitle>Law Flashcards</CardTitle>
                    <CardDescription>
                        Quick revision for legal terms and maxims.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full" onClick={() => onNavigate('law-flashcards')}>
                    <Layers className="mr-2 h-4 w-4" />
                    View Flashcards
                </Button>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                 <div className="p-3 rounded-full bg-green-500/10 text-green-500">
                    <Map className="h-8 w-8" />
                </div>
                <div>
                    <CardTitle>Career Roadmap</CardTitle>
                    <CardDescription>
                        Explore potential career paths after law.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full" onClick={() => onNavigate('law-career')}>
                    <Map className="mr-2 h-4 w-4" />
                    View Roadmaps
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
