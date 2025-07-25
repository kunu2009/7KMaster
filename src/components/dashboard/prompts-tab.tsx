
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NotesTab } from "./notes-tab";

export function PromptsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Prompts</CardTitle>
        <CardDescription>
          Save and categorize your favorite AI prompts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Prompt library coming soon!</p>
        </div>
      </CardContent>
    </Card>
  );
}
