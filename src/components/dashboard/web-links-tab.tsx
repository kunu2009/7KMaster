
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const webLinks = [
    { name: "ChatGPT", url: "https://chat.openai.com/" },
    { name: "YouTube", url: "https://www.youtube.com/" },
    { name: "Chess.com", url: "https://www.chess.com/" },
    { name: "GitHub", url: "https://github.com/" },
    { name: "Vercel", url: "https://vercel.com/" },
    { name: "Google", url: "https://google.com/" },
];

export function WebLinksTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Web Links</CardTitle>
        <CardDescription>Quick links to your most visited sites.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {webLinks.map(link => (
                 <a href={link.url} key={link.name} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full h-20 text-lg justify-between">
                       <span>{link.name}</span>
                       <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </a>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
