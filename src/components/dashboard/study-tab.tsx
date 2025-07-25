
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function StudyTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Study</CardTitle>
        <CardDescription>
          Your personal space for learning materials, flashcards, and notes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Study features coming soon!</p>
        </div>
      </CardContent>
    </Card>
  );
}
