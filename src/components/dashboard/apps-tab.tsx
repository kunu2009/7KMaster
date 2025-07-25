
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";

const apps = [
    { name: "7K LawPrep", url: "https://7-klawprep.vercel.app/" },
    { name: "7K Polyglot", url: "https://7-k-polyglot.vercel.app/Dashboard" },
    { name: "7K Itihas", url: "https://7-k-itihaas.vercel.app/" },
    { name: "7K Life", url: "https://7-klife-newsss-msdh1vil9-kunu2009s-projects.vercel.app/" },
];


export function AppsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Apps</CardTitle>
        <CardDescription>
          Direct access to your suite of 7K applications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {apps.map(app => (
                 <a href={app.url} key={app.name} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full h-20 text-lg justify-between">
                       <span>{app.name}</span>
                       <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </a>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
