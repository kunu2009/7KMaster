"use client"

import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialSelfSpace } from "@/lib/data";
import type { SelfSpaceItem } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { PlusCircle, Camera } from "lucide-react";

export function SelfSpaceTab() {
  const [items] = useLocalStorage<SelfSpaceItem[]>(
    "selfSpace",
    initialSelfSpace
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Self & Space</CardTitle>
            <CardDescription>
              Cultivate your well-being and personal environment.
            </CardDescription>
          </div>
           <Button size="sm" variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Area
          </Button>
        </div>
      </CardHeader>
      <CardContent>
         <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Area</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Goal</TableHead>
                    <TableHead className="text-right">Track</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {items.map((item) => (
                    <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.area}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.goal}</TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" disabled>
                            <Camera className="h-4 w-4" />
                            <span className="sr-only">Attach photo</span>
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
        <p className="text-xs text-muted-foreground mt-4 italic text-center">Attach photos of your space to track improvement (feature coming soon).</p>
      </CardContent>
    </Card>
  );
}
