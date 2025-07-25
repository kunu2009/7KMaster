
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { BookMarked, GraduationCap, Scale } from "lucide-react";

export function StudyTab() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <GraduationCap className="h-8 w-8" />
                </div>
                <div>
                    <CardTitle>12th Grade Studies</CardTitle>
                    <CardDescription>
                       Notes, textbooks, and mock tests.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full">
                    <BookMarked className="mr-2 h-4 w-4" />
                    View Resources (Coming Soon)
                </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                 <div className="p-3 rounded-full bg-accent/10 text-accent">
                    <Scale className="h-8 w-8" />
                </div>
                <div>
                    <CardTitle>Law School Prep</CardTitle>
                    <CardDescription>
                        Case studies, statutes, and exam prep.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full">
                    <BookMarked className="mr-2 h-4 w-4" />
                    View Resources (Coming Soon)
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
