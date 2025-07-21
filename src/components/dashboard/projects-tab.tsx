"use client";

import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { initialProjects } from "@/lib/data";
import type { Project, ProjectStatus, Todo, WorkLogEntry } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { NewProjectDialog } from "./new-project-dialog";
import { ProjectDetail } from "./project-detail";

const statusColors: Record<ProjectStatus, string> = {
  "In Progress": "bg-blue-500/20 text-blue-500 border-blue-500/30",
  "Not Started": "bg-gray-500/20 text-gray-500 border-gray-500/30",
  "Concept": "bg-purple-500/20 text-purple-500 border-purple-500/30",
  "Completed": "bg-green-500/20 text-green-500 border-green-500/30",
};

export function ProjectsTab() {
  const [projects, setProjects] = useLocalStorage<Project[]>(
    "projects",
    initialProjects
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const addProject = (newProject: Omit<Project, 'id' | 'lastWorked'>) => {
    setProjects(prev => [...prev, {
      ...newProject,
      id: `${Date.now()}`,
      lastWorked: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      todos: [],
      workLog: [],
    }]);
  }

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prevProjects => prevProjects.map(p => p.id === updatedProject.id ? updatedProject : p));
    setSelectedProject(updatedProject);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  }

  const handleBackToList = () => {
    setSelectedProject(null);
  }

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onUpdateProject={handleUpdateProject} onBack={handleBackToList} />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Projects (7K Ecosystem)</CardTitle>
            <CardDescription>
              Tracking progress on your suite of applications. Click a project to see details.
            </CardDescription>
          </div>
          <NewProjectDialog onAddProject={addProject} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Last Worked</TableHead>
                <TableHead>Next Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} onClick={() => handleSelectProject(project)} className="cursor-pointer">
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${statusColors[project.status]} whitespace-nowrap`}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{project.lastWorked}</TableCell>
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
