"use client"

import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialProjects } from "@/lib/data";
import type { Project, ProjectStatus } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

const statusColors: Record<ProjectStatus, string> = {
  "In Progress": "bg-blue-500/20 text-blue-500 border-blue-500/30",
  "Not Started": "bg-gray-500/20 text-gray-500 border-gray-500/30",
  "Concept": "bg-purple-500/20 text-purple-500 border-purple-500/30",
  "Completed": "bg-green-500/20 text-green-500 border-green-500/30",
};

export function ProjectsTab() {
  const [projects] = useLocalStorage<Project[]>(
    "projects",
    initialProjects
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Projects (7K Ecosystem)</CardTitle>
            <CardDescription>
              Tracking progress on your suite of applications.
            </CardDescription>
          </div>
          <Button size="sm" variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Worked</TableHead>
                <TableHead>Next Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[project.status]}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.lastWorked}</TableCell>
                  <TableCell>{project.nextAction}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
